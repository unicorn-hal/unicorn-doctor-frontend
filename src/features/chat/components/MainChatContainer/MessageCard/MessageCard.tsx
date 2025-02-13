import { Trash } from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { IconButton } from "~/components/ui/icon-button";
import { Message } from "~/domain/message/message";

type MessageCardProps = {
	message: Message;
	doctorID: string;
	isPending: boolean;
	onDelete: () => Promise<void>;
};

export const MessageCard: FC<MessageCardProps> = ({
	message,
	doctorID,
	isPending,
	onDelete,
}) => {
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
				<div
					className={css({
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
						marginTop: "1",
						gap: "1",
					})}
				>
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
					{message.senderID === doctorID && (
						<IconButton
							variant={"ghost"}
							onClick={onDelete}
							size={"xs"}
							disabled={isPending}
						>
							<Trash />
						</IconButton>
					)}
				</div>
			</div>
		</div>
	);
};
