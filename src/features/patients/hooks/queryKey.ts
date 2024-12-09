export const queryKey = {
	all: ["patients"] as const,
	getHealthCheckups: (patientID: string) =>
		["patients", patientID, "healthCheckups"] as const,
};
