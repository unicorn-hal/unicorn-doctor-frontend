import { useQuery } from "@tanstack/react-query";
import { queryKey } from "./queryKey";
import { CallReservation } from "~/domain/call/CallReservation";
import { fetchJSON } from "~/util/api";
import { useAuth } from "~/components/providers/AuthProvider";

type CallReservationResult = {
	data: CallReservation[];
};

type UseGetCallReservations = {
	callReservations: CallReservation[];
	isCallReservationsLoading: boolean;
};

export const useGetCallReservations = (): UseGetCallReservations => {
	const { currentDoctor } = useAuth();
	const { data, isLoading } = useQuery({
		queryKey: queryKey.all,
		queryFn: async () => {
			const response = await fetchJSON<CallReservationResult>(
				`/doctors/${currentDoctor?.doctorID}/calls`,
			);
			return response.data;
		},
	});

	return {
		callReservations: data || [],
		isCallReservationsLoading: isLoading,
	};
};
