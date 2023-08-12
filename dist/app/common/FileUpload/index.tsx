import { Stack } from "@fluentui/react";
import "./FileUpload.scss"

interface IUploadProps{
    text?: string;
    files: File[];
    addFiles: (array: File[]) => void;
    isView: boolean;
    multiple?: boolean;
    accept: string;
    index?: any
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
                    <input id={`upload-input-${props.index}`} type="file" accept={props.accept} onChange={uploadHandler}/>
                    <label htmlFor={`upload-input-${props.index}`} className="upload-label">{props?.text ? props.text : "Upload"}</label>
                </Stack>
            </Stack>
        </>
    )
}

export default FileUpload;