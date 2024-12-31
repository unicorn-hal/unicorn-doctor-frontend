import { useQuery } from "@tanstack/react-query";
import { HospitalNews } from "~/domain/hospital_news/hospitalNews";
import { fetchJSON } from "~/util/api";
import { queryKey } from "./queryKey";

type HospitalNewsResponse = {
	data: HospitalNews[];
};

export const useGetHospitalNews = (hospitalID: string) => {
	const { data, isLoading } = useQuery({
		queryKey: queryKey.getByHospitalID(hospitalID),
		queryFn: async () => {
			const result = await fetchJSON<HospitalNewsResponse>(
				`/hospitals/${hospitalID}/news`,
				{
					method: "GET",
				},
			);
			return result.data;
		},
	});

	return {
		hospitalNews: data || [],
		isLoading,
	};
};
