import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<>
			<div>Home</div>
			<Link to={"/signin"}>
				<Button>Sign In</Button>
			</Link>
		</>
	);
}
