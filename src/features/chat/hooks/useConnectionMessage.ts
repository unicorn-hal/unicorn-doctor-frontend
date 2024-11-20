import { useEffect, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import { fetchJSON } from "~/util/api.ts";
import { useMutation } from "@tanstack/react-query";
import { Message } from "~/domain/message/message";
import { auth } from "~/infrastructure/firebase";

interface UseConnectionMessage {
	connected: boolean;
	messages: Message[];
	input: string;
	isPending: boolean;
	onInputMessage: (content: string) => void;
	sendMessage: () => void;
}

export const useConnectionMessage = (chatID: string): UseConnectionMessage => {
	const [client, setClient] = useState<Client | null>(null);
	const [connected, setConnected] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		const stompClient = new Client({
			brokerURL: `${import.meta.env.VITE_API_URL}/ws`,
			reconnectDelay: 5000,
			connectHeaders: {
				// 'Authorization': 'Bearer your_token_here',
			},
			debug: (str) => {
				console.log(str);
			},
		});

		stompClient.onConnect = () => {
			setConnected(true);
			setClient(stompClient);
			stompClient.subscribe(
				`/topic/chats/${chatID}/messages`,
				(message: IMessage) => {
					const messageBody: Message = JSON.parse(message.body);
					setMessages((prevState) => [...prevState, messageBody]);
				},
			);
		};

		stompClient.onStompError = (frame) => {
			console.error(`Broker reported error: ${frame.headers.message}`);
			console.error(`Additional details: ${frame.body}`);
		};

		stompClient.activate();

		return () => {
			stompClient.deactivate();
			setConnected(false);
			setMessages([]);
		};
	}, [chatID]);

	const { mutateAsync: sendMessage, isPending } = useMutation({
		mutationFn: async () => {
			if (!client) return;
			if (!input && input.length) return;
			await fetchJSON(`/chats/${chatID}/messages`, {
				method: "POST",
				body: JSON.stringify({
					senderID: auth.currentUser?.uid,
					content: input,
				}),
			});
			setInput("");
		},
	});

	const onInputMessage = (content: string) => {
		setInput(content);
	};

	return { connected, messages, isPending, input, onInputMessage, sendMessage };
};
