import { ChangeEvent, FC } from "react";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Field } from "~/components/ui/field";

type MessageFormProps = {
	input: string;
	isPending: boolean;
	onInputMessage: (input: string) => void;
	onSubmit: () => void;
};
export const MessageForm: FC<MessageFormProps> = ({
	isPending,
	input,
	onInputMessage,
	onSubmit,
}) => {
	const handleInputMessage = (e: ChangeEvent<HTMLInputElement>) => {
		onInputMessage(e.target.value);
	};

	const handleSubmit = () => {
		onSubmit();
	};

	return (
		<div
			className={css({
				backgroundColor: "white",
				borderTop: "1px solid",
				borderColor: "gray.5",
				padding: "1rem",
			})}
		>
			<div
				className={css({
					display: "flex",
					alignItems: "center",
				})}
			>
				<Field.Root
					className={css({
						flex: 1,
						marginRight: "5px",
					})}
				>
					<Field.Input
						value={input}
						type="text"
						onChange={handleInputMessage}
						placeholder="メッセージを入力してください"
						onKeyDown={(e) => {
							if (e.key === "Enter" && e.ctrlKey) {
								handleSubmit();
							}
						}}
					/>
				</Field.Root>
				<Button
					loading={isPending}
					aria-label="送信"
					size={"lg"}
					onClick={handleSubmit}
					title="Ctrl + Enterで送信"
				>
					送信
				</Button>
			</div>
		</div>
	);
};
