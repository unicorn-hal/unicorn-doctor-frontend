import { BaseSyntheticEvent, FC, useEffect } from "react";
import type { Department, Hospital } from "~/domain/doctor/doctor";
import { DepartmentSelect } from "../DepartmentSelect/DepartmentSelect";
import { Card } from "~/components/ui/card";
import { useSaveDoctorForm } from "../../hooks/useSaveDoctorForm";
import { HospitalSelect } from "../HospitalSelect/HospitalSelect";
import { css } from "styled-system/css";
import { Field } from "~/components/ui/field";
import { Button } from "~/components/ui/button";
import { DoctorImageUpload } from "../DoctorImageUpload/DoctorImageUpload";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "~/components/providers/AuthProvider";

type DoctorFormProps = {
	departments: Department[];
	hospitals: Hospital[];
};

export const DoctorForm: FC<DoctorFormProps> = ({ departments, hospitals }) => {
	const navigate = useNavigate();
	const {
		departmentInitialCollection,
		hospitalInitialCollection,
		errors,
		MAX_FILE_SIZE,
		isSubmitting,
		onSubmit,
		setDoctorImage,
		register,
		onSelectHospital,
		onSelectDepartment,
	} = useSaveDoctorForm({ departments, hospitals });
	const { setCurrentDoctor, currentDoctor } = useAuth();

	useEffect(() => {
		if (currentDoctor && isSubmitting) {
			navigate({ to: "/doctors/home" });
		}
	}, [currentDoctor, navigate, isSubmitting]);

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		await onSubmit(e);
		await setCurrentDoctor();
	};

	return (
		<Card.Root w={"500px"}>
			<Card.Header>
				<Card.Title>医師情報登録</Card.Title>
			</Card.Header>
			<form onSubmit={handleSubmit}>
				<Card.Body
					className={css({
						display: "flex",
						flexDirection: "column",
						gap: "20px",
					})}
				>
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
							onSelectDepartment={onSelectDepartment}
						/>
						<Field.ErrorText>{errors.departments?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root invalid={!!errors.hospitalID}>
						<HospitalSelect
							collection={hospitalInitialCollection}
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
							<Field.Input type="time" {...register("chatSupportStartHour")} />
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
							<Field.Input type="time" {...register("chatSupportEndHour")} />
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
							<Field.Input type="time" {...register("callSupportStartHour")} />
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
							<Field.Input type="time" {...register("callSupportEndHour")} />
							<Field.ErrorText>
								{errors.callSupportEndHour?.message}
							</Field.ErrorText>
						</Field.Root>
					</div>
					<DoctorImageUpload
						setDoctorImage={setDoctorImage}
						maxFileSize={MAX_FILE_SIZE}
					/>
					<Button type="submit" loading={isSubmitting}>
						登録
					</Button>
				</Card.Body>
			</form>
		</Card.Root>
	);
};
