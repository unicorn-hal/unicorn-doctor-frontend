export const queryKey = {
	all: ["doctors"] as const,
	findBy: (uid: string) => ["doctors", uid] as const,
};
