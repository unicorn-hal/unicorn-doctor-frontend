import { useQuery } from "@tanstack/react-query";
import { Doctor } from "~/domain/doctor/doctor";
import { fetchJSON } from "~/util/api";
import { queryKey } from "./queryKey";

type UseGetDoctorProfile = {
	isLoading: boolean;
	isError: boolean;
	doctor?: Doctor;
};

export const useGetDoctor = (uid: string): UseGetDoctorProfile => {
	const { data, isLoading, isError } = useQuery({
		queryKey: queryKey.findBy(uid),
		queryFn: async () => {
			return await fetchJSON<Doctor>(`/doctors/${uid}`);
		},
	});

	return {
		doctor: data,
		isLoading: isLoading,
		isError: isError,
	};
};
