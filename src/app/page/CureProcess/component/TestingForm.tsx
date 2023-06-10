import { Stack, TextField } from '@fluentui/react';
import { fontWeight } from '@mui/system';
import * as React from 'react'

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

    const renderTest = (isView: boolean, test: ITest) => {
        if (isView){
            return <> <Stack>{test.reason}</Stack></>
        }
        return(
            <>
                <TextField
                    label='Kết quả xét nghiệm'
                    multiline
                    rows={4}
                    resizable={false}
                />
                <Stack>Đính kèm file kết quả</Stack>
                <input type='file'/>
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