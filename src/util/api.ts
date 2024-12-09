import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "src/infrastructure/firebase";

export const fetchJSON = async <T>(
	url: string,
	init?: RequestInit,
): Promise<T> => {
	const token = await auth.currentUser?.getIdToken();
	const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			"X-UID": auth.currentUser?.uid || "",
			Authorization: `Bearer ${token}`,
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
	const token = await auth.currentUser?.getIdToken();
	return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			"X-UID": auth.currentUser?.uid || "",
			Authorization: `Bearer ${token}`,
			...init?.headers,
		},
	});
};

export const fetchRtcToken = async <T>(
	url: string,
	init?: RequestInit,
): Promise<T> => {
	const token = await auth.currentUser?.getIdToken();
	const response = await fetch(`${import.meta.env.VITE_RTC_TOKEN_URL}${url}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch");
	}

	return response.json();
};

export const notification = async <T>(
	url: string,
	init?: RequestInit,
): Promise<Response> => {
	const token = await auth.currentUser?.getIdToken();
	return await fetch(`${import.meta.env.VITE_NOTIFICATION_API_URL}${url}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const storageUpload = async (data: File) => {
	const imageRef = ref(
		storage,
		`doctors/${auth.currentUser?.uid}/profile/avatar.png`,
	);
	await uploadBytes(imageRef, data);
	const url = await getDownloadURL(imageRef);
	return url;
};
