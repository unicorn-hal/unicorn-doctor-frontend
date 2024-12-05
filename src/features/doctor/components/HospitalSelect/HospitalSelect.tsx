import { ListCollection } from "@ark-ui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { Select } from "~/components/ui/select";
import { HospitalCollection } from "../../hooks/useSaveDoctorForm";

type DepartmentSelectProps = {
	collection: ListCollection<HospitalCollection>;
	defaultValue?: string;
	onSelectHospital: (department: HospitalCollection) => void;
};
export const HospitalSelect: FC<DepartmentSelectProps> = ({
	collection,
	defaultValue,
	onSelectHospital,
}) => {
	const handleSelectHospital = (item: HospitalCollection) => {
		onSelectHospital(item);
	};
	return (
		<div>
			<Select.Root
				positioning={{ sameWidth: true }}
				collection={collection}
				closeOnSelect={false}
				onValueChange={(e) => {
					handleSelectHospital(e.items[0]);
				}}
				defaultValue={defaultValue ? [defaultValue] : undefined}
			>
				<Select.Label>所属病院</Select.Label>
				<Select.Control>
					<Select.Trigger>
						<Select.ValueText placeholder="所属病院を選択してください" />
						<ChevronsUpDownIcon />
					</Select.Trigger>
				</Select.Control>
				<Select.Positioner>
					<Select.Content>
						<Select.ItemGroup
							className={css({
								maxHeight: "200px",
								overflowY: "auto",
							})}
						>
							<Select.ItemGroupLabel>病院選択</Select.ItemGroupLabel>
							{collection.items.map((item) => (
								<Select.Item key={item.value} item={item}>
									<Select.ItemText>{item.label}</Select.ItemText>
									<Select.ItemIndicator>
										<CheckIcon />
									</Select.ItemIndicator>
								</Select.Item>
							))}
						</Select.ItemGroup>
					</Select.Content>
				</Select.Positioner>
			</Select.Root>
		</div >
	);
};
