import { FC } from "react";
import { Box } from "styled-system/jsx";
import { Text } from "~/components/ui/text";
import { Robot } from "~/domain/robot/robot";
import { RobotList } from "../RobotList/RobotList";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { CreateToasterReturn, useDialog } from "@ark-ui/react";
import { RobotCreateDialog } from "../RobotCreateDialog/RobotCreateDialog";

type RobotContainerProps = {
	robots: Robot[];
	toaster: CreateToasterReturn;
};

export const RobotContainer: FC<RobotContainerProps> = ({
	robots,
	toaster,
}) => {
	const { open, setOpen } = useDialog();
	const handleClose = () => setOpen(false);

	return (
		<>
			<Box
				className={css({
					display: "flex",
					flexDirection: "column",
					gap: "4",
				})}
			>
				<Box>
					<Text size={"2xl"} fontWeight={"bold"}>
						ロボット管理
					</Text>
				</Box>
				<Box
					className={css({
						display: "flex",
						justifyContent: "flex-end",
					})}
				>
					<Button onClick={() => setOpen(true)}>新規作成</Button>
				</Box>
				<RobotList robots={robots} />
			</Box>
			<RobotCreateDialog open={open} onClose={handleClose} toaster={toaster} />
		</>
	);
};
