import { useMutation, useQuery } from "@tanstack/react-query";
import { Doctor } from "~/domain/doctor/doctor";
import { queryKey } from "./queryKey";
import { fetchJSON } from "~/util/api";

export const useUpdateDoctorProfile = () => {
	const { mutateAsync } = useMutation({
		mutationKey: queryKey.all,
		mutationFn: async () => {},
	});
};
