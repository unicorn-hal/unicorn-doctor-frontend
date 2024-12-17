import { useQuery } from "@tanstack/react-query";
import { queryKey } from "./queryKey";
import { fetchJSON } from "~/util/api";
import { HealthCheckup } from "~/domain/health_checkup/healthCheckup";

export const useGetHealthCheckup = (
	patientId: string,
	healthCheckupId: string,
) => {
	const { data, isLoading } = useQuery({
		queryKey: queryKey.getHealthCheckup(patientId, healthCheckupId),
		queryFn: async () => {
			const data = await fetchJSON<HealthCheckup>(
				`/users/${patientId}/health_checkups/${healthCheckupId}`,
				{
					method: "GET",
				},
			);

			return data;
		},
	});

	return {
		healthCheckup: data,
		isLoading,
	};
};
