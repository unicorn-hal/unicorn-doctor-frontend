import { createListCollection } from "@ark-ui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { FC } from "react";
import { css } from "styled-system/css";
import { Select } from "~/components/ui/select";
import { generateTimeOptions } from "~/util/util";

type TimeSelectorProps = {
	time?: string | undefined;
	onChange: (time: string) => void;
};
const timeOptions = generateTimeOptions();

export const TimeSelector: FC<TimeSelectorProps> = ({ time, onChange }) => {
	const collection = createListCollection({
		items: timeOptions.map((time) => ({
			label: time.label,
			value: time.value,
		})),
	});
	return (
		<Select.Root
			collection={collection}
			defaultValue={time ? [time] : undefined}
			onValueChange={(e) => {
				onChange(e.items[0].value);
			}}
		>
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText placeholder={time || "選択してください"} />
					<ChevronsUpDownIcon />
				</Select.Trigger>
			</Select.Control>
			<Select.Positioner>
				<Select.Content>
					<Select.ItemGroup
						className={css({
							maxHeight: "200px",
							width: "150px",
							overflowY: "auto",
						})}
					>
						{timeOptions.map((item) => (
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
	);
};
