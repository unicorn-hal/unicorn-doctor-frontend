import type { Meta, StoryObj } from "@storybook/react";
import { RobotList } from "./RobotList";

const meta: Meta<typeof RobotList> = {
	component: RobotList,
};

export default meta;
type Story = StoryObj<typeof RobotList>;

export const Default: Story = {
	args: {
		robots: [
			{
				robotId: "1",
				robotName: "ロボット1",
				status: "robot_waiting",
			},
			{
				robotId: "2",
				robotName: "ロボット2",
				status: "supporting",
			},
		],
	},
};