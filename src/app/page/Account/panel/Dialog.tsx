import { DefaultButton, Dialog, DialogFooter, PrimaryButton, Stack } from '@fluentui/react'

export interface ISucccessDialogProps{
    isDialogClosed: boolean,
    closeDialog?: () => void,
    account: {
        fullname: string,
        username: string,
        password: string,
    }
}

const SuccessDialog = (props: ISucccessDialogProps) => {
    return(
        <Dialog
            hidden={props.isDialogClosed}
            onDismiss={props.closeDialog}
            dialogContentProps={{title: 'Đăng kí tài khoản thành công'}}
            maxWidth={'480px'}
            minWidth={'480px'}
            modalProps={{isBlocking: true}}
        >
            <Stack>
                <Stack>Họ và tên: {props.account?.fullname}</Stack>
                <Stack>Tên đăng nhập: {props.account?.username}</Stack>
                <Stack>Mật khẩu: {props.account?.password}</Stack>
            </Stack>
            <DialogFooter>
                <DefaultButton text='OK' onClick={props.closeDialog}/>
                <PrimaryButton text='Print' onClick={() => alert('In form luu san ra')}/>
            </DialogFooter>
        </Dialog>
    )
}

export default SuccessDialog;