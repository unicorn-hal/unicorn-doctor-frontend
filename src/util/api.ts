import { auth } from "src/infrastructure/firebase";

export const fetchJSON = async <T>(
	url: string,
	init?: RequestInit,
): Promise<T> => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			"X-UID": auth.currentUser?.uid || "",
			...init?.headers,
		},
	});
	if (!response.ok) {
		throw new Error("Failed to fetch");
	}
	return response.json();
};

export const fetchURL = async (
	url: string,
	init?: RequestInit,
): Promise<Response> => {
	return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
		...init,
		headers: {
			"X-UID": auth.currentUser?.uid || "",
			...init?.headers,
		},
	});
};
