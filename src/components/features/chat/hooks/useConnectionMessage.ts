import { useEffect, useState } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { fetchJSON } from "~/util/api.ts";
import { useMutation } from "@tanstack/react-query";
import { Message } from "~/components/features/chat/hooks/useGetMessageHistory.ts";

interface UseConnectionMessage {
	connected: boolean;
	messages: Message[];
	sendMessage: (content: string) => void;
}

export const useConnectionMessage = (chatID: String): UseConnectionMessage => {
	const [client, setClient] = useState<CompatClient | null>(null);
	const [connected, setConnected] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const socket = new WebSocket(`${import.meta.env.VITE_API_URL}/ws`);
	const stompClient = Stomp.over(socket);

	useEffect(() => {
		stompClient.connect(
			{},
			() => {
				setConnected(true);
				setClient(stompClient);
				stompClient.subscribe(`/topic/chats/${chatID}/messages`, (message) => {
					const messageBody: Message = JSON.parse(message.body);
					setMessages((prevState) => [...prevState, messageBody]);
				});
			},
			(error: any) => {
				console.error(error);
			},
		);
		return () => {
			if (stompClient) {
				stompClient.disconnect();
			}
			setConnected(false);
		};
	}, []);

	const { mutateAsync: sendMessage } = useMutation({
		mutationFn: async (content: string) => {
			if (!client) return;
			await fetchJSON(`/chats/${chatID}/messages`, {
				method: "POST",
				body: JSON.stringify({
					senderID: "doctor",
					content: content,
				}),
			});
		},
	});

	return { connected, messages, sendMessage };
};
