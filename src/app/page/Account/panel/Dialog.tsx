import { DefaultButton, Dialog, DialogFooter, PrimaryButton } from '@fluentui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'src/utils/fonts/times-new-roman-normal';
export interface ISucccessDialogProps {
    isDialogClosed: boolean,
    closeDialog?: () => void,
    account: {
        fullname: string,
        username: string,
        password: string,
    }
}


const SuccessDialog = (props: ISucccessDialogProps) => {

    const handlePrint = (element: string, name?: string) => {
        const input = document.querySelector("#created-info-download") as HTMLElement;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.setFont('times-new-roman')
            pdf.text("Thong tin dang nhap", 10, 10)
            pdf.addImage(imgData, "PNG", 10, 20, 180, 0)

            pdf.save(`${name ? `${name}.pdf` : "info.pdf"}`)
        })
    }

    return (
        <Dialog
            hidden={props.isDialogClosed}
            onDismiss={props.closeDialog}
            dialogContentProps={{ title: 'Đăng kí tài khoản thành công' }}
            maxWidth={'480px'}
            minWidth={'480px'}
            modalProps={{ isBlocking: true }}
        >
            <div id='created-info-download'>
                <div>Họ và tên: {props.account?.fullname}</div>
                <div>Tên đăng nhập: {props.account?.username}</div>
                <div>Mật khẩu: {props.account?.password}</div>
            </div>
            <DialogFooter>
                <DefaultButton text='OK' onClick={props.closeDialog} />
                <PrimaryButton text='Print' onClick={() => handlePrint('created-info-download', props.account?.fullname)} />
            </DialogFooter>
        </Dialog>
    )
}

export default SuccessDialog;