import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { ScreenSpinner } from "~/components/common";
import { RobotList } from "~/features/robot/components/RobotList/RobotList";
import { useGetRobots } from "~/features/robot/hooks/useGetRobots";

export const Route = createFileRoute("/_layout/doctors/robots/")({
	component: Page,
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
					<RobotList robots={robots} />
				</Box>
			)}
		</>
	);
}
