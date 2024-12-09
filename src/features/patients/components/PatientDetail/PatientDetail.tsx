import {
	Briefcase,
	Cake,
	Mail,
	MapPin,
	Phone,
	Ruler,
	Weight,
} from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { HealthCheckup } from "~/domain/health_checkup/healthCheckup";
import { convertGender, User } from "~/domain/user/user";

type PatientDetailsProps = {
	patient: User | null;
	healthCheckups: HealthCheckup[];
};

export const PatientDetails: FC<PatientDetailsProps> = ({
	patient,
	healthCheckups,
}) => {
	return (
		<Box
			className={css({
				display: "flex",
				gap: "2rem",
				width: "100%",
			})}
		>
			{patient && (
				<Box
					className={css({
						width: "500px",
						maxWidth: "500px",
					})}
				>
					<Box
						className={css({
							display: "flex",
							alignItems: "center",
							gap: "1rem",
						})}
					>
						<Avatar
							src={patient.iconImageUrl}
							name={`${patient.lastName} ${patient.firstName}`}
							size={"2xl"}
						/>
						<Box>
							<Text fontSize={"2xl"} fontWeight={"bold"}>
								{patient.lastName} {patient.firstName}
							</Text>
							<Text className={css({ color: "gray.10" })}>
								{convertGender(patient.gender)}
							</Text>
						</Box>
					</Box>
					<Box
						className={css({
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							mt: "2rem",
						})}
					>
						<Cake size={"28"} />
						<Text>
							<span
								className={css({
									fontWeight: "bold",
								})}
							>
								生年月日:{" "}
							</span>
							<span>{patient.birthDate}</span>
						</Text>
					</Box>
					<Box
						className={css({
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							mt: "1rem",
						})}
					>
						<MapPin size={"28"} />
						<Text>
							<span
								className={css({
									fontWeight: "bold",
								})}
							>
								住所:{" "}
							</span>
							<span>{patient.address}</span>
						</Text>
					</Box>
					<Box
						className={css({
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							mt: "1rem",
						})}
					>
						<Mail size={"28"} />
						<Text>
							<span
								className={css({
									fontWeight: "bold",
								})}
							>
								メール:{" "}
							</span>
							<span>{patient.email}</span>
						</Text>
					</Box>
					<Box
						className={css({
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							mt: "1rem",
						})}
					>
						<Phone size={"28"} />
						<Text>
							<span
								className={css({
									fontWeight: "bold",
								})}
							>
								電話番号:{" "}
							</span>
							<span>{patient.phoneNumber}</span>
						</Text>
					</Box>

					<Box
						className={css({
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							mt: "1rem",
						})}
					>
						<Ruler size={"28"} />
						<Text>
							<span
								className={css({
									fontWeight: "bold",
								})}
							>
								身長:{" "}
							</span>
							<span>{patient.bodyHeight}cm</span>
						</Text>
					</Box>
					<Box
						className={css({
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							mt: "1rem",
						})}
					>
						<Weight size={"28"} />
						<Text>
							<span
								className={css({
									fontWeight: "bold",
								})}
							>
								体重:{" "}
							</span>
							<span>{patient.bodyWeight}kg</span>
						</Text>
					</Box>
					<Box
						className={css({
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							mt: "1rem",
						})}
					>
						<Briefcase size={"28"} />
						<Text>
							<span
								className={css({
									fontWeight: "bold",
								})}
							>
								職業:{" "}
							</span>
							<span>{patient.occupation}</span>
						</Text>
					</Box>
				</Box>
			)}
			<Box
				className={css({
					backgroundColor: "gray.2",
					padding: "1rem",
					display: "flex",
					flexDirection: "column",
					gap: "10",
					width: "100%",
				})}
			>
				<Text fontSize={"2xl"} fontWeight={"bold"}>
					検査結果
				</Text>
				{healthCheckups.map((healthCheckup) => (
					<Card.Root
						key={healthCheckup.healthCheckupID}
						className={css({
							width: "500px",
						})}
					>
						<Card.Header>
							<Box
								className={css({
									display: "flex",
									justifyContent: "space-between",
								})}
							>
								<Box>
									<Text fontSize={"2xl"} fontWeight={"bold"}>
										{healthCheckup.date}
									</Text>
								</Box>
								<Box>
									<Button>編集</Button>
								</Box>
							</Box>
						</Card.Header>
						<Card.Body>
							<Box>
								<span className={css({ fontWeight: "bold" })}>体温: </span>
								<span>{healthCheckup.bodyTemperature}度</span>
							</Box>
							<Box>
								<span className={css({ fontWeight: "bold" })}>血圧: </span>
								<span>{healthCheckup.boolPressure}</span>
							</Box>
							<Box>{healthCheckup.medicalRecord}</Box>
						</Card.Body>
					</Card.Root>
				))}
			</Box>
		</Box>
	);
};
