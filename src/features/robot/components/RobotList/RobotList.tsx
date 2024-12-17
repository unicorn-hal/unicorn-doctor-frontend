import { CreateToasterReturn, useDialog } from "@ark-ui/react";
import { Pencil, Trash } from "lucide-react";
import { FC, useState } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { Badge } from "~/components/ui/badge";
import { IconButton } from "~/components/ui/icon-button";
import { Table } from "~/components/ui/table";
import { convertRobotStatus, Robot } from "~/domain/robot/robot";
import { RobotEditDialog } from "../RobotEditDialog/RobotEditDialog";
import { RobotDeleteDialog } from "../RobotDeleteDialog/RobotDeleteDialog";

type RobotListProps = {
	robots: Robot[];
	toaster: CreateToasterReturn;
};

export const RobotList: FC<RobotListProps> = ({ robots, toaster }) => {
	const { open, setOpen } = useDialog();
	const { open: deleteDialogOpen, setOpen: setDeleteDialogOpen } = useDialog();
	const [robot, setRobot] = useState<Robot | null>(null);
	return (
		<>
			<Table.Root variant={"outline"}>
				<Table.Head>
					<Table.Row>
						<Table.Header>ロボットID</Table.Header>
						<Table.Header>ロボット名</Table.Header>
						<Table.Header>ステータス</Table.Header>
						<Table.Header align="right" />
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{robots.length === 0 && (
						<Table.Row>
							<Table.Cell colSpan={4}>
								<Box className={css({ textAlign: "center" })}>
									ロボットは存在しません。
								</Box>
							</Table.Cell>
						</Table.Row>
					)}
					{robots.map((robot) => (
						<Table.Row key={robot.robotID}>
							<Table.Cell>{robot.robotID}</Table.Cell>
							<Table.Cell>{robot.robotName}</Table.Cell>
							<Table.Cell>
								<Badge>{convertRobotStatus(robot.status)}</Badge>
							</Table.Cell>
							<Table.Cell align="right">
								<Box
									className={css({
										display: "flex",
										justifyContent: "flex-end",
										gap: 2,
									})}
								>
									<IconButton
										variant={"outline"}
										disabled={robot.status === "supporting"}
										onClick={() => {
											setRobot(robot);
											setOpen(true);
										}}
									>
										<Pencil />
									</IconButton>
									<IconButton
										disabled={robot.status === "supporting"}
										variant={"solid"}
										className={css({
											bgColor: "red.10",
										})}
										onClick={() => {
											setRobot(robot);
											setDeleteDialogOpen(true);
										}}
									>
										<Trash />
									</IconButton>
								</Box>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
			{robot && (
				<RobotEditDialog
					toaster={toaster}
					onClose={() => {
						setRobot(null);
						setOpen(false);
					}}
					open={open}
					robot={robot}
				/>
			)}
			{robot && (
				<RobotDeleteDialog
					toaster={toaster}
					onClose={() => {
						setRobot(null);
						setDeleteDialogOpen(false);
					}}
					open={deleteDialogOpen}
					robot={robot}
				/>
			)}
		</>
	);
};
