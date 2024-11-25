import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";

export const Route = createFileRoute("/_layout/doctors/calls/$channelId/end/")({
	component: () => <CallEndPage />,
});

function CallEndPage() {
	const { channelId } = Route.useParams();
	const navigate = useNavigate();
	return (
		<div
			className={css({
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "90vh",
				padding: "10",
				boxSizing: "border-box",
				gap: "7",
			})}
		>
			<Heading size={"3xl"}>ミーティングから退出しました</Heading>
			<div
				className={css({
					display: "flex",
					gap: "4",
				})}
			>
				<Button
					size={"lg"}
					variant={"outline"}
					onClick={() => navigate({ to: `/doctors/calls/${channelId}` })}
				>
					再参加
				</Button>
				<Button size={"lg"} onClick={() => navigate({ to: "/doctors/home" })}>
					ホームに戻る
				</Button>
			</div>
		</div>
	);
}
