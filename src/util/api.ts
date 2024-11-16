import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { auth, storage } from "src/infrastructure/firebase";

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
			"Content-Type": "application/json",
			"X-UID": auth.currentUser?.uid || "",
			...init?.headers,
		},
	});
};

export const storageUpload = async (
	data: File,
) => {
	const imageRef = ref(storage, `doctors/${auth.currentUser?.uid}/profile/avatar.png`);
	await uploadBytes(imageRef, data);
	const url = await getDownloadURL(imageRef);
	return url;
}