import { DefaultButton, Dialog, DialogFooter, PrimaryButton, Stack, Text } from '@fluentui/react';
import Api from 'api';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toastType } from 'src/model/enum';
import { closeLoading, openLoading, showToastMessage } from 'src/redux/reducers';
import { RootState } from 'src/redux/store';
import { Convert } from 'utils';

interface IDialogProps {
    isHidden: boolean;
    onDismiss: () => void;
}

const ResetPassword = (props: IDialogProps) => {

    const { tableSelectedItem } = useSelector((state: RootState) => state.currentSelected)
    const account = tableSelectedItem[0];
    const dispatch = useDispatch();

    const handleConfirm = () => {
        dispatch(openLoading());
        Api.authApi.resetpassword({ userId: account?.userId }).then(data => {
          const errorMessage = (data as any).message;
          let typeToast = toastType.error;
          if(!data.status) {
            props.onDismiss();
            typeToast = toastType.succes;
          }
          dispatch(showToastMessage({message: errorMessage, type: typeToast}))
        }).catch(() => dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}))).finally(() => {
          dispatch(closeLoading())
        });
    }

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