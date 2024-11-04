import { useQuery } from "@tanstack/react-query";
import { queryKey } from "~/components/features/chat/hooks/queryKey.ts";
import { fetchJSON } from "~/util/api.ts";

export type Message = {
	messageID: string;
	chatID: string;
	senderID: string;
	firstName: string;
	lastName: string;
	content: string;
	sentAt: string;
};

export type MessageResult = {
	data: Message[];
};

type UseGetMessageHistory = {
	messages: Message[];
	isMessageLoading: boolean;
};

export const useGetMessageHistory = (chatID: string): UseGetMessageHistory => {
	const { data, isLoading } = useQuery({
		queryKey: queryKey.getByChatID(chatID),
		queryFn: async () => {
			const response = await fetchJSON<MessageResult>(
				`/chats/${chatID}/messages`,
			);
			return response.data;
		},
	});

	return {
		messages: data || [],
		isMessageLoading: isLoading,
	};
};
