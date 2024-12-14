import { FC } from "react";
import { css } from "styled-system/css";
import { Avatar } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";

type ChatHeaderProps = {
	userName: string;
	userIconUrl?: string;
};

export const ChatHeader: FC<ChatHeaderProps> = ({ userName, userIconUrl }) => {
	return (
		<div
			className={css({
				backgroundColor: "white",
				borderBottom: "1px solid",
				borderColor: "gray.5",
				display: "flex",
				gap: "1rem",
				alignItems: "center",
				paddingX: "1rem",
				paddingY: "0.5rem",
			})}
		>
			<Avatar src={userIconUrl} name={userName} />
			<Text
				className={css({
					fontWeight: "semibold",
					fontSize: "lg",
				})}
			>{`${userName}とのチャット`}</Text>
		</div>
	);
};
