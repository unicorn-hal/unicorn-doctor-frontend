import type { Meta, StoryObj } from "@storybook/react";
import { RobotContainer } from "./RobotContainer";

const meta: Meta<typeof RobotContainer> = {
    component: RobotContainer,
};

export default meta;
type Story = StoryObj<typeof RobotContainer>;

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
