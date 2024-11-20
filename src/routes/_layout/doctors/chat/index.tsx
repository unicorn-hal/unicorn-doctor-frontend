import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { css } from "styled-system/css";
import { type Chat } from "~/domain/chat/chat";
import { ChatList } from "~/features/chat/components/ChatList/ChatList";
import { MainChatContainer } from "~/features/chat/components/MainChat/MainChatContainer";
import { useGetChatList } from "~/features/chat/hooks/useGetChatList";

export const Route = createFileRoute("/_layout/doctors/chat/")({
	component: ChatPage,
});

function ChatPage() {
	const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
	const { chats, isChatLoading } = useGetChatList();

	return (
		<div
			className={css({
				display: "flex",
				height: "calc(100vh - 70px)",
			})}
		>
			<ChatList
				chats={chats}
				selectedChat={selectedChat}
				isChatLoading={isChatLoading}
				setSelectedChat={setSelectedChat}
			/>
			<MainChatContainer selectedChat={selectedChat} />
		</div>
	);
}
