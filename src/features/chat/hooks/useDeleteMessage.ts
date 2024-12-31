import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchURL } from "~/util/api";
import { queryKey } from "./queryKey";

export const useDeleteMessage = (chatID: string) => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (messageID: string) => {
			try {
				await fetchURL(`/chats/${chatID}/messages/${messageID}`, {
					method: "DELETE",
				});

				queryClient.invalidateQueries({
					queryKey: queryKey.getMessageByChatID(chatID),
				});
			} catch (e) {
				console.error(e);
			}
		},
	});

	const onSubmit = async (messageID: string) => {
		await mutateAsync(messageID);
	};

	return {
		onSubmit,
		isPending,
	};
};
