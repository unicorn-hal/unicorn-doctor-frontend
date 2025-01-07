import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchURL } from "~/util/api";
import { queryKey } from "./queryKey";

export const useDeleteHospitalNews = (hospitalID: string) => {
	const queryClient = useQueryClient();
	const { mutateAsync } = useMutation({
		mutationFn: async (hospitalNewsID: string) => {
			await fetchURL(`/hospitals/${hospitalID}/news/${hospitalNewsID}`, {
				method: "DELETE",
			});
			queryClient.invalidateQueries({
				queryKey: queryKey.getByHospitalID(hospitalID),
			});
		},
	});
	return {
		mutateAsync,
	};
};
