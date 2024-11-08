import { createFileRoute } from "@tanstack/react-router";
import { useConnectionMessage } from "~/components/features/chat/hooks/useConnectionMessage.ts";
import { useGetMessageHistory } from "~/components/features/chat/hooks/useGetMessageHistory.ts";
import { Button } from "~/components/ui/button.tsx";

export const Route = createFileRoute("/_layout/doctors/chat/")({
	component: Chat,
});

function Chat() {
	const { messages: messageHistories } = useGetMessageHistory(
		"a1f24f60-99ef-11ef-8e52-cfa170f7b603",
	);

	const { messages, sendMessage } = useConnectionMessage(
		"a1f24f60-99ef-11ef-8e52-cfa170f7b603",
	);

	const handleSendMessage = () => {
		sendMessage("hello");
	};

	return (
		<>
			<div>
				{[...messageHistories, ...messages].map((message) => (
					<div key={message.messageID}>
						<div>{message.firstName}</div>
						<div>{message.sentAt}</div>
						<div>{message.content}</div>
					</div>
				))}
			</div>
			<Button onClick={handleSendMessage}>Send Message</Button>
		</>
	);
}
