import "./index.css";
import { createFileRoute, Link } from "@tanstack/react-router";
import MDEditor from "@uiw/react-md-editor";
import remarkBreaks from "remark-breaks";
import { useGetHealthCheckup } from "~/features/patients/hooks/useGetHelthCheckup";
import { useUpdateMedicalRecord } from "~/features/patients/hooks/useUpdateMedicalRecord";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Toast } from "~/components/ui/toast";
import { IconButton } from "~/components/ui/icon-button";
import { XIcon } from "lucide-react";
import { ScreenSpinner } from "~/components/common";

const toaster = Toast.createToaster({
	placement: "top-end",
	overlap: true,
	gap: 16,
});

export const Route = createFileRoute(
	"/_layout/doctors/patients/$patientId/healthCheckups/$healthCheckupId/edit/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { patientId, healthCheckupId } = Route.useParams();
	const { healthCheckup, isLoading } = useGetHealthCheckup(
		patientId,
		healthCheckupId,
	);
	const {
		medicalRecordValue,
		isPending,
		isValid,
		setMedicalRecordValue,
		mutateAsync,
	} = useUpdateMedicalRecord(
		healthCheckup,
		patientId,
		healthCheckupId,
		toaster,
	);

	const handleClick = async () => {
		await mutateAsync();
	};

	return (
		<>
			<div>
				{isLoading && <ScreenSpinner height="80vh" />}
				{healthCheckup && (
					<div
						className={css({
							margin: "1rem",
						})}
					>
						<MDEditor
							value={medicalRecordValue}
							onChange={setMedicalRecordValue}
							height={"82vh"}
							hideToolbar={true}
							previewOptions={{
								remarkPlugins: [[remarkBreaks]],
							}}
						/>
					</div>
				)}
				<div
					className={css({
						display: "flex",
						justifyContent: "flex-end",
						gap: "1rem",
						margin: "1rem",
					})}
				>
					<Link to={`/doctors/patients/${patientId}`}>
						<Button variant={"outline"}>キャンセル</Button>
					</Link>
					<Button disabled={!isValid} loading={isPending} onClick={handleClick}>
						保存
					</Button>
				</div>
			</div>
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
