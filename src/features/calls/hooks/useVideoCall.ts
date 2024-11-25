import { useEffect, useState } from "react";
import {
	useIsConnected,
	useJoin,
	useLocalMicrophoneTrack,
	useLocalCameraTrack,
	usePublish,
	useRemoteUsers,
} from "agora-rtc-react";
import { useNavigate } from "@tanstack/react-router";
import { useSetDoctorCallState } from "./useSetDoctorCallState";
import { useGetCallReservation } from "./useGetCallReservation";

interface UseVideoCallParams {
	uid: number;
	channelId: string;
	token: string;
}

const useVideoCall = ({ uid, channelId, token }: UseVideoCallParams) => {
	const [calling, setCalling] = useState(false);
	const [micOn, setMic] = useState(true);
	const [cameraOn, setCamera] = useState(true);
	const navigation = useNavigate();
	const { callReservation } = useGetCallReservation(channelId);
	const { onDoctorEntered, onDoctorLeft } = useSetDoctorCallState({
		channelId,
		userID: callReservation?.userID || "",
		startDate: new Date(callReservation?.callStartTime || new Date()),
		endDate: new Date(callReservation?.callEndTime || new Date()),
	});

	const isConnected = useIsConnected();
	const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
	const { localCameraTrack } = useLocalCameraTrack(cameraOn);
	const remoteUsers = useRemoteUsers();

	useJoin(
		{
			uid: uid,
			appid: import.meta.env.VITE_AGORA_APP_ID,
			channel: channelId,
			token,
		},
		calling,
	);
	usePublish([localMicrophoneTrack, localCameraTrack]);

	const toggleMic = () => setMic((prev) => !prev);
	const toggleCamera = () => setCamera((prev) => !prev);
	const startCall = async () => {
		await onDoctorEntered();
		setCalling(true);
	};
	const endCall = async () => {
		setCalling(false);
		localMicrophoneTrack?.stop();
		localCameraTrack?.stop();
		await onDoctorLeft();
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
		startCall,
		endCall,
		toggleMic,
		toggleCamera,
	};
};

export default useVideoCall;
