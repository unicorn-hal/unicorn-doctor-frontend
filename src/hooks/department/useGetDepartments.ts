import { useQuery } from "@tanstack/react-query";
import { Department } from "~/domain/doctor/doctor";
import { queryKey } from "./queryKey";
import { fetchJSON } from "~/util/api";

type UseGetDepartments = {
	departments: Department[];
	isLoading: boolean;
	isError: boolean;
};

type DepartmentResponse = {
	data: Department[];
};

export const useGetDepartments = (): UseGetDepartments => {
	const { data, isLoading, isError } = useQuery({
		queryKey: queryKey.all,
		queryFn: async () => {
			const result = await fetchJSON<DepartmentResponse>("/departments");
			return result.data;
		},
	});

	return {
		departments: data || [],
		isLoading,
		isError,
	};
};
