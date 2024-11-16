import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../../infrastructure/firebase"; // あなたのFirebase設定ファイルへのパスに調整してください
import { Spinner } from "../ui/spinner";
import { Doctor } from "~/domain/doctor/doctor";
import { fetchURL } from "~/util/api";

export interface AuthContextType {
	currentUser: User | null;
	currentDoctor: Doctor | null;
}

export const AuthContext = createContext<AuthContextType>({
	currentUser: null,
	currentDoctor: null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			setCurrentUser(user);
			if (user) {
				const result = await fetchURL(`/doctors/${user.uid}`);
				if (result.ok) {
					const data: Doctor = await result.json();
					setCurrentDoctor(data);
				}
			}
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, currentDoctor }}>
			{loading ? <Spinner /> : children}
		</AuthContext.Provider>
	);
}
