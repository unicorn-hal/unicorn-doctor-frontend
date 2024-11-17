export const queryKey = {
	all: ["chats"] as const,
	getMessageByChatID: (chatID: string) => [...queryKey.all, chatID] as const,
	getChatByDoctorID: (doctorID: string) => [...queryKey.all, doctorID] as const,
};
