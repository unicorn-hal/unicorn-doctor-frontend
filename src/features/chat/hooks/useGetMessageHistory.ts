import { useQuery } from "@tanstack/react-query";
import type { Message } from "~/domain/message/message";
import { fetchJSON } from "~/util/api.ts";
import { queryKey } from "./queryKey";

export type MessageResult = {
	data: Message[];
};

type UseGetMessageHistory = {
	messages: Message[];
	isMessageLoading: boolean;
};

export const useGetMessageHistory = (chatID: string): UseGetMessageHistory => {
	const { data, isLoading } = useQuery({
		queryKey: queryKey.getMessageByChatID(chatID),
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
