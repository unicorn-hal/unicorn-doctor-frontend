export const queryKey = {
	getUserFcmTokeId: (userID: string) => ["userFcmToken", { userID }] as const,
};
