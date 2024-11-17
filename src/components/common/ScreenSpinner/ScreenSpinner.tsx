import { FC } from "react";
import { css } from "styled-system/css";
import { Spinner } from "~/components/ui/spinner";

type ScreenSpinnerProps = {
	height?: string;
};
export const ScreenSpinner: FC<ScreenSpinnerProps> = ({ height = "100vh" }) => {
	return (
		<div
			className={css({
				width: "100%",
				height: height,
				position: "relative",
			})}
		>
			<Spinner
				className={css({
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				})}
				size="lg"
			/>
		</div>
	);
};
