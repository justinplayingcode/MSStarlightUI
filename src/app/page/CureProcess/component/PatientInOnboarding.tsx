import { UniformTable } from "src/app/common";
import { TableType } from "src/model/enum";
import Api from "api";
import { patientonboardingtColumns } from "../../components/table/patientonboarding";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { DefaultButton, Dialog, DialogFooter, ICommandBarItemProps, PrimaryButton, TextField } from "@fluentui/react";
import CustomDatePicker from "src/app/common/Datepicker";
import { basicKeyValueRender } from "src/utils/utils";
import "./index.scss"

const PatientInOnboarding = () => {
  const {tableSelectedCount, tableSelectedItem} = useSelector((state: RootState) => state.currentSelected);
  const [closeDialog, setCloseDialog] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [description, setDescription] = useState<string>();
  const [dateError, setDateError] = useState<string>("Hãy chọn ngày hẹn");
  const [descError, setDescError] = useState<string>("Hãy điền vào trường này");

  const getCommandBar = () => {
    const commandBar: ICommandBarItemProps[] = [];
    if(tableSelectedCount === 1) {
      commandBar.push({
        key: "appointment",
        text: "Hẹn lịch khám",
        iconProps: { iconName: 'CalendarAgenda' },
        onClick: () => setCloseDialog(false)
      })
    }
    return commandBar;
  }

  const handleSubmitDialog = () => {
    if(dateError && descError) {
      return
    }
    // call api
    setCloseDialog(true)
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