import { DefaultButton, Dialog, DialogFooter, PrimaryButton, Stack, Text } from '@fluentui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Convert } from 'utils';

interface IDialogProps {
    isHidden: boolean;
    onDismiss: () => void;
    onReset?: () => void;
}

const ResetPassword = (props: IDialogProps) => {

    const { tableSelectedItem } = useSelector((state: RootState) => state.currentSelected)

    const handleConfirm = () => {
        alert(`Đặt lại mật khẩu: ${tableSelectedItem[0]}`);
        props?.onReset?.();
    }

    const account = tableSelectedItem[0];
    return (
        <Dialog
            hidden={props.isHidden}
            onDismiss={props.onDismiss}
            dialogContentProps={{ title: 'Đặt lại mật khẩu' }}
            maxWidth={'480px'}
            minWidth={'480px'}
            modalProps={{ isBlocking: true }}
        >
            <Stack>
                <Text>Đặt lại mật khẩu cho tài khoản: </Text>
                <Stack style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text>
                        {`${account?.departmentName ? "Bác sĩ:" : "Bệnh nhân:"} ${account?.fullname}`}
                    </Text>
                    <Text>{`Giới tính: ${Convert.convertGender(account?.gender)}`}</Text>
                    <Text>{`Ngày sinh: ${account?.dateOfBirth}`}</Text>
                    {account?.departmentName && <Text>{account?.departmentName}</Text>}
                </Stack>
            </Stack>
            <DialogFooter>
                <DefaultButton text='Hủy'
                    onClick={() => {
                        props.onDismiss();
                    }}
                />
                <PrimaryButton text='Xác nhận'
                    onClick={() => {
                        handleConfirm();
                    }}
                />
            </DialogFooter>

        </Dialog>
    )
}

export default ResetPassword;