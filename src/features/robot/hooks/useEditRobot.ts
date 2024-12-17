import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Robot } from "~/domain/robot/robot";
import { useState } from "react";
import { fetchURL } from "~/util/api";
import { CreateToasterReturn } from "@ark-ui/react";
import { queryKey } from "./queryKey";

export const useEditRobot = (robot: Robot, toaster: CreateToasterReturn) => {
	const [robotName, setRobotName] = useState(robot.robotName);
	const queryClient = useQueryClient();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => {
			try {
				const result = await fetchURL(`/robots/${robot.robotID}`, {
					method: "PUT",
					body: JSON.stringify({
						robotName: robotName,
					}),
				});

				if (!result.ok) {
					throw new Error("Failed to edit robot");
				}

				toaster.success({
					type: "success",
					title: "成功",
					description: "ロボットの編集に成功しました",
				});

				queryClient.invalidateQueries({
					queryKey: queryKey.all,
				});
			} catch (error) {
				toaster.error({
					type: "error",
					title: "失敗",
					description: "ロボットの作成に失敗しました",
				});
			}
		},
	});

	const onSubmit = async () => {
		await mutateAsync();
	};

	return {
		robotName,
		isPending,
		setRobotName,
		onSubmit,
	};
};
