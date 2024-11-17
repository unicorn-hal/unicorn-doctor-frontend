import { FC, useEffect, useRef } from "react";
import { css } from "styled-system/css";
import { Chat } from "~/domain/chat/chat";
import { useConnectionMessage } from "../../hooks/useConnectionMessage";
import { useGetMessageHistory } from "../../hooks/useGetMessageHistory";
import { MessageCard } from "../MessageCard/MessageCard";
import { MessageForm } from "../MessageForm/MessageForm";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { ScreenSpinner } from "~/components/common";

type MainChatProps = {
	selectedChat: Chat;
};

export const MainChat: FC<MainChatProps> = ({ selectedChat }) => {
	const { messages: messageHistories, isMessageLoading } = useGetMessageHistory(
		selectedChat.chatID,
	);

	const { messages, input, isPending, sendMessage, onInputMessage } =
		useConnectionMessage(selectedChat.chatID);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(scrollToBottom, [messageHistories, messages]);

	return (
		<>
			<ChatHeader
				useName={`${selectedChat.user.lastName} ${selectedChat.user.firstName}`}
			/>
			<div
				className={css({
					flex: 1,
					overflowY: "auto",
					padding: "1rem",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				})}
				role="log"
				aria-live="polite"
			>
				{isMessageLoading && <ScreenSpinner />}
				{[...messageHistories, ...messages]
					.filter((message) => message.chatID === selectedChat.chatID)
					.map((message) => (
						<MessageCard
							key={message.messageID}
							message={message}
							doctorID={selectedChat.doctor.doctorID}
						/>
					))}
				<div ref={messagesEndRef} />
			</div>
			<MessageForm
				isMessageLoading={isMessageLoading}
				input={input}
				isPending={isPending}
				onInputMessage={onInputMessage}
				onSubmit={sendMessage}
			/>
		</>
	);
};