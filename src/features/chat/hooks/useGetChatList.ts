import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "~/util/api.ts";
import { queryKey } from "./queryKey";
import { useAuth } from "~/components/providers/AuthProvider";
import { Chat } from "~/domain/chat/chat";

type ChatResult = {
	data: Chat[];
};

type UserGetChatList = {
	chats: Chat[];
	isChatLoading: boolean;
};

export const useGetChatList = (): UserGetChatList => {
	const { currentDoctor } = useAuth();
	const { data, isLoading } = useQuery({
		queryKey: queryKey.getChatByDoctorID(currentDoctor?.doctorID || ""),
		queryFn: async () => {
			const response = await fetchJSON<ChatResult>("/chats");
			return response.data;
		},
	});

	return {
		chats: data || [],
		isChatLoading: isLoading,
	};
};
