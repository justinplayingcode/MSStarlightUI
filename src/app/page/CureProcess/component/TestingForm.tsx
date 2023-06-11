import { Stack, TextField } from '@fluentui/react';
import { fontWeight } from '@mui/system';
import * as React from 'react'
import FileUpload from 'src/app/common/FileUpload';
import FileLists from 'src/app/common/FileUpload/FileList';

interface ITest{
    title: string;
    reason: string;
    detail?: File;
}

export interface ITestingProps{
    isView: boolean; 
    testingList: ITest[]
}

export const TestingForm = (props: ITestingProps) => {

    
    const [fileLists, setFileList] = React.useState<File[]>([]);

    const handleRemoveFile = (item : File) => {
        const list = [...fileLists];
        const index = list.findIndex(i => i.name === item.name);
        list.splice(index, 1);
        setFileList(list);
      }
    const renderTest = (isView: boolean, test: ITest) => {
        if (isView){
            return <> <Stack>{test.reason}</Stack></>
        }
        return(
            <>
                <Stack>- Kết quả xét nghiệm</Stack>
                {isView ? (<Stack>{test.reason}</Stack>)
                    :
                    <TextField
                        label='- Kết quả xét nghiệm'
                        multiline
                        rows={4}
                        resizable={false}
                    />
                }
                <Stack>- File kết quả</Stack>
                {!isView && (
                    <FileUpload
                        files={fileLists}
                        addFiles={setFileList}
                        isView={false}
                    />
                )}
                <FileLists files={fileLists} isView={false} removeFiles={handleRemoveFile} />
            </>
        )
    }
    
    return(
        <Stack>
            {!props.isView && (
                <Stack style={{fontWeight : 600, fontSize: 18, paddingBottom: 16}}>Bắt đầu xét nghiệm</Stack>
            )}
            {
                Array.from(props.testingList).map((test, index) => (
                    <Stack
                        key={index}
                    >
                        <Stack style={{fontWeight : 600}}>{test.title}</Stack>
                        {renderTest(props.isView, test)}
                    </Stack>
                ))
            }
        </Stack>
    )
}