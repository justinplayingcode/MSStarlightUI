import { UniformTable } from "src/app/common";
import { ApiStatus, TableType, exportCsvType, toastType } from "src/model/enum";
import Api from "api";
import { patientonboardingtColumns } from "../../components/table/patientonboarding";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { DefaultButton, Dialog, DialogFooter, ICommandBarItemProps, PrimaryButton, TextField } from "@fluentui/react";
import CustomDatePicker from "src/app/common/Datepicker";
import { basicKeyValueRender } from "src/utils/utils";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading, showToastMessage } from "src/redux/reducers";
import { Convert } from "utils";
import { useNavigate } from "react-router-dom";

const PatientInOnboarding = () => {
  const {tableSelectedCount, tableSelectedItem} = useSelector((state: RootState) => state.currentSelected);
  const [closeDialog, setCloseDialog] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [description, setDescription] = useState<string>();
  const [dateError, setDateError] = useState<string>("Hãy chọn ngày hẹn");
  const [descError, setDescError] = useState<string>("Hãy điền vào trường này");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetDialog = () => {
    setSelectedDate(undefined);
    setDescription("")
  }

  const getCommandBar = () => {
    const commandBar: ICommandBarItemProps[] = [];
    if(tableSelectedCount === 1) {
      commandBar.push(
        {
          key: "details-patient",
          text: "Thông tin chi tiết",
          iconProps: { iconName: 'TextDocumentShared' },
          onClick: () => navigate(`/patient-management-doctor/details/${tableSelectedItem[0].patientId}`)
        },
        {
          key: "appointment",
          text: "Hẹn lịch khám",
          iconProps: { iconName: 'CalendarMirrored' },
          onClick: () => setCloseDialog(false)
        }
      )
    }
    commandBar.push({
      key: "export",
      text: "Xuất file excel",
      iconProps: { iconName: 'Installation' },
      onClick: handleExportCsv
    })
    return commandBar;
  }

  const handleExportCsv = () => {
    dispatch(showToastMessage({message: 'Đang tiến hành tải file, vui lòng chờ trong ít phút', type: toastType.info}));
    Api.statisticApi.exportExcel(exportCsvType.patientIn).api.then(response  => {
      const blob = new Blob([(response as any).csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename: string = (response as any).fileName;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(() => {
      dispatch(showToastMessage({message: 'Xảy ra lỗi khi tải xuống, vui lòng thử lại', type: toastType.error}));
    });
  }

  const handleSubmitDialog = () => {
    if(!!dateError || !!descError) {
      return
    }
    const body = {
      patientId: tableSelectedItem[0]?.patientId,
      initialSymptom: description,
      departmentId: tableSelectedItem[0]?.departmentId,
      appointmentDate: Convert.datetommddyyyy(selectedDate),
    }
    dispatch(openLoading());
    Api.scheduleApi.doctorRequestSchedule(body).then(data => {
      if(data.status === ApiStatus.succes) {
        dispatch(showToastMessage({message: "Hẹn lịch khám với bệnh nhân thành công", type: toastType.succes}));
        setCloseDialog(true);
        resetDialog();
      } else {
        dispatch(showToastMessage({message: 'Có lỗi, vui lòng liên hệ bộ phận hỗ trợ', type: toastType.error}));
      }
    }).catch(() => {
      dispatch(showToastMessage({message: 'Có lỗi, vui lòng liên hệ bộ phận hỗ trợ', type: toastType.error}))
    }).finally(() => dispatch(closeLoading()))
  }

  const onDismissDialog = () => {
    setCloseDialog(true)
  }

  const handleChangeDate = (value) => {
    setSelectedDate(value);
    setDateError(undefined)
  }

  const handleChangeDecs = (_, value) => {
    setDescription(value);
    if(value.trim() !== "") {
      setDescError(undefined)
    } else {
      setDescError("Hãy điền vào trường này")
    }
  }

  const renderContentDialog = ():JSX.Element => {
    return <>
      {basicKeyValueRender("Bệnh nhân", tableSelectedItem[0]?.fullname)}
      {basicKeyValueRender("Ngày sinh", tableSelectedItem[0]?.dateOfBirth)}
      {basicKeyValueRender("Địa chỉ", tableSelectedItem[0]?.address)}
      <div className="make-appointment-dialog">
        <div className='title'>Chọn ngày hẹn: </div>
          <CustomDatePicker
            onChangeDate={handleChangeDate}
            errorMessage={dateError}
            currentDate={selectedDate}
          />
      </div>
      <div className="make-appointment-dialog">
        <div className='title'>Lí do: </div> 
        <TextField
          className='textfield'
          multiline
          onChange={handleChangeDecs}
          resizable={false}
          errorMessage={descError}
          value={description}
        />
      </div>
    </>
    
  }

  return(
    <div className='wrapper-table-content speciality-wrapper'>
      <UniformTable
          integrateItems={Api.cureProcessApi.getPatientsOnBoarding}
          columns={patientonboardingtColumns}
          commandBarItems={getCommandBar()}  
          tableType={TableType.schedulePatientIn}       
      />
      <Dialog
          dialogContentProps={{ title: "Hẹn lịch khám bệnh"}}
          hidden={closeDialog}
          maxWidth={'480px'}
          minWidth={'480px'}
          modalProps={{ isBlocking: true }}
          onDismiss={onDismissDialog}
        >
          <div>
            {renderContentDialog()}
            <DialogFooter>
              <DefaultButton text='Hủy'
                  onClick={() => {
                      onDismissDialog();
                  }}
              />
              <PrimaryButton text='Xác nhận'
                  onClick={handleSubmitDialog}
              />
            </DialogFooter>
          </div>
        </Dialog>
    </div>
  )
}

export default PatientInOnboarding;