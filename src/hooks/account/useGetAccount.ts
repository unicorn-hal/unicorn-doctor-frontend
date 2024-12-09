import { fetchJSON } from "~/util/api";
import { useQuery } from "@tanstack/react-query";
import { Account } from "~/domain/account/account";
import { queryKey } from "./queryKey";

type UseGetAccount = {
	account: Account | null;
	isLoading: boolean;
	isError: boolean;
};

export const useGetAccount = (userID: string | undefined): UseGetAccount => {
	const { data, isLoading, isError } = useQuery({
		queryKey: queryKey.getUserFcmTokeId(userID || ""),
		queryFn: async () => {
			if (!userID) {
				return null;
			}
			return await fetchJSON<Account>(`/accounts/${userID}`);
		},
	});

	return {
		account: data || null,
		isLoading: isLoading,
		isError: isError,
	};
};
