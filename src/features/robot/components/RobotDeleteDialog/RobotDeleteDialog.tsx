import { CreateToasterReturn } from "@ark-ui/react";
import { XIcon } from "lucide-react";
import { FC } from "react";
import { Stack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { IconButton } from "~/components/ui/icon-button";
import { Robot } from "~/domain/robot/robot";
import { useDeleteRobot } from "../../hooks/useDeleteRobot";
import { css } from "styled-system/css";

type RobotDeleteDialogProps = {
	open: boolean;
	onClose: () => void;
	robot: Robot;
	toaster: CreateToasterReturn;
};

export const RobotDeleteDialog: FC<RobotDeleteDialogProps> = ({
	open,
	onClose,
	robot,
	toaster,
}) => {
	const { onSubmit, isPending } = useDeleteRobot(robot, toaster);
	const handleSubmit = async () => {
		await onSubmit();
		onClose();
	};
	return (
		<Dialog.Root open={open} onOpenChange={onClose}>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Stack gap="8" p="6">
						<Stack gap="1">
							<Dialog.Title>ロボット削除</Dialog.Title>
							<Dialog.Description>
								ロボットを削除してよろしいですか？
							</Dialog.Description>
						</Stack>
						<Stack gap="3" direction="row" width="full">
							<Dialog.CloseTrigger asChild>
								<Button variant="outline" width="full">
									キャンセル
								</Button>
							</Dialog.CloseTrigger>
							<Button
								width="full"
								onClick={handleSubmit}
								variant={"solid"}
								className={css({
									color: "white",
									bgColor: "red.10",
								})}
								loading={isPending}
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
