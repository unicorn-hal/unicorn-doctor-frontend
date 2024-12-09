import { createFileRoute } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { useAuth } from "~/components/providers/AuthProvider";
import { IconButton } from "~/components/ui/icon-button";
import { Toast } from "~/components/ui/toast";
import { ProfileCard } from "~/features/profile/components/ProfileCard/ProfileCard";
import { ProfileEditCard } from "~/features/profile/components/ProfileEditCard/ProfileEditCard";

export const Route = createFileRoute("/_layout/doctors/profile/")({
	component: Profile,
});

const toaster = Toast.createToaster({
	placement: 'bottom-end',
	overlap: true,
	gap: 16,
})

function Profile() {
	const { currentDoctor } = useAuth();
	const [isEdit, setIsEdit] = useState(false);

	const onEdit = () => {
		setIsEdit(true);
	};

	const onCancel = () => {
		setIsEdit(false);
	};

	return (
		<>
			<Box
				className={css({
					my: "20",
					display: "flex",
					justifyContent: "center",
				})}
			>
				{currentDoctor && !isEdit && (
					<ProfileCard doctor={currentDoctor} onEdit={onEdit} />
				)}
				{currentDoctor && isEdit && (
					<ProfileEditCard
						doctor={currentDoctor}
						onCancel={onCancel}
						toaster={toaster}
					/>
				)}
			</Box>
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
