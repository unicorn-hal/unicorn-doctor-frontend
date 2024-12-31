import { createFileRoute } from "@tanstack/react-router";
import { useGetHospitalNews } from "~/features/hospitals/hooks/useGetHospitalNews";

export const Route = createFileRoute(
	"/_layout/doctors/hospitals/$hospitalID/news/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { hospitalID } = Route.useParams();
	const { hospitalNews } = useGetHospitalNews(hospitalID);
	console.log(hospitalNews);
	return <div>Hello "/_layout/doctors/hospitals/{hospitalID}/news/"!</div>;
}
