import {
	IAgoraRTCRemoteUser,
	ICameraVideoTrack,
	IMicrophoneAudioTrack,
	LocalUser,
	RemoteUser,
} from "agora-rtc-react";
import { VideoOff, Mic, MicOff, Video, PhoneOff } from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { Card } from "~/components/ui/card";
import { IconButton } from "~/components/ui/icon-button";

type CallCardProps = {
	cameraOn: boolean;
	micOn: boolean;
	remoteUsers: IAgoraRTCRemoteUser[];
	isSolo: boolean;
	localMicrophoneTrack: IMicrophoneAudioTrack | null;
	localCameraTrack: ICameraVideoTrack | null;
	doctorName: string;
	toggleMic: () => void;
	toggleCamera: () => void;
	endCall: () => Promise<void>;
};

export const CallCard: FC<CallCardProps> = ({
	cameraOn,
	micOn,
	remoteUsers,
	isSolo,
	localMicrophoneTrack,
	localCameraTrack,
	doctorName,
	toggleMic,
	toggleCamera,
	endCall,
}) => {
	return (
		<div
			className={css({
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "90vh",
				padding: "10",
				boxSizing: "border-box",
			})}
		>
			<Card.Root
				className={css({
					width: "100%",
					maxWidth: isSolo ? "1000px" : "1500px",
					display: "flex",
					flexDirection: "column",
				})}
			>
				<Card.Body
					className={css({
						padding: "9",
						flex: "1",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						gap: "4",
						"@media (min-width: 768px)": {
							flexDirection: isSolo ? "column" : "row",
						},
					})}
				>
					<div
						className={css({
							aspectRatio: "16/9",
							borderRadius: "lg",
							overflow: "hidden",
							position: "relative",
							flex: isSolo ? "1 1 100%" : "1 1 50%",
							maxWidth: "100%",
						})}
					>
						{cameraOn ? (
							<LocalUser
								audioTrack={localMicrophoneTrack}
								cameraOn={cameraOn}
								micOn={micOn}
								videoTrack={localCameraTrack}
								playAudio={false}
							>
								<samp
									className={css({
										bg: "gray.4",
										position: "absolute",
										borderRadius: "md",
										padding: "1",
										bottom: "2",
										left: "2",
										display: "flex",
										alignItems: "center",
									})}
								>
									{doctorName}
								</samp>
							</LocalUser>
						) : (
							<div
								className={css({
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "100%",
									height: "100%",
									bg: "gray.4",
								})}
							>
								<VideoOff
									className={css({ color: "gray.400" })}
									size={48}
									aria-hidden="true"
								/>
								<samp
									className={css({
										bg: "gray.4",
										position: "absolute",
										borderRadius: "md",
										padding: "1",
										bottom: "2",
										left: "2",
										display: "flex",
										lineHeight: "1",
										alignItems: "center",
									})}
								>
									{doctorName}
								</samp>
							</div>
						)}
					</div>

					{remoteUsers.map((user) => (
						<div
							key={user.uid}
							className={css({
								aspectRatio: "16/9",
								borderRadius: "lg",
								overflow: "hidden",
								position: "relative",
								flex: "1 1 50%",
								maxWidth: "100%",
								backgroundColor: "black",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								objectFit: "contain",
							})}
						>
							<RemoteUser
								user={user}
							/>
							<samp
								className={css({
									bg: "gray.4",
									position: "absolute",
									borderRadius: "md",
									padding: "1",
									bottom: "2",
									left: "2",
									display: "flex",
									alignItems: "center",
								})}
							>
								{user.uid}
							</samp>
						</div>
					))}
				</Card.Body>

				<Card.Footer
					className={css({
						display: "flex",
						justifyContent: "center",
						gap: "4",
						mt: "4",
						padding: "4",
						borderTop: "1px solid",
						borderColor: "gray.4",
						backgroundColor: "gray.2",
					})}
				>
					<IconButton
						className={css({
							borderRadius: "50%",
							bg: micOn ? "gray.12" : "gray.4",
							color: micOn ? "white" : "gray.11",
							"&:hover": { bg: micOn ? "gray.8" : "gray.5" },
						})}
						onClick={toggleMic}
						aria-label={micOn ? "マイクをオフにする" : "マイクをオンにする"}
						aria-pressed={!micOn}
						size={"2xl"}
					>
						{micOn ? <Mic size={48} /> : <MicOff size={48} />}
					</IconButton>
					<IconButton
						className={css({
							borderRadius: "full",
							bg: cameraOn ? "gray.12" : "gray.4",
							color: cameraOn ? "white" : "gray.11",
							"&:hover": { bg: cameraOn ? "gray.8" : "gray.5" },
						})}
						onClick={toggleCamera}
						aria-label={cameraOn ? "カメラをオフにする" : "カメラをオンにする"}
						aria-pressed={!cameraOn}
						size={"2xl"}
					>
						{cameraOn ? <Video size={48} /> : <VideoOff size={48} />}
					</IconButton>
					<IconButton
						className={css({
							borderRadius: "full",
							bg: "red.11",
							color: "white",
							"&:hover": { bg: "red.8" },
						})}
						onClick={async () => await endCall()}
						aria-label="通話を終了する"
						size={"2xl"}
					>
						<PhoneOff size={48} />
					</IconButton>
				</Card.Footer>
			</Card.Root>
		</div>
	);
};
