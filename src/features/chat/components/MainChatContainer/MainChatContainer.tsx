import { FC } from "react";
import { css } from "styled-system/css";
import { Chat } from "~/domain/chat/chat";
import { MainChat } from "./MainChat/MainChat";

type MainChatContainerProps = {
	selectedChat: Chat | null;
};

export const MainChatContainer: FC<MainChatContainerProps> = ({
	selectedChat,
}) => {
	return (
		<div
			className={css({
				flex: 1,
				display: "flex",
				flexDirection: "column",
			})}
		>
			{selectedChat ? (
				<MainChat selectedChat={selectedChat} />
			) : (
				<div
					className={css({
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					})}
				>
					<p
						className={css({
							fontSize: "xl",
						})}
					>
						チャットを選択してください
					</p>
				</div>
			)}
		</div>
	);
};
