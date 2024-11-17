export type Chat = {
	chatID: string;
	doctor: {
		doctorID: string;
		doctorIconUrl: string | null;
		firstName: string;
		lastName: string;
	};
	user: {
		userID: string;
		userIconUrl: string | null;
		firstName: string;
		lastName: string;
	};
	latestMessageText: string | null;
	latestMessageSentAt: string | null;
};
