import { doc, setDoc } from "firebase/firestore";
import { db } from "~/infrastructure/firebase";

type UseSetDoctorCallState = {
	onDoctorEntered: () => Promise<void>;
	onDoctorLeft: () => Promise<void>;
};

export const useSetDoctorCallState = ({
	channelId,
	userID,
	startDate,
}: {
	channelId: string;
	userID: string;
	startDate: Date;
	endDate: Date;
}): UseSetDoctorCallState => {
	const onDoctorEntered = async () => {
		await setDoc(
			doc(db, userID, channelId),
			{
				is_doctor_entered: true,
				is_finished_call: false,
			},
			{
				merge: true,
			},
		);
	};

	const onDoctorLeft = async () => {
		if (new Date() < startDate) {
			return await setDoc(
				doc(db, userID, channelId),
				{
					is_doctor_entered: false,
					is_finished_call: false,
				},
				{
					merge: true,
				},
			);
		}

		await setDoc(
			doc(db, userID, channelId),
			{
				is_doctor_entered: false,
				is_finished_call: true,
			},
			{
				merge: true,
			},
		);
	};

	return {
		onDoctorEntered,
		onDoctorLeft,
	};
};
