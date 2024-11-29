import { FC, ReactNode } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";

type ProfileInfoProps = {
	label: string;
	value: string | ReactNode;
	icon: ReactNode;
};

export const ProfileInfo: FC<ProfileInfoProps> = ({ label, value, icon }) => {
	return (
		<Box
			className={css({
				display: "flex",
				alignItems: "center",
				gap: "4",
				boxShadow: "md",
				padding: "20px",
				w: "45%",
				"@media (max-width: 768px)": {
					w: "100%",
				},
			})}
		>
			<Box>{icon}</Box>
			<Box>
				<Box className={css({ color: "gray.9" })}>{label}</Box>
				<Box className={css({ fontWeight: "bold", mt: "1" })}>{value}</Box>
			</Box>
		</Box>
	);
};
