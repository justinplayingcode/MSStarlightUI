import { PrimaryButton, Stack } from "@fluentui/react";
import * as React from "react"
import "./FileUpload.scss"

interface IUploadProps{
    text?: string;
    files: File[];
    addFiles: (array: File[]) => void;
    isView: boolean;
    multiple?: boolean;
    accept: string;
}

const FileUpload = (props: IUploadProps) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];    
        if(props?.multiple){
            props.addFiles([...props.files, file]);
        }    
        else props.addFiles([file])
        event.target.value = "";
    };
    return(
        <>
            <Stack className="file-card">
                <Stack className="file-input">
                    <input type="file" accept={props.accept} onChange={uploadHandler}/>
                    <button className="upload-btn">{props?.text ? props.text : "Upload"}</button>
                </Stack>
            </Stack>
        </>
    )
}

export default FileUpload;