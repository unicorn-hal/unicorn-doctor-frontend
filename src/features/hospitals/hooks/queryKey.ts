export const queryKey = {
	all: ["hospitalNews"] as const,
	getByHospitalID: (hospitalID: string) =>
		[...queryKey.all, hospitalID] as const,
};
