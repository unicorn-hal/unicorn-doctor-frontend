import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { useAuth } from "~/components/providers/AuthProvider";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const { currentUser } = useAuth();
	return (
		<>
			<div>Home</div>
			{currentUser ? (
				<Link to={"/doctors/home"}>
					<Button>Go to Home</Button>
				</Link>
			) : (
				<Link to={"/signin"}>
					<Button>Sign In</Button>
				</Link>
			)}
		</>
	);
}
