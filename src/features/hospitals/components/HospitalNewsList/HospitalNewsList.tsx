import { FC } from "react";
import { Box } from "styled-system/jsx";
import { HospitalNews } from "~/domain/hospital_news/hospitalNews";
import { HospitalNewsCard } from "../HospitalNewsCard/HospitalNewsCard";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";

type HospitalNewsListProps = {
	data: HospitalNews[];
	onDelete: (hospitalNewsID: string) => void;
	onCreate: () => void;
};

export const HospitalNewsList: FC<HospitalNewsListProps> = ({
	data,
	onDelete,
	onCreate,
}) => {
	return (
		<Box
			className={css({
				display: "flex",
				flexDirection: "column",
				gap: "4",
			})}
		>
			<Box
				className={css({
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					gap: "4",
				})}
			>
				<Box
					className={css({
						display: "flex",
						justifyContent: "flex-end",
					})}
				>
					<Button onClick={onCreate}>新規作成</Button>
				</Box>
				{data.map((hospitalNews) => (
					<HospitalNewsCard
						key={hospitalNews.hospitalNewsID}
						hospitalNews={hospitalNews}
						onDelete={() => onDelete(hospitalNews.hospitalNewsID)}
					/>
				))}
			</Box>
		</Box>
	);
};
