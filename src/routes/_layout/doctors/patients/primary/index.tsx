import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { ScreenSpinner } from "~/components/common";
import { useAuth } from "~/components/providers/AuthProvider";
import { PatientList } from "~/features/patients/components/PatientList/PatientList";
import { useGetPatients } from "~/features/patients/hooks/useGetPatients";

export const Route = createFileRoute("/_layout/doctors/patients/primary/")({
	component: Page,
});

function Page() {
	const { currentDoctor } = useAuth();
	const { patients, isLoading } = useGetPatients(currentDoctor?.doctorID);
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
					<PatientList patients={patients} />
				</Box>
			)}
		</>
	);
}
