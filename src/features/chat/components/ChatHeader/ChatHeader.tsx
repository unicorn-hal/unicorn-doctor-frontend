import { FC } from "react";
import { css } from "styled-system/css";
import { Avatar } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";

type ChatHeaderProps = {
	useName: string;
};

export const ChatHeader: FC<ChatHeaderProps> = ({ useName }) => {
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
			<Avatar />
			<Text
				className={css({
					fontWeight: "semibold",
					fontSize: "lg",
				})}
			>{`${useName}とのチャット`}</Text>
		</div>
	);
};
