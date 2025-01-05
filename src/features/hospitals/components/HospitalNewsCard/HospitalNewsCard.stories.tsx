import { Meta, StoryObj } from "@storybook/react";
import { HospitalNewsCard } from "./HospitalNewsCard";

const meta: Meta<typeof HospitalNewsCard> = {
	component: HospitalNewsCard,
};

export default meta;
type Story = StoryObj<typeof HospitalNewsCard>;

export const Default: Story = {
	args: {
		hospitalNews: {
			hospitalID: "1",
			hospitalNewsID: "1",
			hospitalName: "病院",
			title: "病院のニュース",
			contents: "病院のニュースの内容",
			noticeImageUrl:
				"https://www.tottori-med.jrc.or.jp/trch/wp-content/uploads/2020/06/4023f48dfe10585327bb1d4a9c24f5b1.jpg",
			relatedUrl:
				"https://www.tottori-med.jrc.or.jp/trch/news/2021/06/20210601.html",
			postedDate: "2024-12-06 06:36:41.277382",
		},
	},
};
