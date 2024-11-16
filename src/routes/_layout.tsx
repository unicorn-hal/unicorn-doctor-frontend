import {
	Outlet,
	createFileRoute,
	Link,
	redirect,
} from "@tanstack/react-router";
import { css } from "../../styled-system/css";

export const Route = createFileRoute("/_layout")({
	component: LayoutComponent,
	loader: async ({ context }) => {
		if (!context.currentUser) {
			return redirect({ to: "/signin" });
		}
		if (!context.currentDoctor) {
			return redirect({ to: "/signup/doctor" });
		}
	},
});

function LayoutComponent() {
	return (
		<div>
			<div
				className={css({
					width: "100px",
					display: "flex",
					gap: "10px",
				})}
			>
				<div
					className={css({
						marginBottom: "10px",
					})}
				>
					<Link to="/doctors/home">Home</Link>
				</div>
				<div
					className={css({
						marginBottom: "10px",
					})}
				>
					<Link to="/doctors/chat">Chat</Link>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
