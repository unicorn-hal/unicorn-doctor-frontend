import { CreateToasterReturn } from "@ark-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HealthCheckup } from "~/domain/health_checkup/healthCheckup";
import { fetchURL } from "~/util/api";

export const useUpdateMedicalRecord = (
	healthCheckup: HealthCheckup | undefined,
	patientId: string,
	healthCheckupId: string,
	toaster: CreateToasterReturn,
) => {
	const [medicalRecordValue, setMedicalRecordValue] = useState<
		string | undefined
	>(healthCheckup?.medicalRecord);

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
