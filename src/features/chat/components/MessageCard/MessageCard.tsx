import { FC } from "react";
import { css } from "styled-system/css";
import { Message } from "~/domain/message/message";

type MessageCardProps = {
	message: Message;
	doctorID: string;
};

export const MessageCard: FC<MessageCardProps> = ({ message, doctorID }) => {
	return (
		<div
			key={message.messageID}
			className={css({
				display: "flex",
				justifyContent:
					message.senderID === doctorID ? "flex-end" : "flex-start",
			})}
		>
			<div
				className={css({
					maxWidth: {
						base: "20rem",
						lg: "28rem",
					},
					textAlign: message.senderID === doctorID ? "right" : "left",
				})}
			>
				<div
					className={css({
						display: "inline-block",
						borderRadius: "lg",
						padding: "0.5rem",
						backgroundColor:
							message.senderID === doctorID ? "gray.12" : "gray.4",
						color: message.senderID === doctorID ? "white" : "black",
					})}
				>
					<p>{message.content}</p>
				</div>
				<p
					className={css({
						fontSize: "xs",
						color: "gray.500",
						marginTop: "0.25rem",
					})}
				>
					{new Date(message.sentAt).toLocaleString("ja-JP", {
						month: "numeric",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
			</div>
		</div>
	);
};
