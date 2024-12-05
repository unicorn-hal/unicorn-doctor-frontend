import { createListCollection, CreateToasterReturn } from "@ark-ui/react";
import { z } from "zod";
import { Department, Doctor, Hospital } from "~/domain/doctor/doctor";
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

export const useUpdateDoctorForm = ({
    departments,
    hospitals,
    currentDoctor,
    toaster
}: {
    departments: Department[];
    hospitals: Hospital[];
    currentDoctor: Doctor;
    toaster: CreateToasterReturn;
}) => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, defaultValues, isSubmitSuccessful, isSubmitting },
    } = useForm<DoctorForm>({
        resolver: zodResolver(doctorFormSchema),
        defaultValues: {
            firstName: currentDoctor.firstName,
            lastName: currentDoctor.lastName,
            departments: currentDoctor.departments.map((department) => department.departmentID),
            hospitalID: currentDoctor.hospital.hospitalID,
            phoneNumber: currentDoctor.phoneNumber,
            chatSupportStartHour: currentDoctor.chatSupportHours.split("-")[0],
            chatSupportEndHour: currentDoctor.chatSupportHours.split("-")[1],
            callSupportStartHour: currentDoctor.callSupportHours.split("-")[0],
            callSupportEndHour: currentDoctor.callSupportHours.split("-")[1],
        }
    });

    const [doctorImage, setDoctorImage] = useState<File | null>(null);
    const [isImageEdit, setIsImageEdit] = useState(false);
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
            const url = isImageEdit ? doctorImage ? await storageUpload(doctorImage) : "" : null
            const doctorBody = {
                ...data,
                doctorIconUrl: url || undefined,
                email: auth.currentUser?.email || "",
            };

            const result = await fetchURL(`/doctors/${currentDoctor.doctorID}`, {
                method: "PUT",
                body: JSON.stringify(doctorBody),
            });

            if (!result.ok) {
                return toaster.create({
                    type: "error",
                    title: "エラー",
                    description: "エラーが発生しました",
                });
            }
            return toaster.create({
                type: "success",
                title: "成功",
                description: "医師情報を更新しました",
            });
        } catch (error) {
            return toaster.create({
                type: "error",
                title: "エラー",
                description: "エラーが発生しました",
            });
        }
    };

    return {
        departmentInitialCollection,
        hospitalInitialCollection,
        errors,
        defaultValues,
        MAX_FILE_SIZE,
        isImageEdit,
        isSubmitting,
        isSubmitSuccessful,
        toaster,
        setIsImageEdit,
        setDoctorImage,
        onSelectDepartment,
        onSelectHospital,
        register,
        setValue,
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
