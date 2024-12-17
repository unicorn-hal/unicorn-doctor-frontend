import { XIcon } from "lucide-react";
import { FC } from "react";
import { Stack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Field } from "~/components/ui/field";
import { IconButton } from "~/components/ui/icon-button";
import { CreateToasterReturn } from "@ark-ui/react";
import { useEditRobot } from "../../hooks/useEditRobot";
import { Robot } from "~/domain/robot/robot";

type RobotEditDialogProps = {
	open: boolean;
	onClose: () => void;
	robot: Robot;
	toaster: CreateToasterReturn;
};

export const RobotEditDialog: FC<RobotEditDialogProps> = ({
	open,
	onClose,
	robot,
	toaster,
}) => {
	const { robotName, isPending, setRobotName, onSubmit } = useEditRobot(
		robot,
		toaster,
	);

	const handleSubmit = async () => {
		await onSubmit();
		onClose();
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog.Root open={open} onOpenChange={handleClose}>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content w={"500px"}>
					<Stack gap="8" p="6">
						<Stack gap="1">
							<Dialog.Title>ロボット編集</Dialog.Title>
							<Dialog.Description>
								下記に必要情報を記入してください
							</Dialog.Description>
						</Stack>
						<Stack gap="6">
							<Field.Root>
								<Field.Label>ロボット名</Field.Label>
								<Field.Input
									value={robotName}
									placeholder="ロボット名を入力してください"
									onChange={(e) => setRobotName(e.target.value)}
								/>
							</Field.Root>
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
								disabled={robotName === "" || robot.robotName === robotName}
								loading={isPending}
							>
								更新
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
