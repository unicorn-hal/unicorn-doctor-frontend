import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "~/infrastructure/firebase";

type UseSetDoctorCallState = {
	onDoctorEntered: () => Promise<void>;
	onDoctorLeft: () => Promise<void>;
	doctorEntered: boolean;
};

export const useSetDoctorCallState = ({
	channelId,
	userID,
}: {
	channelId: string;
	userID: string;
	startDate: Date;
	endDate: Date;
}): UseSetDoctorCallState => {
	const [doctorEntered, setDoctorEntered] = useState(false);
	const onDoctorEntered = async () => {
		setDoctorEntered(true);
		await setDoc(
			doc(db, userID, channelId),
			{
				is_doctor_entered: true,
			},
			{
				merge: true,
			},
		);
	};

	const onDoctorLeft = async () => {
		setDoctorEntered(false);
		await setDoc(
			doc(db, userID, channelId),
			{
				is_doctor_entered: false,
			},
			{
				merge: true,
			},
		);
	};

	return {
		onDoctorEntered,
		onDoctorLeft,
		doctorEntered,
	};
};
