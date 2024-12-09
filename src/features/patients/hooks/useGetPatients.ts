import { useQuery } from "@tanstack/react-query";
import { queryKey } from "./queryKey";
import { fetchJSON } from "~/util/api";
import { User } from "~/domain/user/user";

type UseGetPatients = {
	patients: User[];
	isLoading: boolean;
	isError: boolean;
};

type PatientsResult = {
	data: User[];
};

export const useGetPatients = (
	doctorID: string | undefined,
): UseGetPatients => {
	const { data, isLoading, isError } = useQuery({
		queryKey: queryKey.all,
		queryFn: async () => {
			if (!doctorID) return [];
			const result = await fetchJSON<PatientsResult>(
				`/primary_doctors/${doctorID}/users`,
			);
			return result.data;
		},
	});

	return {
		patients: data || [],
		isLoading,
		isError,
	};
};
