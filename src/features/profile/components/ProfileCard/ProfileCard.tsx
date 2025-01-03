import { Avatar } from "@ark-ui/react";
import {
	BriefcaseMedical,
	Hospital,
	Mail,
	MessageCircle,
	Pencil,
	Phone,
	Stethoscope,
} from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Doctor } from "~/domain/doctor/doctor";
import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { Badge } from "~/components/ui/badge";
import { IconButton } from "~/components/ui/icon-button";

type ProfileCardProps = {
	doctor: Doctor;
	onEdit: () => void;
};

export const ProfileCard: FC<ProfileCardProps> = ({ doctor, onEdit }) => {
	return (
		<Card.Root
			className={css({
				w: "800px",
				position: "relative",
			})}
		>
			<Box
				className={css({
					position: "absolute",
					top: "30px",
					right: "30px",
				})}
			>
				<IconButton variant="ghost" size={"lg"} onClick={onEdit}>
					<Pencil size={48} />
				</IconButton>
			</Box>
			<Card.Body>
				<Box
					className={css({
						pt: "40px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					})}
				>
					<Avatar.Root
						className={css({
							w: "150px",
							h: "150px",
							bgColor: "gray.5",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: "full",
							boxShadow: "md",
						})}
					>
						<Avatar.Fallback
							className={css({
								width: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							})}
						>
							<Text size={"4xl"}>{doctor.lastName}</Text>
						</Avatar.Fallback>
						<Avatar.Image
							src={doctor.doctorIconUrl}
							alt="avatar"
							className={css({
								borderRadius: "full",
							})}
						/>
					</Avatar.Root>
				</Box>
				<Box
					className={css({
						textAlign: "center",
					})}
				>
					<Text
						size={"3xl"}
						className={css({
							mt: "20px",
							fontWeight: "bold",
						})}
					>
						<span>{doctor.lastName}</span>
						<span>{doctor.firstName}</span>
					</Text>
				</Box>
				<Box
					className={css({
						display: "flex",
						gap: "4",
						mt: "40px",
						flexWrap: "wrap",
						justifyContent: "center",
						"@media (max-width: 768px)": {
							flexDirection: "column",
							alignItems: "center",
						},
					})}
				>
					<ProfileInfo
						label="所属病院"
						value={doctor.hospital.hospitalName}
						icon={<Hospital />}
					/>
					<ProfileInfo
						label="診療科"
						value={
							<div
								className={css({
									display: "flex",
									gap: "2",
									alignItems: "center",
									flexWrap: "wrap",
								})}
							>
								{doctor.departments.map((department) => (
									<Badge
										size={"lg"}
										key={department.departmentID}
										fontWeight={"bold"}
									>
										#{department.departmentName}
									</Badge>
								))}
							</div>
						}
						icon={<BriefcaseMedical />}
					/>
					<ProfileInfo
						label="メールアドレス"
						value={doctor.email}
						icon={<Mail />}
					/>
					<ProfileInfo
						label="電話番号"
						value={doctor.phoneNumber}
						icon={<Phone />}
					/>
					<ProfileInfo
						label="チャット対応時間"
						value={doctor.chatSupportHours}
						icon={<MessageCircle />}
					/>
					<ProfileInfo
						label="電話対応時間"
						value={doctor.callSupportHours}
						icon={<Stethoscope />}
					/>
				</Box>
			</Card.Body>
		</Card.Root>
	);
};
