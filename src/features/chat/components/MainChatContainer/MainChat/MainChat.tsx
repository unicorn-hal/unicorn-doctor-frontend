import { FC, useEffect, useRef } from "react";
import { css } from "styled-system/css";
import { Chat } from "~/domain/chat/chat";
import { useConnectionMessage } from "../../../hooks/useConnectionMessage";
import { useGetMessageHistory } from "../../../hooks/useGetMessageHistory";
import { MessageCard } from "../MessageCard/MessageCard";
import { MessageForm } from "../MessageForm/MessageForm";
import { ChatHeader } from "../../ChatList/ChatHeader/ChatHeader";
import { ScreenSpinner } from "~/components/common";
import { useDeleteMessage } from "~/features/chat/hooks/useDeleteMessage";
import { useConfirmationDialog } from "~/components/common/ConfirmationDialog/ConfirmationDialogProvider";

type MainChatProps = {
	selectedChat: Chat;
};

export const MainChat: FC<MainChatProps> = ({ selectedChat }) => {
	const { messages: messageHistories, isMessageLoading } = useGetMessageHistory(
		selectedChat.chatID,
	);

	const {
		messages,
		input,
		isPending,
		sendMessage,
		onInputMessage,
		clearMessages,
	} = useConnectionMessage(selectedChat.chatID);

	const { isPending: isDeletePending, onSubmit: onDelete } = useDeleteMessage(
		selectedChat.chatID,
	);

	const openConfirmDialog = useConfirmationDialog();

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(scrollToBottom, [messageHistories, messages]);

	const handleDeleteMessage = async (messageID: string) => {
		const result = await openConfirmDialog({
			title: "メッセージ削除",
			description: "このメッセージを削除してよろしいですか？",
		});
		if (!result) return;
		await onDelete(messageID);
		clearMessages();
	};

	return (
		<>
			<ChatHeader
				userIconUrl={selectedChat.user.userIconUrl || undefined}
				userName={`${selectedChat.user.lastName} ${selectedChat.user.firstName}`}
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
					.filter(
						(message, index, self) =>
							self.findIndex((m) => m.messageID === message.messageID) ===
							index,
					)
					.map((message) => (
						<MessageCard
							key={message.messageID}
							message={message}
							isPending={isPending || isDeletePending}
							doctorID={selectedChat.doctor.doctorID}
							onDelete={() => handleDeleteMessage(message.messageID)}
						/>
					))}
				<div ref={messagesEndRef} />
			</div>
			<MessageForm
				isMessageLoading={isMessageLoading}
				input={input}
				isPending={isPending || isDeletePending}
				onInputMessage={onInputMessage}
				onSubmit={sendMessage}
			/>
		</>
	);
};
