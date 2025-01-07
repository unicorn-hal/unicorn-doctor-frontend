import { Trash } from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { Card } from "~/components/ui/card";
import { Heading } from "~/components/ui/heading";
import { IconButton } from "~/components/ui/icon-button";
import { HospitalNews } from "~/domain/hospital_news/hospitalNews";

type HospitalNewsCardProps = {
	hospitalNews: HospitalNews;
	onDelete: () => void;
};
export const HospitalNewsCard: FC<HospitalNewsCardProps> = ({
	hospitalNews,
	onDelete,
}) => {
	return (
		<Card.Root w={"100%"}>
			<Card.Header>
				<Box
					className={css({
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					})}
				>
					<Box>
						<Heading size={"xl"}>{hospitalNews.title}</Heading>
						<Box>{hospitalNews.postedDate}</Box>
					</Box>
					<Box>
						<IconButton variant={"subtle"} onClick={onDelete}>
							<Trash />
						</IconButton>
					</Box>
				</Box>
			</Card.Header>
			<Card.Body
				className={css({
					display: "flex",
					flexDirection: "column",
					gap: "2",
				})}
			>
				<Box>{hospitalNews.contents}</Box>
				<Box
					className={css({
						width: "300px",
					})}
				>
					<img src={hospitalNews.noticeImageUrl} alt="お知らせ用画像" />
				</Box>
			</Card.Body>
			<Card.Footer>
				<Box
					className={css({
						color: "blue",
					})}
				>
					<a href={hospitalNews.relatedUrl}>詳細を見る</a>
				</Box>
			</Card.Footer>
		</Card.Root>
	);
};
