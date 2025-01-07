import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { useConfirmationDialog } from "~/components/common/ConfirmationDialog/ConfirmationDialogProvider";
import { HospitalNewsList } from "~/features/hospitals/components/HospitalNewsList/HospitalNewsList";
import { useDeleteHospitalNews } from "~/features/hospitals/hooks/useDeleteHospitalNews";
import { useGetHospitalNews } from "~/features/hospitals/hooks/useGetHospitalNews";

export const Route = createFileRoute(
	"/_layout/doctors/hospitals/$hospitalID/news/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { hospitalID } = Route.useParams();
	const { hospitalNews } = useGetHospitalNews(hospitalID);
	const { mutateAsync } = useDeleteHospitalNews(hospitalID);
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
		<Box
			className={css({
				px: "10",
				py: "6",
			})}
		>
			<HospitalNewsList
				data={hospitalNews}
				onDelete={handleDelete}
				onCreate={() => {}}
			/>
		</Box>
	);
}
