import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { useAuth } from "~/components/providers/AuthProvider";
import { PatientList } from "~/features/patients/primary/components/PatientList/PatientList";
import { useGetPatients } from "~/features/patients/primary/hooks/useGetPatients";

export const Route = createFileRoute("/_layout/doctors/patients/primary/")({
	component: Page,
});

function Page() {
	const { currentDoctor } = useAuth();
	const { patients } = useGetPatients(currentDoctor?.doctorID);
	return (
		<>
			<Box
				className={css({
					px: "10",
					py: "6",
				})}
			>
				<PatientList patients={patients} />
			</Box>
		</>
	);
}
