import { XIcon } from "lucide-react";
import { BaseSyntheticEvent, FC } from "react";
import { Stack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Field } from "~/components/ui/field";
import { IconButton } from "~/components/ui/icon-button";
import { useResisterRobot } from "../../hooks/useRegisterRobot";
import { CreateToasterReturn } from "@ark-ui/react";

type RobotCreateDialogProps = {
	open: boolean;
	onClose: () => void;
	toaster: CreateToasterReturn;
};

export const RobotCreateDialog: FC<RobotCreateDialogProps> = ({
	open,
	onClose,
	toaster,
}) => {
	const { register, onSubmit, errors } = useResisterRobot({
		toaster,
	});

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		await onSubmit(e);
		onClose();
	};

	return (
		<Dialog.Root open={open} onOpenChange={onClose}>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content w={"500px"}>
					<form onSubmit={handleSubmit}>
						<Stack gap="8" p="6">
							<Stack gap="1">
								<Dialog.Title>ロボット新規作成</Dialog.Title>
								<Dialog.Description>
									下記に必要情報を記入してください
								</Dialog.Description>
							</Stack>
							<Stack gap="6">
								<Field.Root invalid={!!errors.email}>
									<Field.Label>Email</Field.Label>
									<Field.Input
										type="email"
										placeholder="メールアドレスを入力してください"
										{...register("email")}
									/>
									<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
								</Field.Root>
								<Field.Root invalid={!!errors.password}>
									<Field.Label>パスワード (6文字以上の半角英数字)</Field.Label>
									<Field.Input
										type="password"
										placeholder="パスワードを入力してください"
										{...register("password")}
									/>
									<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
								</Field.Root>
								<Field.Root invalid={!!errors.confirmPassword}>
									<Field.Label>パスワードを再入力してください</Field.Label>
									<Field.Input
										type="password"
										placeholder="パスワードを再入力してください"
										{...register("confirmPassword")}
									/>
									<Field.ErrorText>
										{errors.confirmPassword?.message}
									</Field.ErrorText>
								</Field.Root>
								<Field.Root invalid={!!errors.robotName}>
									<Field.Label>ロボット名</Field.Label>
									<Field.Input
										placeholder="ロボット名を入力してください"
										{...register("robotName")}
									/>
									<Field.ErrorText>{errors.robotName?.message}</Field.ErrorText>
								</Field.Root>
							</Stack>
							<Stack gap="3" direction="row" width="full">
								<Dialog.CloseTrigger asChild>
									<Button variant="outline" width="full">
										キャンセル
									</Button>
								</Dialog.CloseTrigger>
								<Button width="full" type="submit">
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
