import { PrimaryButton, Stack } from "@fluentui/react";
import * as React from "react"
import "./FileUpload.scss"
import { AiOutlineFile } from "react-icons/ai";
import { FiTrash } from 'react-icons/fi'

interface IFileItem{
    file: File;
    deleteFile?: (item: File) => void;
    isView?: boolean;
}

const FileItem = (props: IFileItem) => {
return (
    <Stack className="file-item">
        <AiOutlineFile/>
        <Stack>{props.file.name}</Stack>
        {
            !props.isView && (
                <Stack onClick={() => props.deleteFile(props.file)}>
                    <FiTrash/>
                </Stack>
            )
        }
    </Stack>
)
}

export default FileItem;