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
	},
});

function LayoutComponent() {
	return (
		<div
			className={css({
				display: "flex",
			})}
		>
			<div
				className={css({
					width: "100px",
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
