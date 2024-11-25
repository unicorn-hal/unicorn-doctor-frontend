import { CallReservation } from "~/domain/call/CallReservation";
import { fetchJSON } from "~/util/api";
import { queryKey } from "./queryKey";
import { useQuery } from "@tanstack/react-query";

type UseGetCallReservation = {
	callReservation: CallReservation | null;
	isCallReservationsLoading: boolean;
};

export const useGetCallReservation = (
	channelId: string,
): UseGetCallReservation => {
	const { data, isLoading } = useQuery({
		queryKey: queryKey.getCallReservation(channelId),
		queryFn: async () => {
			return await fetchJSON<CallReservation>(`/calls/${channelId}`);
		},
	});

	return {
		callReservation: data || null,
		isCallReservationsLoading: isLoading,
	};
};
