import { createFileRoute } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { ScreenSpinner } from "~/components/common";
import { IconButton } from "~/components/ui/icon-button";
import { Toast } from "~/components/ui/toast";
import { RobotContainer } from "~/features/robot/components/RobotContainer/RobotContainer";
import { useGetRobots } from "~/features/robot/hooks/useGetRobots";

export const Route = createFileRoute("/_layout/doctors/robots/")({
	component: Page,
});

const toaster = Toast.createToaster({
	placement: "bottom-end",
	overlap: true,
	gap: 16,
});

function Page() {
	const { robots, isLoading } = useGetRobots();
	return (
		<>
			{isLoading ? (
				<ScreenSpinner height="80vh" />
			) : (
				<Box
					className={css({
						px: "10",
						py: "6",
					})}
				>
					<RobotContainer robots={robots} toaster={toaster} />
				</Box>
			)}
			<Toast.Toaster toaster={toaster}>
				{(toast) => (
					<Toast.Root key={toast.id}>
						<Toast.Title>{toast.title}</Toast.Title>
						<Toast.Description>{toast.description}</Toast.Description>
						<Toast.CloseTrigger asChild>
							<IconButton size="sm" variant="link">
								<XIcon />
							</IconButton>
						</Toast.CloseTrigger>
					</Toast.Root>
				)}
			</Toast.Toaster>
		</>
	);
}
