import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../../infrastructure/firebase"; // あなたのFirebase設定ファイルへのパスに調整してください
import { Spinner } from "../ui/spinner";

export interface AuthContextType {
	currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null });

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{loading ? <Spinner /> : children}
		</AuthContext.Provider>
	);
}
