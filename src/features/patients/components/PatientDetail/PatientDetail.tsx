import {
	Briefcase,
	Cake,
	Mail,
	MapPin,
	Pencil,
	Phone,
	Ruler,
	Weight,
} from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { Avatar } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { HealthCheckup } from "~/domain/health_checkup/healthCheckup";
import { convertGender, User } from "~/domain/user/user";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { Button } from "~/components/ui/button";

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
							width: "700px",
						})}
					>
						<Card.Body
							className={css({
								display: "flex",
								flexDirection: "row",
								gap: "1rem",
							})}
						>
							<Box
								className={css({
									width: "90%",
								})}
							>
								<Markdown
									remarkPlugins={[remarkBreaks]}
									components={{
										h1: ({ children }) => (
											<Text
												className={css({
													fontSize: "2xl",
													fontWeight: "bold",
													margin: "1.2rem 0",
												})}
											>
												{children}
											</Text>
										),
										h2: ({ children }) => (
											<Text
												className={css({
													fontSize: "xl",
													fontWeight: "bold",
													margin: "1rem 0",
												})}
											>
												{children}
											</Text>
										),
										p: ({ children }) => (
											<Text
												className={css({
													margin: "1rem 0",
												})}
											>
												{children}
											</Text>
										),
									}}
								>
									{healthCheckup.medicalRecord}
								</Markdown>
							</Box>
							<Box
								className={css({
									marginTop: "1.2rem",
								})}
							>
								<Button>
									<Pencil size={20} />
									編集
								</Button>
							</Box>
						</Card.Body>
					</Card.Root>
				))}
			</Box>
		</Box>
	);
};