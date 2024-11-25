import { useQuery } from "@tanstack/react-query";
import { queryKey } from "./queryKey";
import { fetchJSON } from "~/util/api";
import { User } from "~/domain/user/user";

type UseGetUser = {
	isLoading: boolean;
	isError: boolean;
	user: User | null;
};

export const useGetUser = (userID: string): UseGetUser => {
	const { data, isLoading, isError } = useQuery({
		queryKey: queryKey.getByUserID(userID),
		queryFn: async () => {
			return await fetchJSON<User>(`/users/${userID}`);
		},
	});

	return {
		user: data || null,
		isLoading: isLoading,
		isError: isError,
	};
};
