import { createListCollection } from "@ark-ui/react";
import { z } from "zod";
import { Department, Hospital } from "~/domain/doctor/doctor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { fetchURL, storageUpload } from "~/util/api";
import { auth } from "~/infrastructure/firebase";

export type DepartmentCollection = {
	label: string;
	value: string;
};

export type HospitalCollection = {
	label: string;
	value: string;
};

export const useSaveDoctorForm = ({
	departments,
	hospitals,
}: {
	departments: Department[];
	hospitals: Hospital[];
}) => {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<DoctorForm>({
		resolver: zodResolver(doctorFormSchema),
	});

	const [doctorImage, setDoctorImage] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const MAX_FILE_SIZE = 3 * 1024 * 1024;

	const departmentInitialCollection = createListCollection({
		items: departments.map((department) => ({
			label: department.departmentName,
			value: department.departmentID,
		})),
	});

	const hospitalInitialCollection = createListCollection({
		items: hospitals.map((hospital) => ({
			label: hospital.hospitalName,
			value: hospital.hospitalID,
		})),
	});

	const onSelectDepartment = (department: DepartmentCollection[]) => {
		setValue(
			"departments",
			department.map((item) => item.value),
		);
	};

	const onSelectHospital = (hospital: DepartmentCollection) => {
		setValue("hospitalID", hospital.value);
	};

	const onSubmit = async (data: DoctorForm) => {
		try {
			setIsSubmitting(true);
			const url = doctorImage ? await storageUpload(doctorImage) : null;

			const accountBody = {
				uid: auth.currentUser?.uid || "",
				role: "doctor",
				fcmTokenId: "fcmTokenId",
			};
			const doctorBody = {
				...data,
				doctorIconUrl: url || undefined,
				email: auth.currentUser?.email || "",
			};

			const accountResult = await fetchURL("/accounts", {
				method: "POST",
				body: JSON.stringify(accountBody),
			});

			if (!accountResult.ok) throw new Error("Failed to save account");

			const result = await fetchURL("/doctors", {
				method: "POST",
				body: JSON.stringify(doctorBody),
			});
			if (!result.ok) throw new Error("Failed to save doctor");
		} catch (error) {
			setIsSubmitting(false);
		}
	};

	return {
		departmentInitialCollection,
		hospitalInitialCollection,
		errors,
		isSubmitting,
		MAX_FILE_SIZE,
		setValue,
		setDoctorImage,
		onSelectDepartment,
		onSelectHospital,
		register,
		onSubmit: handleSubmit(onSubmit),
	};
};

export const doctorFormSchema = z
	.object({
		firstName: z.string().min(1, { message: "名前を入力してください" }),
		lastName: z.string().min(1, { message: "名前を入力してください" }),
		departments: z
			.array(z.string())
			.min(1, { message: "診療科を選択してください" }),
		hospitalID: z.string().min(1, { message: "病院を選択してください" }),
		phoneNumber: z
			.string()
			.min(1, { message: "電話番号を入力してください" })
			.regex(/^\d+$/, { message: "電話番号は数字で入力してください" }),
		chatSupportStartHour: z
			.string()
			.min(1, { message: "開始時間を入力してください" }),
		chatSupportEndHour: z
			.string()
			.min(1, { message: "終了時間を入力してください" }),
		callSupportStartHour: z
			.string()
			.min(1, { message: "開始時間を入力してください" }),
		callSupportEndHour: z
			.string()
			.min(1, { message: "終了時間を入力してください" }),
	})
	.refine(
		(data) => {
			const chatSupportStartHour =
				Number.parseInt(data.chatSupportStartHour.split(":")[0]) * 60 +
				Number.parseInt(data.chatSupportStartHour.split(":")[1]);

			const chatSupportEndHour =
				Number.parseInt(data.chatSupportEndHour.split(":")[0]) * 60 +
				Number.parseInt(data.chatSupportEndHour.split(":")[1]);

			return chatSupportStartHour < chatSupportEndHour;
		},
		{
			message: "開始時間は終了時間より前に設定してください",
			path: ["chatSupportStartHour"],
		},
	)
	.refine(
		(data) => {
			const callSupportStartHour =
				Number.parseInt(data.callSupportStartHour.split(":")[0]) * 60 +
				Number.parseInt(data.callSupportStartHour.split(":")[1]);

			const callSupportEndHour =
				Number.parseInt(data.callSupportEndHour.split(":")[0]) * 60 +
				Number.parseInt(data.callSupportEndHour.split(":")[1]);

			return callSupportStartHour < callSupportEndHour;
		},
		{
			message: "開始時間は終了時間より前に設定してください",
			path: ["callSupportStartHour"],
		},
	);

export type DoctorForm = z.infer<typeof doctorFormSchema>;
