import type { Meta, StoryObj } from "@storybook/react";
import { PatientList } from "./PatientList";

const meta: Meta<typeof PatientList> = {
	component: PatientList,
};

export default meta;
type Story = StoryObj<typeof PatientList>;

export const Default: Story = {
	args: {
		patients: [
			{
				userID: "1",
				lastName: "山田",
				firstName: "太郎",
				address: "東京都",
				gender: "male",
				birthDate: "1990-01-01",
				email: "test@test.com",
				phoneNumber: "09012345678",
				postalCode: "1234567",
				bodyHeight: 170,
				bodyWeight: 60,
				occupation: "会社員",
			},
			{
				userID: "2",
				lastName: "山田",
				firstName: "花子",
				address: "東京都",
				gender: "female",
				birthDate: "1990-01-01",
				email: "testtest@test.com",
				phoneNumber: "09012345678",
				postalCode: "1234567",
				bodyHeight: 160,
				bodyWeight: 50,
				occupation: "会社員",
			},
		],
	},
};
