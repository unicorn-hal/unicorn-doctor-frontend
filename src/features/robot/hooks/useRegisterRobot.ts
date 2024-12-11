import { CreateToasterReturn } from "@ark-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FirebaseAccount } from "~/domain/firebase_account/firebaseAccount";
import { fetchJSON, fetchRobotURL, fetchURL } from "~/util/api";

export const useResisterRobot = ({
	toaster,
}: {
	toaster: CreateToasterReturn;
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<RegisterRobotForm>({
		resolver: zodResolver(registerRobotFormSchema),
	});
	const queryClient = useQueryClient();

	const onSubmit = async (data: RegisterRobotForm) => {
		try {
			const firebaseAccount = await fetchJSON<FirebaseAccount>(
				"/firebase/accounts",
				{
					method: "POST",
					body: JSON.stringify({
						email: data.email,
						password: data.password,
					}),
				},
			);

			await fetchURL("/accounts", {
				method: "POST",
				body: JSON.stringify({
					uid: firebaseAccount.uid,
					role: "robot",
					fcmTokenId: "fcmTokenId",
				}),
			});

			await fetchRobotURL("/robots", {
				headers: {
					"X-UID": firebaseAccount.uid,
				},
				method: "POST",
				body: JSON.stringify({
					robotName: data.robotName,
				}),
			});

			await queryClient.invalidateQueries({
				queryKey: ["robots"],
			});

			toaster.create({
				type: "success",
				title: "成功",
				description: "ロボットを登録しました",
			});
		} catch (error) {
			toaster.create({
				type: "error",
				title: "エラー",
				description: "エラーが発生しました",
			});
		}
	};

	return {
		register,
		reset,
		onSubmit: handleSubmit(onSubmit),
		errors,
		isSubmitting,
	};
};

export const registerRobotFormSchema = z
	.object({
		email: z.string().email({ message: "無効なメールアドレスです" }),
		password: z
			.string()
			.min(6, { message: "パスワードは6文字以上で入力してください" }),
		confirmPassword: z
			.string()
			.min(6, { message: "パスワードは6文字以上で入力してください" }),
		robotName: z.string().min(1, { message: "名前を入力してください" }),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: "パスワードが一致しません",
			path: ["confirmPassword"],
		},
	);

export type RegisterRobotForm = z.infer<typeof registerRobotFormSchema>;
