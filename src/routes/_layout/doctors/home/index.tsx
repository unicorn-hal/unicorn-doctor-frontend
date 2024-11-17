import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/doctors/home/")({
	component: Home,
});

function Home() {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}
