import { Icon, IconButton, Stack } from "@fluentui/react";
import "./FileUpload.scss"
import "./FileUpload.scss";

interface IFileItem{
    file: File;
    deleteFile?: (item: File) => void;
    isView?: boolean;
}

const FileItem = (props: IFileItem) => {
return (
    <Stack 
      className="file-item-upload-file-custom"
    >
        <Icon iconName="Page" />
        <Stack className="file-item-upload-file-name">{props.file.name}</Stack>
        {
            !props.isView && (
                <IconButton 
                  iconProps={{ iconName: 'Cancel' }}
                  style={{color: "#333"}}
                  aria-label="Xóa"
                  onClick={() => props.deleteFile!(props.file)}
                />
            )
        }
    </Stack>
)
}

export default FileItem;