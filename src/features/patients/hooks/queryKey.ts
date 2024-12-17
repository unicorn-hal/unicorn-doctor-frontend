export const queryKey = {
	all: ["patients"] as const,
	getHealthCheckups: (patientID: string) =>
		["patients", patientID, "healthCheckups"] as const,
	getHealthCheckup: (patientID: string, healthCheckupID: string) =>
		["patients", patientID, "healthCheckups", healthCheckupID] as const,
};
