import { css } from "styled-system/css";
import { Spinner } from "~/components/ui/spinner";

export const FullScreenSpinner = () => {
	return (
		<div
			className={css({
				width: "100%",
				height: "100vh",
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
