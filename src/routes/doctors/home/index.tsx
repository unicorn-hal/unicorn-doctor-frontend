import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import { auth } from "~/infrastructure/firebase";

export const Route = createFileRoute("/doctors/home/")({
	loader: async ({ context }) => {
		if (!context.currentUser) {
			return redirect({ to: "/signin" });
		}
	},
	component: Home,
});

function Home() {
	const navigate = useNavigate();
	const handleLogout = async () => {
		await signOut(auth);
		navigate({ to: "/signin" });
	};
	return (
		<div>
			<h1>Home</h1>
			<div>
				<button onClick={handleLogout}>Sign Out</button>
			</div>
		</div>
	);
}
