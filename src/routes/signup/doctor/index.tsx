import { createFileRoute, redirect } from "@tanstack/react-router";
import { useGetDepartments } from "~/hooks/department/useGetDepartments";
import { useGetHospitals } from "~/hooks/hospital/useGetHospitals";
import { DoctorForm } from "~/features/doctor/components/DoctorForm/DoctorForm";
import { css } from "styled-system/css";
import { FullScreenSpinner } from "~/components/common";

export const Route = createFileRoute("/signup/doctor/")({
	component: DoctorSignup,
	loader: async ({ context }) => {
		if (!context.currentUser) {
			return redirect({ to: "/signin" });
		}
	},
});

export function DoctorSignup() {
	const { hospitals, isLoading: isHospitalsLoading } = useGetHospitals();
	const { departments, isLoading: isDepartmentsLoading } = useGetDepartments();

	if (isHospitalsLoading || isDepartmentsLoading) {
		return <FullScreenSpinner />;
	}

	return (
		<div>
			<div
				className={css({
					display: "flex",
					justifyContent: "center",
					marginY: "40px",
				})}
			>
				<DoctorForm departments={departments} hospitals={hospitals} />
			</div>
		</div>
	);
}
