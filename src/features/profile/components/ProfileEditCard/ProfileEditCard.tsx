import { Avatar, CreateToasterReturn } from "@ark-ui/react";
import { Pencil } from "lucide-react";
import { BaseSyntheticEvent, FC } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { TimeSelector } from "~/components/common/TimeSelector/TimeSelector";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Field } from "~/components/ui/field";
import { Text } from "~/components/ui/text";
import { Doctor } from "~/domain/doctor/doctor";
import { DepartmentSelect } from "~/features/doctor/components/DepartmentSelect/DepartmentSelect";
import { DoctorImageUpload } from "~/features/doctor/components/DoctorImageUpload/DoctorImageUpload";
import { HospitalSelect } from "~/features/doctor/components/HospitalSelect/HospitalSelect";
import { useUpdateDoctorForm } from "~/features/doctor/hooks/useUpdateDoctorForm";
import { useGetDepartments } from "~/hooks/department/useGetDepartments";
import { useGetHospitals } from "~/hooks/hospital/useGetHospitals";

type ProfileEditCardProps = {
	doctor: Doctor;
	toaster: CreateToasterReturn;
	onCancel: () => void;
};

export const ProfileEditCard: FC<ProfileEditCardProps> = ({
	doctor,
	toaster,
	onCancel,
}) => {
	const { departments } = useGetDepartments();
	const { hospitals } = useGetHospitals();
	const {
		errors,
		departmentInitialCollection,
		hospitalInitialCollection,
		isSubmitting,
		defaultValues,
		MAX_FILE_SIZE,
		isImageEdit,
		setIsImageEdit,
		onSelectHospital,
		setDoctorImage,
		onSubmit,
		onSelectDepartment,
		register,
		setValue,
	} = useUpdateDoctorForm({
		toaster,
		departments,
		hospitals,
		currentDoctor: doctor,
	});

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		await onSubmit(e);
		setIsImageEdit(false);
	};

	return (
		<>
			<Card.Root
				className={css({
					w: "600px",
				})}
			>
				<form onSubmit={handleSubmit}>
					<Card.Header>
						<Card.Title>医師情報編集</Card.Title>
					</Card.Header>
					<Card.Body
						className={css({
							display: "flex",
							flexDirection: "column",
							gap: "20px",
						})}
					>
						{isImageEdit ? (
							<Box>
								<DoctorImageUpload
									setDoctorImage={setDoctorImage}
									maxFileSize={MAX_FILE_SIZE}
								/>
								<Button
									variant="outline"
									type="button"
									onClick={() => {
										setIsImageEdit(false);
										setDoctorImage(null);
									}}
								>
									画像変更をキャンセル
								</Button>
							</Box>
						) : (
							<Box
								className={css({
									position: "relative",
								})}
							>
								<Box
									className={css({
										pt: "40px",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									})}
								>
									<Avatar.Root
										className={css({
											w: "150px",
											h: "150px",
											bgColor: "gray.5",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: "full",
											boxShadow: "md",
										})}
									>
										<Avatar.Fallback
											className={css({
												width: "100%",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											})}
										>
											<Text size={"4xl"}>{doctor.lastName}</Text>
										</Avatar.Fallback>
										<Avatar.Image
											src={doctor.doctorIconUrl}
											alt="avatar"
											className={css({
												borderRadius: "full",
											})}
										/>
									</Avatar.Root>
								</Box>
								<Button
									variant="outline"
									type="button"
									size={"sm"}
									onClick={() => setIsImageEdit(true)}
								>
									<Pencil size={24} />
									画像を変更
								</Button>
							</Box>
						)}
						<Field.Root invalid={!!errors.lastName}>
							<Field.Label>姓</Field.Label>
							<Field.Input
								placeholder="姓を入力してください"
								{...register("lastName")}
							/>
							<Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.firstName}>
							<Field.Label>名</Field.Label>
							<Field.Input
								placeholder="名を入力してください"
								{...register("firstName")}
							/>
							<Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.phoneNumber}>
							<Field.Label>電話番号</Field.Label>
							<Field.Input
								placeholder="電話番号を入力してください"
								{...register("phoneNumber")}
							/>
							<Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.departments}>
							<DepartmentSelect
								collection={departmentInitialCollection}
								defaultValues={defaultValues?.departments}
								onSelectDepartment={onSelectDepartment}
							/>
							<Field.ErrorText>{errors.departments?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.hospitalID}>
							<HospitalSelect
								collection={hospitalInitialCollection}
								defaultValue={defaultValues?.hospitalID}
								onSelectHospital={onSelectHospital}
							/>
							<Field.ErrorText>{errors.hospitalID?.message}</Field.ErrorText>
						</Field.Root>
						<div
							className={css({
								display: "flex",
								justifyContent: "space-between",
							})}
						>
							<Field.Root
								invalid={!!errors.chatSupportStartHour}
								className={css({
									width: "calc(50% - 10px)",
								})}
							>
								<Field.Label>チャット対応: 開始時間</Field.Label>
								<TimeSelector
									time={defaultValues?.chatSupportStartHour}
									onChange={(time) => setValue("chatSupportStartHour", time)}
								/>
								<Field.ErrorText>
									{errors.chatSupportStartHour?.message}
								</Field.ErrorText>
							</Field.Root>
							<Field.Root
								invalid={!!errors.chatSupportEndHour}
								className={css({
									width: "calc(50% - 10px)",
								})}
							>
								<Field.Label>チャット対応: 終了時間</Field.Label>
								<TimeSelector
									time={defaultValues?.chatSupportEndHour}
									onChange={(time) => setValue("chatSupportEndHour", time)}
								/>
								<Field.ErrorText>
									{errors.chatSupportEndHour?.message}
								</Field.ErrorText>
							</Field.Root>
						</div>
						<div
							className={css({
								display: "flex",
								justifyContent: "space-between",
							})}
						>
							<Field.Root
								invalid={!!errors.callSupportStartHour}
								className={css({
									width: "calc(50% - 10px)",
								})}
							>
								<Field.Label>電話対応: 開始時間</Field.Label>
								<TimeSelector
									time={defaultValues?.callSupportStartHour}
									onChange={(time) => setValue("callSupportStartHour", time)}
								/>
								<Field.ErrorText>
									{errors.callSupportStartHour?.message}
								</Field.ErrorText>
							</Field.Root>
							<Field.Root
								invalid={!!errors.callSupportEndHour}
								className={css({
									width: "calc(50% - 10px)",
								})}
							>
								<Field.Label>電話対応: 終了時間</Field.Label>
								<TimeSelector
									time={defaultValues?.callSupportEndHour}
									onChange={(time) => setValue("callSupportEndHour", time)}
								/>
								<Field.ErrorText>
									{errors.callSupportEndHour?.message}
								</Field.ErrorText>
							</Field.Root>
						</div>
					</Card.Body>
					<Card.Footer
						className={css({
							display: "flex",
							gap: "10px",
						})}
					>
						<Box>
							<Button variant="outline" onClick={onCancel}>
								キャンセル
							</Button>
						</Box>
						<Box>
							<Button type="submit" loading={isSubmitting}>
								登録
							</Button>
						</Box>
					</Card.Footer>
				</form>
			</Card.Root>
		</>
	);
};
