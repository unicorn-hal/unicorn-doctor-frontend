import type { Meta, StoryObj } from "@storybook/react";
import { PatientDetails } from "./PatientDetail";

const meta: Meta<typeof PatientDetails> = {
	component: PatientDetails,
};

export default meta;
type Story = StoryObj<typeof PatientDetails>;

export const Default: Story = {
	args: {
		patient: {
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
		healthCheckups: [
			{
				healthCheckupID: "1",
				date: "2024-12-12",
				bodyTemperature: 36.5,
				boolPressure: "120/80",
				medicalRecord:
					"# 2024年12月12日\n## 通常検診 \n体温: bloodPressure\n血圧: bodyTemperature\n診断: 軽度のインフルエンザ\n## ロボット検診 \n体温: 36.5\n血圧: 120/80\n診断: 特に異常なし",
			},
			{
				healthCheckupID: "2",
				date: "2021-02-01",
				bodyTemperature: 36.5,
				boolPressure: "120/80",
				medicalRecord:
					"# 2021年2月1日\n## 通常検診 \n体温: 36.5\n血圧: 120/80\n診断: 特に異常なし",
			},
		],
	},
};
