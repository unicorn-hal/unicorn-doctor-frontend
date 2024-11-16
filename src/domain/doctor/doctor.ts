export type Doctor = {
	doctorID: string;
	hospital: Hospital;
	firstName: string;
	lastName: string;
	doctorIconUrl?: string;
	departments: Department;
	email: string;
	phoneNumber: string;
	chatSupportHours: string;
	callSupportHours: string;
};

export type Hospital = {
	hospitalID: string;
	hospitalName: string;
};

export type Department = {
	departmentID: string;
	departmentName: string;
};
