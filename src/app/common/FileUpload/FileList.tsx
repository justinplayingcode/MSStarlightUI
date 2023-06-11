import { PrimaryButton, Stack } from "@fluentui/react";
import * as React from "react"
import "./FileUpload.scss"
import FileItem from "./FileItem";

interface IFileList{
    files: File[];
    removeFiles?: (item: File) => void;
    isView?: boolean;
}

const FileLists = (props: IFileList) => {
return (
    <Stack className="file-list">
        {
            props.files.map((file, index) => (
                <FileItem 
                    isView={props.isView}
                    key={index}
                    file={file}
                    deleteFile={(file) => {
                        props.removeFiles(file)
                    }}
                />
            ))
        }
    </Stack>
)
}

export default FileLists;