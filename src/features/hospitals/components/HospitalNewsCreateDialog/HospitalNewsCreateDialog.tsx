import { Trash2Icon, XIcon } from "lucide-react";
import { BaseSyntheticEvent, FC } from "react";
import { Stack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Field } from "~/components/ui/field";
import { IconButton } from "~/components/ui/icon-button";
import { CreateToasterReturn } from "@ark-ui/react";
import { useCreateHospitalNews } from "../../hooks/useCreateHospitalNews";
import { FileUpload } from "~/components/ui/file-upload";
import { FileAcceptDetails } from "node_modules/@ark-ui/react/dist/components/file-upload/file-upload";
import { Textarea } from "~/components/ui/textarea";

type hospitalNewsCreateDialogProps = {
	open: boolean;
	hospitalID: string;
	onClose: () => void;
	toaster: CreateToasterReturn;
};

export const HospitalNewsCreateDialog: FC<hospitalNewsCreateDialogProps> = ({
	open,
	onClose,
	hospitalID,
	toaster,
}) => {
	const {
		register,
		errors,
		isSubmitting,
		MAX_FILE_SIZE,
		setNewsImage,
		onSubmit,
		reset,
	} = useCreateHospitalNews(hospitalID, toaster);

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		await onSubmit(e);
		onClose();
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	const handleSetImage = (details: FileAcceptDetails) => {
		setNewsImage(details.files[0]);
	};

	return (
		<Dialog.Root open={open} onOpenChange={handleClose}>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content w={"500px"}>
					<form onSubmit={handleSubmit}>
						<Stack gap="8" p="6">
							<Stack gap="1">
								<Dialog.Title>病院ニュース作成</Dialog.Title>
								<Dialog.Description>
									下記に必要情報を記入してください
								</Dialog.Description>
							</Stack>
							<Stack gap="6">
								<Field.Root invalid={!!errors.title}>
									<Field.Label>タイトル</Field.Label>
									<Field.Input
										type="text"
										placeholder="タイトルを入力してください"
										{...register("title")}
									/>
									<Field.ErrorText>{errors.title?.message}</Field.ErrorText>
								</Field.Root>
								<Field.Root invalid={!!errors.contents}>
									<Field.Label>本文</Field.Label>
									<Textarea
										{...register("contents")}
										placeholder="本文を入力してください"
									/>
									<Field.ErrorText>{errors.contents?.message}</Field.ErrorText>
								</Field.Root>
								<Field.Root invalid={!!errors.relatedUrl}>
									<Field.Label>詳細URL</Field.Label>
									<Field.Input
										type="text"
										placeholder="詳細URLを入力してください"
										{...register("relatedUrl")}
									/>
									<Field.ErrorText>
										{errors.relatedUrl?.message}
									</Field.ErrorText>
								</Field.Root>
								<FileUpload.Root
									maxFiles={1}
									onFileAccept={handleSetImage}
									maxFileSize={MAX_FILE_SIZE}
									accept={"image/*"}
								>
									<FileUpload.Dropzone>
										<FileUpload.Label>添付画像を追加</FileUpload.Label>
										<FileUpload.Trigger asChild>
											<Button size="sm">フォルダを開く</Button>
										</FileUpload.Trigger>
									</FileUpload.Dropzone>
									<FileUpload.ItemGroup>
										<FileUpload.Context>
											{({ acceptedFiles }) =>
												acceptedFiles.map((file) => (
													<FileUpload.Item key={file.name} file={file}>
														<FileUpload.ItemPreview type="image/*">
															<FileUpload.ItemPreviewImage />
														</FileUpload.ItemPreview>
														<FileUpload.ItemName />
														<FileUpload.ItemSizeText />
														<FileUpload.ItemDeleteTrigger asChild>
															<IconButton variant="link" size="sm">
																<Trash2Icon />
															</IconButton>
														</FileUpload.ItemDeleteTrigger>
													</FileUpload.Item>
												))
											}
										</FileUpload.Context>
									</FileUpload.ItemGroup>
									<FileUpload.HiddenInput />
								</FileUpload.Root>
							</Stack>
							<Stack gap="3" direction="row" width="full">
								<Dialog.CloseTrigger asChild>
									<Button variant="outline" width="full" loading={isSubmitting}>
										キャンセル
									</Button>
								</Dialog.CloseTrigger>
								<Button width="full" type="submit" loading={isSubmitting}>
									新規作成
								</Button>
							</Stack>
						</Stack>
					</form>
					<Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
						<IconButton aria-label="Close Dialog" variant="ghost" size="sm">
							<XIcon />
						</IconButton>
					</Dialog.CloseTrigger>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};
