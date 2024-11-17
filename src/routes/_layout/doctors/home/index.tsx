import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useAuth } from "~/components/providers/AuthProvider";
import { Button } from "~/components/ui/button";
import { auth } from "~/infrastructure/firebase";

export const Route = createFileRoute("/_layout/doctors/home/")({
	component: Home,
});

function Home() {
	const navigate = useNavigate();
	const { currentUser } = useAuth();

	useEffect(() => {
		if (!currentUser) {
			navigate({ to: "/signin" });
		}
	}, [currentUser, navigate]);

	const handleLogout = async () => {
		await signOut(auth);
	};

	return (
		<div>
			<h1>Home</h1>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
}
