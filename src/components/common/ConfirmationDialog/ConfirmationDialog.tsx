import { XIcon } from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { Stack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { IconButton } from "~/components/ui/icon-button";

type ConfirmationDialogProps = {
	onClose: () => void;
	onSubmit: () => void;
	title: string;
	description: string;
	open: boolean;
};

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
	title,
	open,
	description,
	onClose,
	onSubmit,
}) => {
	return (
		<Dialog.Root open={open} onOpenChange={onClose}>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Stack gap="8" p="6">
						<Stack gap="1">
							<Dialog.Title>{title}</Dialog.Title>
							<Dialog.Description>{description}</Dialog.Description>
						</Stack>
						<Stack gap="3" direction="row" width="full">
							<Dialog.CloseTrigger asChild>
								<Button variant="outline" width="full">
									キャンセル
								</Button>
							</Dialog.CloseTrigger>
							<Button
								width="full"
								onClick={onSubmit}
								variant={"solid"}
								className={css({
									bgColor: "red.10",
								})}
							>
								削除
							</Button>
						</Stack>
					</Stack>
					<Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
						<IconButton aria-label="Close Dialog" variant="ghost" size="sm">
							<XIcon />
						</IconButton>
					</Dialog.CloseTrigger>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};
