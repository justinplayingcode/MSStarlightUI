import { PrimaryButton, Stack } from "@fluentui/react";
import * as React from "react"
import "./FileUpload.scss"

interface IUploadProps{
    files: File[];
    addFiles?: (array: File[]) => void;
    isView: boolean;
}

const FileUpload = (props: IUploadProps) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];        
        props.addFiles([...props.files, file]);
        event.target.value = "";
    };
    return(
        <>
            <Stack className="file-card">
                <Stack className="file-input">
                    <input type="file" onChange={uploadHandler}/>
                    <button className="upload-btn">Upload</button>
                </Stack>
            </Stack>
        </>
    )
}

export default FileUpload;