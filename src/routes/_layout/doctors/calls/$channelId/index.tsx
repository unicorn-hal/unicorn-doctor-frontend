import { createFileRoute } from "@tanstack/react-router";
import { usePublish } from "agora-rtc-react";
import { ScreenSpinner } from "~/components/common";
import { useAuth } from "~/components/providers/AuthProvider";
import { CallCard } from "~/features/calls/components/CallCard/CallCard";
import { CallWaiting } from "~/features/calls/components/CallWaiting/CallWaiting";
import { useGetRtcToken } from "~/features/calls/hooks/useGetRtcToken";
import useVideoCall from "~/features/calls/hooks/useVideoCall";

export const Route = createFileRoute("/_layout/doctors/calls/$channelId/")({
	component: Call,
});

function Call() {
	const { channelId } = Route.useParams();
	const { currentDoctor } = useAuth();
	const { uid, token, isLoading } = useGetRtcToken(channelId);

	const {
		localCameraTrack,
		localMicrophoneTrack,
		micOn,
		cameraOn,
		isConnected,
		remoteUsers,
		isSolo,
		startCall,
		endCall,
		toggleMic,
		toggleCamera,
	} = useVideoCall({ uid, channelId, token });

	usePublish([localMicrophoneTrack, localCameraTrack]);

	return (
		<>
			{isLoading && <ScreenSpinner height={"90vh"} />}
			{isConnected ? (
				<CallCard
					localCameraTrack={localCameraTrack}
					localMicrophoneTrack={localMicrophoneTrack}
					micOn={micOn}
					cameraOn={cameraOn}
					isSolo={isSolo}
					remoteUsers={remoteUsers}
					doctorName={`${currentDoctor?.lastName} ${currentDoctor?.firstName}`}
					endCall={endCall}
					toggleMic={toggleMic}
					toggleCamera={toggleCamera}
				/>
			) : (
				<CallWaiting
					doctorName={`${currentDoctor?.lastName} ${currentDoctor?.firstName}`}
					micOn={micOn}
					cameraOn={cameraOn}
					toggleMic={toggleMic}
					toggleCamera={toggleCamera}
					startCall={startCall}
				/>
			)}
		</>
	);
}