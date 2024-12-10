import { FC } from "react";
import { Box, Stack } from "styled-system/jsx";
import { Text } from "~/components/ui/text";
import { Robot } from "~/domain/robot/robot";
import { RobotList } from "../RobotList/RobotList";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { XIcon } from "lucide-react";
import { Dialog } from "~/components/ui/dialog";
import { IconButton } from "~/components/ui/icon-button";
import { useDialog } from "@ark-ui/react";

type RobotContainerProps = {
    robots: Robot[];
};

export const RobotContainer: FC<RobotContainerProps> = ({
    robots
}) => {
    const { open, setOpen } = useDialog();
    return (
        <>
            <Box
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "4",
                })}
            >
                <Box><Text size={"2xl"} fontWeight={"bold"}>ロボット管理</Text></Box>
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
            <Dialog.Root open={open} onOpenChange={() => setOpen(false)}>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Stack gap="8" p="6">
                            <Stack gap="1">
                                <Dialog.Title>ロボット新規作成</Dialog.Title>
                                <Dialog.Description>Dialog Description</Dialog.Description>
                            </Stack>
                            <Stack gap="3" direction="row" width="full">
                                <Dialog.CloseTrigger asChild>
                                    <Button variant="outline" width="full">
                                        Cancel
                                    </Button>
                                </Dialog.CloseTrigger>
                                <Button width="full">Confirm</Button>
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
        </>
    );
}