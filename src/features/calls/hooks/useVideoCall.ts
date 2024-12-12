import { useEffect, useState } from "react";
import {
	useIsConnected,
	useJoin,
	useLocalMicrophoneTrack,
	useLocalCameraTrack,
	useRemoteUsers,
	useRTCClient,
} from "agora-rtc-react";
import { useNavigate } from "@tanstack/react-router";
import { useSetDoctorCallState } from "./useSetDoctorCallState";
import { useGetCallReservation } from "./useGetCallReservation";
import { useGetUser } from "~/hooks/user/useGetUser";
import { useGetAccount } from "~/hooks/account/useGetAccount";
import { notification } from "~/util/api";
import { Doctor } from "~/domain/doctor/doctor";

interface UseVideoCallParams {
	uid: number;
	channelId: string;
	token: string;
	currentDoctor: Doctor | null | undefined;
}

export const useVideoCall = ({
	uid,
	channelId,
	token,
	currentDoctor,
}: UseVideoCallParams) => {
	const navigation = useNavigate();

	const [calling, setCalling] = useState(false);
	const [micOn, setMic] = useState(true);
	const [isPending, setIsPending] = useState(false);
	const [cameraOn, setCamera] = useState(true);
	const [isCallFinished, setIsCallFinished] = useState(false);
	const { callReservation } = useGetCallReservation(channelId);
	const { user } = useGetUser(callReservation?.userID || "");
	const { account } = useGetAccount(callReservation?.userID || "");

	const { onDoctorEntered, onDoctorLeft, doctorEntered } =
		useSetDoctorCallState({
			channelId,
			userID: callReservation?.userID || "",
			startDate: new Date(callReservation?.callStartTime || new Date()),
			endDate: new Date(callReservation?.callEndTime || new Date()),
		});

	const isConnected = useIsConnected();
	const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
	const { localCameraTrack } = useLocalCameraTrack(cameraOn);
	const remoteUsers = useRemoteUsers();
	const client = useRTCClient();

	if (remoteUsers.length > 0 && doctorEntered) {
		onDoctorLeft();
	}

	useJoin(
		{
			uid: uid,
			appid: import.meta.env.VITE_AGORA_APP_ID,
			channel: channelId,
			token,
		},
		calling,
	);

	const toggleMic = () => {
		setMic((prev) => {
			localMicrophoneTrack?.setEnabled(!prev);
			return !prev;
		});
	};

	const toggleCamera = () =>
		setCamera((prev) => {
			localCameraTrack?.setEnabled(!prev);
			return !prev;
		});

	const startCall = async () => {
		setIsPending(true);
		await onDoctorEntered();
		const result = await notification("/send", {
			method: "POST",
			body: JSON.stringify({
				title: "通話開始",
				body: `${currentDoctor?.lastName} ${currentDoctor?.firstName} さんから通話がありました`,
				token: account?.fcmTokenId,
			}),
		});

		if (result.status !== 200) {
			console.error("Failed to send notification");
		}
		setCalling(true);
	};

	const endCall = async () => {
		setIsCallFinished(true);
		await client.leave();
		await onDoctorLeft();
		setCalling(false);
		setMic(false);
		setCamera(false);
		localCameraTrack?.stop();
		localCameraTrack?.close();
		localMicrophoneTrack?.stop();
		localMicrophoneTrack?.close();
		navigation({
			to: `/doctors/calls/${channelId}/end`,
		});
	};

	const isSolo = remoteUsers.length === 0;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		return () => {
			if (isConnected) {
				endCall();
			}
		};
	}, [isConnected]);

	return {
		localCameraTrack,
		localMicrophoneTrack,
		micOn,
		cameraOn,
		isSolo,
		isConnected,
		remoteUsers,
		isCallFinished,
		isCalling: isPending,
		remoteUserName: `${user?.lastName} ${user?.firstName}`,
		startCall,
		endCall,
		toggleMic,
		toggleCamera,
	};
};

export default useVideoCall;
