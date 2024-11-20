import { FC } from "react";
import { css } from "styled-system/css";
import { ScreenSpinner } from "~/components/common";
import { Text } from "~/components/ui/text";
import { Chat } from "~/domain/chat/chat";
import { ChatCard } from "./ChatCard/ChatCard";

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
					<ChatCard
						key={chat.chatID}
						chat={chat}
						selectedChat={selectedChat}
						setSelectedChat={setSelectedChat}
					/>
				))}
			</div>
		</div>
	);
};
