export type Robot = {
	robotID: string;
	robotName: string;
	status: RobotStatus;
};

type RobotStatus = "robot_waiting" | "supporting" | "shutdown";

export const convertRobotStatus = (status: RobotStatus) => {
	switch (status) {
		case "robot_waiting":
			return "待機中";
		case "supporting":
			return "対応中";
		case "shutdown":
			return "停止中";
	}
};
