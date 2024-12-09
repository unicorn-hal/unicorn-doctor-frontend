import { useQuery } from "@tanstack/react-query";
import { queryKey } from "./queryKey";
import { fetchJSON } from "~/util/api";
import { HealthCheckup } from "~/domain/health_checkup/healthCheckup";

type UseGetHealthCheckups = {
	healthCheckups: HealthCheckup[];
	isLoading: boolean;
	isError: boolean;
};

type healthCheckupsResult = {
	data: HealthCheckup[];
};

export const useGetHealthCheckups = (userID: string): UseGetHealthCheckups => {
	const { data, isLoading, isError } = useQuery({
		queryKey: queryKey.getHealthCheckups(userID),
		queryFn: async () => {
			const result = await fetchJSON<healthCheckupsResult>(
				`/users/${userID}/health_checkups`,
			);
			return result.data;
		},
	});

	return {
		healthCheckups: data || [],
		isLoading,
		isError,
	};
};
