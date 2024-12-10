import { useNavigate } from "@tanstack/react-router";
import { FC } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { Table } from "~/components/ui/table";
import { convertGender, User } from "~/domain/user/user";

type PatientListProps = {
	patients: User[];
};

export const PatientList: FC<PatientListProps> = ({ patients }) => {
	const navigate = useNavigate();
	const handleClick = (patient: User) => {
		navigate({ to: `/doctors/patients/${patient.userID}` });
	};
	return (
		<Table.Root variant={"outline"}>
			<Table.Head>
				<Table.Row>
					<Table.Header>名前</Table.Header>
					<Table.Header>性別</Table.Header>
					<Table.Header>生年月日</Table.Header>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{patients.length === 0 && (
					<Table.Row>
						<Table.Cell colSpan={3}>
							<Box className={css({ textAlign: "center" })}>
								かかりつけ患者がいません。
							</Box>
						</Table.Cell>
					</Table.Row>
				)}
				{patients.map((patient) => (
					<Table.Row
						key={patient.userID}
						onClick={() => handleClick(patient)}
						className={css({
							cursor: "pointer",
						})}
					>
						<Table.Cell>
							{patient.lastName} {patient.firstName}
						</Table.Cell>
						<Table.Cell>{convertGender(patient.gender)}</Table.Cell>
						<Table.Cell>{patient.birthDate}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};
