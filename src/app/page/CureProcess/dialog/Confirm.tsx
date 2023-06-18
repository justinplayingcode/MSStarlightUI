import * as React from 'react'
import './index.scss'
import { DefaultButton, Dialog, DialogFooter, PrimaryButton, Stack } from '@fluentui/react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Convert } from 'utils';

interface IConfirmDialogProps{
    isDialogClosed: boolean;
    closeDialog: () => void;
    confirm: () => void;
    title: string;
  }

const ConfirmDialog = (props: IConfirmDialogProps) => {
    const { tableSelectedItem } = useSelector((state:RootState) => state.currentSelected)

    const renderDialogContent = () => {
        return (
            <Stack>
                <Stack style={{fontWeight: 700}}>{props.title}</Stack>
                <Stack horizontal horizontalAlign='space-between'>
                    <Stack>Họ và tên: {tableSelectedItem[0]?.fullname}</Stack>
                    <Stack>Giới tính: {Convert.convertGender(tableSelectedItem[0]?.gender)}</Stack>
                </Stack>
                <Stack>Ngày sinh: {tableSelectedItem[0]?.dateOfBirth}</Stack>
                <Stack>Địa chỉ: {tableSelectedItem[0]?.address}</Stack>
            </Stack>
        )
    }
    return (
        <Dialog
            hidden={props.isDialogClosed}
            onDismiss={() => {
                props.closeDialog?.();
            }}
            dialogContentProps={{ title: 'Bắt đầu khám' }}
            maxWidth={'480px'}
            minWidth={'480px'}
            modalProps={{ isBlocking: true }}
        >
            <Stack className='dialog-content'>
                {renderDialogContent()}
            </Stack>
            <DialogFooter>
                <DefaultButton onClick={() => {
                    props.closeDialog?.()
                }}
                    text="Hủy"
                />
                <PrimaryButton onClick={() => {
                    props.confirm()
                }}
                    text='Tiếp tục'
                />
            </DialogFooter>
        </Dialog>
    )
}

export default ConfirmDialog;