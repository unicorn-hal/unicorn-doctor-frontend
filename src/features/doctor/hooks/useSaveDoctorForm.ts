import { createListCollection } from "@ark-ui/react";
import { z } from "zod";
import { Department, Hospital } from "~/domain/doctor/doctor";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { fetchURL } from "~/util/api";
import { useRouter } from "@tanstack/react-router";
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
    const router = useRouter();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<DoctorForm>({
        resolver: zodResolver(doctorFormSchema)
    })

    const [_, setDoctorImage] = useState<File | null>(null);
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
        setValue("departments", department.map((item) => item.value));
    };

    const onSelectHospital = (hospital: DepartmentCollection) => {
        setValue("hospitalID", hospital.value);
    }

    const onSubmit = async (data: DoctorForm) => {
        try {
            // TODO: CORSエラー解消
            // const url = await storageUpload(doctorImage)
            const accountBody = {
                uid: auth.currentUser?.uid || "",
                role: "doctor",
                fcmTokenId: "fcmTokenId"
            }
            const doctorBody = {
                ...data,
                email: auth.currentUser?.email || ""
            }

            const accountResult = await fetchURL("/accounts", {
                method: "POST",
                body: JSON.stringify(accountBody),
            })

            if (!accountResult.ok) throw new Error("Failed to save account")

            const result = await fetchURL("/doctors", {
                method: "POST",
                body: JSON.stringify(doctorBody),
            })
            if (!result.ok) throw new Error("Failed to save doctor")

            router.navigate({ to: "/doctors/home" })
        } catch (error) {
            console.error(error)
        }

    }

    return {
        departmentInitialCollection,
        hospitalInitialCollection,
        errors,
        MAX_FILE_SIZE,
        setDoctorImage,
        onSelectDepartment,
        onSelectHospital,
        register,
        onSubmit: handleSubmit(onSubmit)
    };
};

export const doctorFormSchema = z.object({
    firstName: z.string().min(1, { message: "名前を入力してください" }),
    lastName: z.string().min(1, { message: "名前を入力してください" }),
    departments: z.array(z.string()).min(1, { message: "診療科を選択してください" }),
    hospitalID: z.string().min(1, { message: "病院を選択してください" }),
    phoneNumber: z
        .string()
        .min(1, { message: "電話番号を入力してください" })
        .regex(/^\d+$/, { message: "電話番号は数字で入力してください" }),
    chatSupportStartHour: z.string().min(1, { message: "開始時間を入力してください" }),
    chatSupportEndHour: z.string().min(1, { message: "終了時間を入力してください" }),
    callSupportStartHour: z.string().min(1, { message: "開始時間を入力してください" }),
    callSupportEndHour: z.string().min(1, { message: "終了時間を入力してください" }),
}).refine((data) => {
    const chatSupportStartHour = Number.parseInt(data.chatSupportStartHour.split(":")[0]);
    const chatSupportEndHour = Number.parseInt(data.chatSupportEndHour.split(":")[0]);
    return chatSupportStartHour < chatSupportEndHour
}, {
    message: "開始時間は終了時間より前に設定してください",
    path: ["chatSupportStartHour"]
}).refine((data) => {
    const callSupportStartHour = Number.parseInt(data.callSupportStartHour.split(":")[0]);
    const callSupportEndHour = Number.parseInt(data.callSupportEndHour.split(":")[0]);

    return callSupportStartHour < callSupportEndHour
}, {
    message: "開始時間は終了時間より前に設定してください",
    path: ["callSupportStartHour"]
});

export type DoctorForm = z.infer<typeof doctorFormSchema>;
