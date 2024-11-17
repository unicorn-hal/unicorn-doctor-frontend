import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { User } from "firebase/auth";
import { auth } from "../../infrastructure/firebase"; // あなたのFirebase設定ファイルへのパスに調整してください
import { Doctor } from "~/domain/doctor/doctor";
import { fetchURL } from "~/util/api";
import { FullScreenSpinner } from "../common/FullScreenSpinner/FullScreenSpinner";

export interface AuthContextType {
	currentUser: User | null;
	currentDoctor: Doctor | null | undefined;
	doctorLoading: boolean;
	setCurrentDoctor: () => Promise<Doctor | null>;
}

export const AuthContext = createContext<AuthContextType>({
	currentUser: null,
	currentDoctor: undefined,
	doctorLoading: false,
	setCurrentDoctor: async () => null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [currentDoctor, setCurrentDoctor] = useState<
		Doctor | null | undefined
	>();
	const [loading, setLoading] = useState(true);
	const [doctorLoading, setDoctorLoading] = useState(false);

	const setCurrentDoctorCallback = useCallback(async () => {
		setDoctorLoading(true);
		try {
			const result = await fetchURL(`/doctors/${auth.currentUser?.uid}`);
			if (!result.ok) {
				if (result.status === 404) {
					setCurrentDoctor(null);
					return null;
				}
				throw new Error("Failed to fetch doctor");
			}
			const data: Doctor = await result.json();
			setCurrentDoctor(data);
			return data;
		} catch (error) {
			console.error(error);
			return null;
		} finally {
			setDoctorLoading(false);
		}
	}, []);

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
		<AuthContext.Provider
			value={{
				currentUser,
				currentDoctor,
				doctorLoading,
				setCurrentDoctor: setCurrentDoctorCallback,
			}}
		>
			{loading ? <FullScreenSpinner /> : children}
		</AuthContext.Provider>
	);
}
