export type Account = {
	uid: string;
	role: Role;
	fcmTokenId: string;
};

type Role = "user" | "doctor";
