export const queryKey = {
	all: ["chats"] as const,
	getByChatID: (chatID: string) => [...queryKey.all, chatID] as const,
};
