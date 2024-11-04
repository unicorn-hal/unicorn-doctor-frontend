import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./components/providers/AuthProvider";

// Create a new router instance
const router = createRouter({
	routeTree,
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	context: undefined!,
});

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const user = useAuth();
	return <RouterProvider router={router} context={user} />;
}

// Render the app
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<InnerApp />
				</QueryClientProvider>
			</AuthProvider>
		</StrictMode>,
	);
}
