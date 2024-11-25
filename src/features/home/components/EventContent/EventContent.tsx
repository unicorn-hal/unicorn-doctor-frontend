import { EventContentArg } from "@fullcalendar/core/index.js";
import { useNavigate } from "@tanstack/react-router";
import { CircleCheck, PhoneCall, XIcon } from "lucide-react";
import { css } from "styled-system/css";
import { Box, Stack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { IconButton } from "~/components/ui/icon-button";
import { Popover } from "~/components/ui/popover";
import { Text } from "~/components/ui/text";
import { useGetUser } from "~/hooks/user/useGetUser";
import { formatDateTimeRange } from "~/util/util";

export const EventContent = (
	props: EventContentArg & { userID: string; currentView: string },
) => {
	const { event, userID, currentView } = props;
	const eventTime = `${event.start?.getHours()}:${event.start?.getMinutes()}~`;
	const eventDateTime =
		event.start && event.end && formatDateTimeRange(event.start, event.end);
	const navigate = useNavigate();

	const { user } = useGetUser(userID);
	return (
		<Popover.Root
			positioning={{
				hideWhenDetached: true,
				placement: "right-end",
			}}
		>
			<Popover.Trigger asChild>
				<button
					type="button"
					className={css({
						width: "100%",
						height: "100%",
						cursor: "pointer",
						textAlign: "left",
						display: "flex",
						alignItems: "center",
						gap: "1",
						pl: "1",
					})}
				>
					<CircleCheck
						size={16}
						color={currentView === "dayGridMonth" ? "green" : "#fff"}
					/>
					<Text>
						{eventTime} {props.event.title}
					</Text>
				</button>
			</Popover.Trigger>
			<Popover.Positioner>
				<Popover.Content>
					<Popover.Arrow>
						<Popover.ArrowTip />
					</Popover.Arrow>
					<Stack gap="1">
						<Popover.Title
							className={css({
								color: "gray.12",
								fontSize: "lg",
							})}
						>
							{event.title}
						</Popover.Title>
						<Popover.Description>
							<div>日時: {eventDateTime}</div>
							<div
								className={css({
									whiteSpace: "pre-wrap",
									my: "2",
									color: "gray.12",
								})}
							>
								<Text>
									{user?.lastName} {user?.firstName}
									さんとの通話予約が設定されています。
								</Text>
							</div>
							<Box
								className={css({
									mt: "5",
								})}
							>
								<Button
									className={css({
										borderRadius: "15",
									})}
									onClick={() => {
										navigate({ to: `/doctors/calls/${event.id}` });
									}}
								>
									<PhoneCall size={16} />
									通話を開始する
								</Button>
							</Box>
						</Popover.Description>
					</Stack>
					<Box position="absolute" top="1" right="1">
						<Popover.CloseTrigger asChild>
							<IconButton
								className={css({
									outline: "none",
								})}
								aria-label="Close Popover"
								variant="ghost"
								size="sm"
							>
								<XIcon />
							</IconButton>
						</Popover.CloseTrigger>
					</Box>
				</Popover.Content>
			</Popover.Positioner>
		</Popover.Root>
	);
};
