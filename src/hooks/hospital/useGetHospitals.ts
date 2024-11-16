import { useQuery } from "@tanstack/react-query";
import { Hospital } from "~/domain/doctor/doctor";
import { fetchJSON } from "~/util/api";
import { queryKey } from "./queryKey";

type UseGetHospitals = {
	isLoading: boolean;
	isError: boolean;
	hospitals: Hospital[];
};

type HospitalResponse = {
	data: Hospital[];
};

export const useGetHospitals = (): UseGetHospitals => {
	const { data, isLoading, isError } = useQuery({
		queryKey: queryKey.all,
		queryFn: async () => {
			const result = await fetchJSON<HospitalResponse>("/hospitals");
			return result.data;
		},
	});

	return {
		hospitals: data || [],
		isLoading: isLoading,
		isError: isError,
	};
};
