import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "~/components/providers/AuthProvider";

export const Route = createRootRouteWithContext<AuthContextType>()({
	component: App,
});

function App() {
	return (
		<>
			<Outlet />
			<ReactQueryDevtools />
		</>
	);
}
