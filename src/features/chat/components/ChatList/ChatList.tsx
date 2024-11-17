import { FC } from "react";
import { css } from "styled-system/css";
import { ScreenSpinner } from "~/components/common";
import { Avatar } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { Chat } from "~/domain/chat/chat";

type ChatListProps = {
	chats: Chat[];
	selectedChat: Chat | null;
	isChatLoading: boolean;
	setSelectedChat: (chat: Chat) => void;
};

export const ChatList: FC<ChatListProps> = ({
	chats,
	selectedChat,
	isChatLoading,
	setSelectedChat,
}) => {
	const handleSelectChat = (chat: Chat) => {
		setSelectedChat(chat);
	};

	return (
		<div
			className={css({
				width: "33%",
				backgroundColor: "white",
				borderRight: "1px solid",
				borderColor: "gray.5",
				display: "flex",
				flexDirection: "column",
			})}
		>
			<div
				className={css({
					padding: "1rem",
					borderBottom: "1px solid",
					borderColor: "gray.5",
				})}
			>
				<Text variant={"heading"} size={"md"}>
					質問者チャット一覧
				</Text>
			</div>
			<div
				className={css({
					flex: 1,
					overflowY: "auto",
				})}
			>
				{isChatLoading && <ScreenSpinner height="80vh" />}
				{chats.map((chat) => (
					<div
						key={chat.chatID}
						className={css({
							padding: "1rem",
							borderBottom: "1px solid",
							borderColor: "gray.5",
							cursor: "pointer",
							backgroundColor:
								selectedChat?.chatID === chat.chatID
									? "blue.50"
									: "transparent",
							_hover: {
								backgroundColor: "gray.3",
							},
						})}
						onClick={() => handleSelectChat(chat)}
					>
						<div
							className={css({
								display: "flex",
								alignItems: "center",
							})}
						>
							<Avatar name={`${chat.user.lastName} ${chat.user.firstName}`} />
							<div
								className={css({
									marginLeft: "0.75rem",
									flex: 1,
								})}
							>
								<Text
									variant={"heading"}
								>{`${chat.user.lastName} ${chat.user.firstName}`}</Text>
								{chat.latestMessageText && (
									<Text
										className={css({
											fontSize: "sm",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
											maxWidth: "10rem",
										})}
									>
										{chat.latestMessageText}
									</Text>
								)}
							</div>
							{chat.latestMessageSentAt && (
								<Text
									className={css({
										fontSize: "xs",
										color: "gray.400",
									})}
								>
									{new Date(chat.latestMessageSentAt).toLocaleString("ja-JP", {
										month: "numeric",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</Text>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
