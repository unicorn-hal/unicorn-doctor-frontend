import { CreateToasterReturn } from "@ark-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fetchURL, newsImageUpload } from "~/util/api";
import { queryKey } from "./queryKey";

export const useCreateHospitalNews = (
	hospitalID: string,
	toaster: CreateToasterReturn,
) => {
	const useQuery = useQueryClient();
	const [newsImage, setNewsImage] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const MAX_FILE_SIZE = 3 * 1024 * 1024;
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<HospitalNewsForm>({
		resolver: zodResolver(hospitalNewsFormSchema),
	});

	const onSubmit = async (data: HospitalNewsForm) => {
		try {
			setIsSubmitting(true);
			const url = newsImage
				? await newsImageUpload(newsImage, hospitalID)
				: null;
			const formData = {
				hospitalID,
				noticeImageUrl: url,
				...data,
			};

			const result = await fetchURL(`/hospitals/${hospitalID}/news`, {
				method: "POST",
				body: JSON.stringify(formData),
			});

			if (!result.ok) {
				throw new Error("エラーが発生しました");
			}

			toaster.create({
				type: "success",
				title: "成功",
				description: "ニュースを作成しました",
			});
			setNewsImage(null);
			useQuery.invalidateQueries({
				queryKey: queryKey.getByHospitalID(hospitalID),
			});
		} catch (error) {
			toaster.create({
				type: "error",
				title: "失敗",
				description: "エラーが発生しました",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		register,
		setValue,
		errors,
		isSubmitting,
		newsImage,
		MAX_FILE_SIZE,
		setNewsImage,
		reset,
		onSubmit: handleSubmit(onSubmit),
	};
};

export const hospitalNewsFormSchema = z.object({
	title: z.string().min(1, { message: "タイトルを入力してください" }),
	contents: z.string().min(1, { message: "内容を入力してください" }),
	relatedUrl: z.string(),
});

export type HospitalNewsForm = z.infer<typeof hospitalNewsFormSchema>;
