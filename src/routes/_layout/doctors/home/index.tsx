import { createFileRoute } from "@tanstack/react-router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventContent } from "~/features/home/components/EventContent/EventContent";
import { css } from "styled-system/css";
import { useGetCallReservations } from "~/features/home/hooks/useGetCallReservations";
import { useState } from "react";

export const Route = createFileRoute("/_layout/doctors/home/")({
	component: Home,
});

function Home() {
	const { callReservations } = useGetCallReservations();
	const [currentView, setCurrentView] = useState<string>("dayGridMonth");

	const events = callReservations.map((callReservation) => ({
		id: callReservation.callReservationID,
		title: "通話予約",
		start: callReservation.callStartTime,
		end: callReservation.callEndTime,
		userID: callReservation.userID,
	}));

	return (
		<div>
			<div
				className={css({
					height: "80vh",
					width: "100vw",
					padding: "1rem",
				})}
			>
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin]}
					initialView="dayGridMonth"
					locale={"ja"}
					weekends={true}
					events={events}
					nowIndicator={true}
					eventContent={(props) => (
						<EventContent
							{...props}
							userID={props.event.extendedProps.userID}
							currentView={currentView}
						/>
					)}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek",
					}}
					buttonText={{
						today: "今日",
						month: "月",
						week: "週",
						day: "日",
					}}
					height={"90vh"}
					viewDidMount={(viewInfo) => {
						setCurrentView(viewInfo.view.type);
					}}
					datesSet={(dateInfo) => {
						setCurrentView(dateInfo.view.type);
					}}
				/>
			</div>
		</div>
	);
}
