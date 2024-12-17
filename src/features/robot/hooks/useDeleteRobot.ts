import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchURL } from "~/util/api";
import { queryKey } from "./queryKey";
import { Robot } from "~/domain/robot/robot";
import { CreateToasterReturn } from "@ark-ui/react";

export const useDeleteRobot = (robot: Robot, toaster: CreateToasterReturn) => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => {
			try {
				const firebaseResponse = await fetchURL(
					`/firebase/accounts/${robot.robotID}`,
					{
						method: "DELETE",
					},
				);
				if (!firebaseResponse.ok) {
					throw new Error("Something went wrong");
				}
				const response = await fetchURL(`/robots/${robot.robotID}`, {
					method: "DELETE",
				});
				if (!response.ok) {
					throw new Error("Something went wrong");
				}

				queryClient.invalidateQueries({
					queryKey: queryKey.all,
				});

				toaster.create({
					type: "success",
					title: "成功",
					description: "ロボットを削除しました",
				});
			} catch (error) {
				toaster.create({
					type: "error",
					title: "エラー",
					description: "ロボットの削除に失敗しました",
				});
			}
		},
	});

	const onSubmit = async () => {
		await mutateAsync();
	};

	return {
		onSubmit,
		isPending,
	};
};
