import { useState, useRef, useEffect, FC } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneCall } from "lucide-react";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { IconButton } from "~/components/ui/icon-button";

type CallWaitingProps = {
	doctorName: string;
	micOn: boolean;
	cameraOn: boolean;
	isCalling: boolean;
	toggleMic: () => void;
	toggleCamera: () => void;
	startCall: () => void;
};

export const CallWaiting: FC<CallWaitingProps> = ({
	doctorName,
	micOn,
	cameraOn,
	isCalling,
	toggleMic,
	toggleCamera,
	startCall,
}) => {
	const [error, setError] = useState<string | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const streamRef = useRef<MediaStream | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let isMounted = true;

		const initializeStream = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: true,
				});

				if (isMounted) {
					if (videoRef.current) {
						videoRef.current.srcObject = stream;
					}
					streamRef.current = stream;
					stream.getAudioTracks().map((track) => {
						track.enabled = micOn;
					});
				} else {
					stream.getTracks().map((track) => track.stop());
				}
			} catch (err) {
				if (isMounted) {
					console.error("Error accessing media devices.", err);
					setError(
						"カメラへのアクセスができません。デバイスの設定を確認してください。",
					);
				}
			}
		};

		if (cameraOn) {
			initializeStream();
		} else {
			if (streamRef.current) {
				streamRef.current.getTracks().map((track) => track.stop());
				streamRef.current = null;
				if (videoRef.current) {
					videoRef.current.srcObject = null;
				}
			}
		}

		return () => {
			isMounted = false;
			if (streamRef.current) {
				streamRef.current.getTracks().map((track) => track.stop());
				streamRef.current = null;
			}
			if (videoRef.current) {
				videoRef.current.srcObject = null;
			}
		};
	}, [cameraOn]);

	useEffect(() => {
		if (streamRef.current) {
			streamRef.current.getAudioTracks().map((track) => {
				track.enabled = micOn;
			});
		}
	}, [micOn]);

	return (
		<div
			className={css({
				minHeight: "80vh",
				bg: "white",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "4",
			})}
		>
			<Card.Root w={"800px"}>
				<Card.Header>
					<Card.Title>
						<Text>通話待機室</Text>
					</Card.Title>
					<Text>こんにちは、{doctorName}先生。</Text>
				</Card.Header>
				<Card.Body>
					<div
						className={css({
							aspectRatio: "16/9",
							bg: "gray.100",
							borderRadius: "lg",
							overflow: "hidden",
							mb: "4",
							position: "relative",
						})}
					>
						{cameraOn ? (
							<video
								ref={videoRef}
								autoPlay
								playsInline
								muted
								className={css({
									width: "100%",
									height: "100%",
									objectFit: "cover",
									transform: "scaleX(-1)",
								})}
								aria-label="カメラプレビュー"
							/>
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
							</div>
						)}
						{error && (
							<div
								className={css({
									position: "absolute",
									inset: "0",
									bg: "gray.9",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								})}
							>
								<p
									className={css({
										color: "white",
										textAlign: "center",
										padding: "4",
									})}
								>
									{error}
								</p>
							</div>
						)}
					</div>
					<div
						className={css({
							display: "flex",
							justifyContent: "center",
							gap: "4",
							mb: "10",
						})}
					>
						<IconButton
							className={css({
								borderRadius: "50%",
								bg: micOn ? "gray.12" : "gray.2",
								color: micOn ? "white" : "gray.11",
								"&:hover": { bg: micOn ? "gray.8" : "gray.3" },
							})}
							onClick={toggleMic}
							aria-label={micOn ? "マイクをオフにする" : "マイクをオンにする"}
							aria-pressed={!micOn}
							size={"xl"}
						>
							{micOn ? <Mic size={48} /> : <MicOff size={48} />}
						</IconButton>
						<IconButton
							className={css({
								borderRadius: "full",
								bg: cameraOn ? "gray.12" : "gray.2",
								color: cameraOn ? "white" : "gray.11",
								"&:hover": { bg: cameraOn ? "gray.8" : "gray.3" },
							})}
							onClick={toggleCamera}
							aria-label={
								cameraOn ? "カメラをオフにする" : "カメラをオンにする"
							}
							aria-pressed={!cameraOn}
							size={"xl"}
						>
							{cameraOn ? <Video size={48} /> : <VideoOff size={48} />}
						</IconButton>
					</div>
					<Button
						className={css({
							color: "white",
							borderRadius: "lg",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							"&:hover": { bg: "gray.8" },
						})}
						size={"xl"}
						aria-label="通話に参加する"
						onClick={startCall}
						loading={isCalling}
					>
						<PhoneCall className={css({ mr: "2" })} size={48} />
						通話に参加する
					</Button>
				</Card.Body>
			</Card.Root>
		</div>
	);
};
