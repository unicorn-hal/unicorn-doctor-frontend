export const queryKey = {
	getRtcToken: (channelId: string) => ["RtcToken", channelId] as const,
	getCallReservation: (channelId: string) =>
		["CallReservation", channelId] as const,
};
