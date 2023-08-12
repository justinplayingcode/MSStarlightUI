import { DefaultButton, Dialog, DialogFooter, PrimaryButton } from "@fluentui/react"
import { ApproveDialogType } from "../RequestAppointments"
import { useDispatch, useSelector } from "react-redux";
import "./../index.scss"
import { RootState } from "../../../../redux/store";
import { closeLoading, openLoading, showToastMessage, tableRefresh } from "../../../../redux/reducers";
import Api from "../../../../api";
import { ApiStatus } from "../../../../model";
import { toastType } from "../../../../model/enum";

export interface IApproveDialogProps{
  isDialogClosed: boolean,
  closeDialog: () => void,
  dialogType: ApproveDialogType,
}

const ApproveDialog = (props: IApproveDialogProps) => {
  const { tableSelectedItem } = useSelector((state: RootState) => state.currentSelected);
  const dispatch = useDispatch();

  const renderDialog = (): JSX.Element => {
    switch(props.dialogType) {
      case ApproveDialogType.accept:
        return renderContent('CHẤP NHẬN')
      case ApproveDialogType.reject:
        return renderContent('TỪ CHỐI')
    }
  }

  const renderContent = (text: string) => {
    const name = tableSelectedItem[0]?.fullname;
    const date = tableSelectedItem[0]?.appointmentDate;

    return (
      <div className="main-dialog">
        <div>{<span>{`${text}`}</span>} lịch hẹn khám bệnh</div>
        <div>với bệnh nhân: {<span>{`${name}`}</span>}, vào ngày: {<span>{`${date}`}</span>}</div>
      </div>

    )
  }

  const handleSave = () => {
    const reqbody = {
      id: tableSelectedItem[0]._id,
      patientId: tableSelectedItem[0].patientId,
      approve: props.dialogType === ApproveDialogType.accept
    }
    dispatch(openLoading());
    Api.scheduleApi.approveRequest(reqbody).then(data => {
      if(data.status === ApiStatus.succes) {
        dispatch(showToastMessage({message: "Xác nhận thành công", type: toastType.succes}));
        props.closeDialog();
        dispatch(tableRefresh())
      } else {
        dispatch(showToastMessage({message: "Xác nhận thất bại, vui lòng thử lại", type: toastType.error}));
      }
    }).catch(() => {
      dispatch(showToastMessage({message: 'Có lỗi xảy ra, vui lòng liên hệ bộ phận hỗ trợ', type: toastType.error}))
    }).finally(() => dispatch(closeLoading()))
  }

  return (
    <Dialog
        hidden={props.isDialogClosed}
        onDismiss={props.closeDialog}
        dialogContentProps={{title: props.dialogType === ApproveDialogType.accept ? 'Chấp nhận lịch hẹn' : "Từ  chối lịch hẹn"}}
        maxWidth={'480px'}
        minWidth={'480px'}
        modalProps={{isBlocking: true}}
    >
        {renderDialog()}
        <DialogFooter>
            <DefaultButton text='Thoát' onClick={props.closeDialog}/>
            <PrimaryButton text={props.dialogType === ApproveDialogType.accept ? 'Chấp nhận' : 'Từ chối'} onClick={handleSave}/>
        </DialogFooter>
    </Dialog>
  )
}

export default ApproveDialog;