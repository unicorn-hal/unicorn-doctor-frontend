import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/account/")({
	component: SighUp,
});

function SighUp() {
	return (
		<div>
			<h1>Sign Up</h1>
		</div>
	);
}
