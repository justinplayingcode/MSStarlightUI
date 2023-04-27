import { DefaultButton, PrimaryButton, Stack, TextField } from '@fluentui/react'
import { accountRole } from 'model'
import * as React from 'react'

export interface ICreateAccountProps{
    role: accountRole,
    onClickSave: () => void,
    onClickCancel: () => void,
}

const CreateAccount = (props: ICreateAccountProps) => {

    const renderInputField = () => {
        return(
            <>
             <TextField
                label='Họ và tên'
             />
             <TextField
                label=''
             />
            </>
        )
    }

    const renderFooter = () => {
        return(
            <>
            <DefaultButton text='Hủy'
                onClick={() => {
                    props.onClickCancel()
                }}
            />
            <PrimaryButton text='Lưu'
                onClick={() => {
                    props.onClickSave()
                }}
            />
            </>
        )
    }
    return(
        <Stack className='create-container'>
            <Stack className='form-container'>
                {renderInputField()}
            </Stack>
            {renderFooter()}
        </Stack>
    )
}