import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { PatientDetails } from "~/features/patients/components/PatientDetail/PatientDetail";
import { useGetHealthCheckups } from "~/features/patients/hooks/useGetHealthCheckups";
import { useGetUser } from "~/hooks/user/useGetUser";

export const Route = createFileRoute("/_layout/doctors/patients/$patientId/")({
	component: Page,
});

function Page() {
	const { patientId } = Route.useParams();
	const { user } = useGetUser(patientId);
	const { healthCheckups } = useGetHealthCheckups(patientId);

	return (
		<>
			<Box
				className={css({
					p: "8",
				})}
			>
				<PatientDetails patient={user} healthCheckups={healthCheckups} />
			</Box>
		</>
	);
}
