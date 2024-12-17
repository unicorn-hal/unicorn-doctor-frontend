import { CreateToasterReturn } from "@ark-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HealthCheckup } from "~/domain/health_checkup/healthCheckup";
import { fetchURL } from "~/util/api";
import { queryKey } from "./queryKey";

export const useUpdateMedicalRecord = (
	healthCheckup: HealthCheckup | undefined,
	patientId: string,
	healthCheckupId: string,
	toaster: CreateToasterReturn,
) => {
	const [medicalRecordValue, setMedicalRecordValue] = useState<
		string | undefined
	>(healthCheckup?.medicalRecord);
	const queryClient = useQueryClient();

	useEffect(() => {
		setMedicalRecordValue(healthCheckup?.medicalRecord);
	}, [healthCheckup]);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => {
			try {
				const result = await fetchURL(
					`/users/${patientId}/health_checkups/${healthCheckupId}`,
					{
						method: "PUT",
						body: JSON.stringify({
							...healthCheckup,
							medicalRecord: medicalRecordValue,
						}),
					},
				);

				if (!result.ok) {
					throw new Error("エラーが発生しました");
				}

				toaster.create({
					type: "success",
					title: "成功",
					description: "保存しました",
				});
				queryClient.invalidateQueries({
					queryKey: queryKey.getHealthCheckup(patientId, healthCheckupId),
				});
			} catch (error) {
				toaster.create({
					type: "error",
					title: "失敗",
					description: "エラーが発生しました",
				});
			}
		},
	});

	return {
		medicalRecordValue,
		isPending,
		setMedicalRecordValue,
		mutateAsync,
	};
};
