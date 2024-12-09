export type User = {
	userID: string;
	firstName: string;
	lastName: string;
	email: string;
	gender: Gender;
	birthDate: string;
	address: string;
	postalCode: string;
	phoneNumber: string;
	iconImageUrl?: string;
	bodyHeight: number;
	bodyWeight: number;
	occupation: string;
};

type Gender = "male" | "female" | "other";

export const convertGender = (gender: Gender): string => {
	switch (gender) {
		case "male":
			return "男性";
		case "female":
			return "女性";
		case "other":
			return "その他";
	}
};
