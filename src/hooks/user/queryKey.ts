export const queryKey = {
	getByUserID: (userID: string) => ["user", { userID }] as const,
};
