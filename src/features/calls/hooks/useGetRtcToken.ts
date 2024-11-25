import { fetchRtcToken } from "~/util/api";
import { queryKey } from "./queryKey";
import { useQuery } from "@tanstack/react-query";

type RtcTokenResult = {
	uid: number;
	token: string;
};

type UseGetRtcToken = {
	uid: number;
	token: string;
	isLoading: boolean;
};

export const useGetRtcToken = (channelId: string): UseGetRtcToken => {
	const { data, isLoading } = useQuery({
		queryKey: queryKey.getRtcToken(channelId),
		queryFn: async () => {
			return await fetchRtcToken<RtcTokenResult>("/api/token", {
				method: "POST",
				body: JSON.stringify({
					channelName: channelId,
				}),
			});
		},
	});

	return {
		uid: data?.uid || 0,
		token: data?.token || "",
		isLoading,
	};
};
