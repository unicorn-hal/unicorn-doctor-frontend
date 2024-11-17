import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Header } from "~/components/common";

export const Route = createFileRoute("/_layout")({
	component: LayoutComponent,
	loader: async ({ context }) => {
		if (!context.currentUser) {
			return redirect({ to: "/signin" });
		}
		if (context.currentDoctor === null) {
			return redirect({ to: "/signup/doctor" });
		}
	},
});

function LayoutComponent() {
	return (
		<>
			<Header />
			<div>
				<Outlet />
			</div>
		</>
	);
}
