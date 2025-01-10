import { useDialog } from "@ark-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { useConfirmationDialog } from "~/components/common/ConfirmationDialog/ConfirmationDialogProvider";
import { IconButton } from "~/components/ui/icon-button";
import { Toast } from "~/components/ui/toast";
import { HospitalNewsCreateDialog } from "~/features/hospitals/components/HospitalNewsCreateDialog/HospitalNewsCreateDialog";
import { HospitalNewsList } from "~/features/hospitals/components/HospitalNewsList/HospitalNewsList";
import { useDeleteHospitalNews } from "~/features/hospitals/hooks/useDeleteHospitalNews";
import { useGetHospitalNews } from "~/features/hospitals/hooks/useGetHospitalNews";

const toaster = Toast.createToaster({
	placement: "top-end",
	overlap: true,
	gap: 16,
});

export const Route = createFileRoute(
	"/_layout/doctors/hospitals/$hospitalID/news/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { hospitalID } = Route.useParams();
	const { hospitalNews } = useGetHospitalNews(hospitalID);
	const { mutateAsync } = useDeleteHospitalNews(hospitalID);
	const { open, setOpen } = useDialog();
	const openConfirmDialog = useConfirmationDialog();

	const handleDelete = async (hospitalNewsID: string) => {
		const result = await openConfirmDialog({
			title: "ニュース削除",
			description: "このニュースを削除してよろしいですか？",
		});
		if (!result) return;
		await mutateAsync(hospitalNewsID);
	};
	return (
		<>
			<Box
				className={css({
					px: "10",
					py: "6",
				})}
			>
				<HospitalNewsList
					data={hospitalNews}
					onDelete={handleDelete}
					onCreate={() => setOpen(true)}
				/>
			</Box>
			<HospitalNewsCreateDialog
				open={open}
				onClose={() => setOpen(false)}
				hospitalID={hospitalID}
				toaster={toaster}
			/>
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
