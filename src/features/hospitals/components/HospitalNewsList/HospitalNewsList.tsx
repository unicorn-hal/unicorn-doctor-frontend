import { FC } from "react";
import { Box } from "styled-system/jsx";
import { HospitalNews } from "~/domain/hospital_news/hospitalNews";
import { HospitalNewsCard } from "../HospitalNewsCard/HospitalNewsCard";
import { css } from "styled-system/css";

type HospitalNewsListProps = {
	data: HospitalNews[];
}

export const HospitalNewsList: FC<HospitalNewsListProps> = ({
	data,
}) => {
	return (
		<Box
		className={css({
			display: "flex",
			flexDirection: "column",
			gap: "4",
		})}
		>
			{data.map(((hospitalNews)=> (
				<HospitalNewsCard key={hospitalNews.hospitalNewsID} hospitalNews={hospitalNews} />
			)))}
		</Box>
	);
};
