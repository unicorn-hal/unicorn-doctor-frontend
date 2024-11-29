export function formatDateTimeRange(start: Date, end: Date): string {
	const formatDate = (date: Date): string =>
		`${date.getFullYear()}年-${String(date.getMonth() + 1).padStart(2, "0")}月${String(date.getDate()).padStart(2, "0")}日 ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

	if (
		start.getFullYear() === end.getFullYear() &&
		start.getMonth() === end.getMonth() &&
		start.getDate() === end.getDate()
	) {
		return `${formatDate(start)} ~ ${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
	}

	return `${formatDate(start)} ~ ${String(end.getMonth() + 1).padStart(2, "0")}月${String(end.getDate()).padStart(2, "0")}日 ${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
}