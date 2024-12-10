import { useQuery } from "@tanstack/react-query";
import { queryKey } from "./queryKey";
import { Robot } from "~/domain/robot/robot";
import { fetchJSON } from "~/util/api";

type RobotResult = {
	data: Robot[];
};

type useGetRobots = {
	robots: Robot[];
	isLoading: boolean;
	isError: boolean;
};

export const useGetRobots = () => {
	const { data, isError, isLoading } = useQuery({
		queryKey: queryKey.all,
		queryFn: async () => {
			const result = await fetchJSON<RobotResult>("/robots");
			return result.data;
		},
	});

	return {
		robots: data || [],
		isError,
		isLoading,
	};
};
