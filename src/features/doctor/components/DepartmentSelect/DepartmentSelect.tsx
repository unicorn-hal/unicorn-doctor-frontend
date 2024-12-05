import { ListCollection } from "@ark-ui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { Select } from "~/components/ui/select";
import { DepartmentCollection } from "../../hooks/useSaveDoctorForm";

type DepartmentSelectProps = {
	collection: ListCollection<DepartmentCollection>;
	defaultValues?: (string | undefined)[];
	onSelectDepartment: (department: DepartmentCollection[]) => void;
};
export const DepartmentSelect: FC<DepartmentSelectProps> = ({
	collection,
	defaultValues,
	onSelectDepartment,
}) => {
	const handleSelectDepartment = (item: DepartmentCollection[]) => {
		onSelectDepartment(item);
	};
	return (
		<div>
			<Select.Root
				positioning={{ sameWidth: true }}
				collection={collection}
				multiple
				closeOnSelect={false}
				defaultValue={
					defaultValues
						? defaultValues.filter(
								(value): value is string => value !== undefined,
							)
						: undefined
				}
				onValueChange={(e) => {
					handleSelectDepartment(e.items);
				}}
			>
				<Select.Label>診療科</Select.Label>
				<Select.Control>
					<Select.Trigger>
						<Select.ValueText placeholder="診療科を選択してください" />
						<ChevronsUpDownIcon />
					</Select.Trigger>
				</Select.Control>
				<Select.Positioner>
					<Select.Content>
						<Select.ItemGroup
							className={css({
								maxHeight: "300px",
								overflowY: "auto",
							})}
						>
							<Select.ItemGroupLabel>診療科選択</Select.ItemGroupLabel>
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
		</div>
	);
};
