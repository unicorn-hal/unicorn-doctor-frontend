import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";

type ConfirmationDialogProvider = {
	children: ReactNode;
};

type ConfirmationDialogContext = (
{
	title,
	description,
}: {
	title: string;
	description: string;
}
) => Promise<unknown>;

const ConfirmationDialogContext =
	createContext<ConfirmationDialogContext | null>(null);

export const useConfirmationDialog = () => {
	const context = useContext(ConfirmationDialogContext);
	if (!context) {
		throw new Error(
			"useConfirmationDialog must be used within a ConfirmationDialogProvider",
		);
	}
	return context;
};

export const ConfirmationDialogProvider: FC<ConfirmationDialogProvider> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [resolvePromise, setResolvePromise] = useState<
		((value: boolean) => void) | null
	>(null);

	const openConfirmationDialog = useCallback(
		({
			title,
			description,
		}: {
			title: string;
			description: string;
		}) => {
			setTitle(title);
			setDescription(description);
			setIsOpen(true);
			return new Promise<boolean>((resolve) => {
				setResolvePromise(() => resolve);
			});
		},
		[],
	);

	const handleSubmit = useCallback(() => {
		if (resolvePromise) {
			resolvePromise(true);
			setResolvePromise(null);
		}
		setIsOpen(false);
	}, [resolvePromise]);

	const handleClose = useCallback(() => {
		if (resolvePromise) {
			resolvePromise(false);
			setResolvePromise(null);
		}
		setIsOpen(false);
	}, [resolvePromise]);

	return (
		<ConfirmationDialogContext.Provider value={openConfirmationDialog}>
			{children}
			<ConfirmationDialog
				title={title}
				description={description}
				open={isOpen}
				onClose={handleClose}
				onSubmit={handleSubmit}
			/>
		</ConfirmationDialogContext.Provider>
	);
};
