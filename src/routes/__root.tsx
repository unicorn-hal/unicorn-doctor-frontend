import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { css } from "styled-system/css";
import type { AuthContextType } from "~/components/providers/AuthProvider";

export const Route = createRootRouteWithContext<AuthContextType>()({
	component: App,
});

function App() {
	return (
		<div
			className={css({
				width: "100%",
			})}
		>
			<Outlet />
			<ReactQueryDevtools />
		</div>
	);
}
