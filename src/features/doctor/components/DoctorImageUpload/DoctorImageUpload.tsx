import { Trash2Icon } from "lucide-react"
import { FileAcceptDetails } from "node_modules/@ark-ui/react/dist/components/file-upload/file-upload";
import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "~/components/ui/button"
import { FileUpload } from "~/components/ui/file-upload";
import { IconButton } from "~/components/ui/icon-button"

type DoctorImageUploadProps = {
    setDoctorImage: Dispatch<SetStateAction<File | null>>;
    maxFileSize: number;
};

export const DoctorImageUpload: FC<DoctorImageUploadProps> = ({
    setDoctorImage,
    maxFileSize,
}) => {
    const handleDoctorImageFileAccept = (details: FileAcceptDetails) => {
        setDoctorImage(details.files[0]);
    }
    return (
        <FileUpload.Root maxFiles={1} onFileAccept={handleDoctorImageFileAccept} maxFileSize={maxFileSize} accept={"image/*"} >
            <FileUpload.Dropzone>
                <FileUpload.Label>プロフィール画像を登録</FileUpload.Label>
                <FileUpload.Trigger asChild>
                    <Button size="sm">フォルダを開く</Button>
                </FileUpload.Trigger>
            </FileUpload.Dropzone>
            <FileUpload.ItemGroup>
                <FileUpload.Context>
                    {({ acceptedFiles }) =>
                        acceptedFiles.map((file) => (
                            <FileUpload.Item key={file.name} file={file}>
                                <FileUpload.ItemPreview type="image/*">
                                    <FileUpload.ItemPreviewImage />
                                </FileUpload.ItemPreview>
                                <FileUpload.ItemName />
                                <FileUpload.ItemSizeText />
                                <FileUpload.ItemDeleteTrigger asChild>
                                    <IconButton variant="link" size="sm">
                                        <Trash2Icon />
                                    </IconButton>
                                </FileUpload.ItemDeleteTrigger>
                            </FileUpload.Item>
                        ))
                    }
                </FileUpload.Context>
            </FileUpload.ItemGroup>
            <FileUpload.HiddenInput />
        </FileUpload.Root>
    )
}