import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { ProfileCard } from "~/features/profile/components/ProfileCard/ProfileCard";

export const Route = createFileRoute("/_layout/doctors/profile/")({
	component: Profile,
});

function Profile() {
	const { currentDoctor } = Route.useRouteContext();

	return (
		<Box
			className={css({
				mt: "20",
				display: "flex",
				justifyContent: "center",
			})}
		>
			{currentDoctor && <ProfileCard doctor={currentDoctor} />}
		</Box>
	);
}
