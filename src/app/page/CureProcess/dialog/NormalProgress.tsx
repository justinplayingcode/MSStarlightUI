import { Checkbox, DefaultButton, Dialog, DialogFooter, Modal, PrimaryButton, TextField, Toggle } from "@fluentui/react";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useState } from "react";
import { basicKeyValueRender } from "src/utils/utils";
import { Convert } from "utils";
import Picker from "src/app/common/Picker";
import { TestList } from "src/model/doctorModel";
import { TypeOfTest } from "src/model/enum";

interface INormalProgressPorops {
  isOpen: boolean,
  onDismiss: () => void,
}

interface IErrorMessage {
  height: string;
  weight: string;
  heartRate: string;
  temperature: string;
  bloodPressure: string;
  glucose: string;
  symptom: string;
  note: string;
  note2: string;
}

interface ICurrentState {
  height: string;
  weight: string;
  heartRate: string;
  temperature: string;
  bloodPressure: string;
  glucose: string;
  symptom: string;
  note: string;
  note2: string;
}

const initErrorMessage: IErrorMessage = {
  height: "",
  weight: "",
  heartRate: "",
  temperature: "",
  bloodPressure: "",
  glucose: "",
  symptom: "",
  note: "",
  note2: "",
}

const initState: ICurrentState = {
  height: "",
  weight: "",
  heartRate: "",
  temperature: "",
  bloodPressure: "",
  glucose: "",
  symptom: "",
  note: "",
  note2: "",
}

function NormalProgress({ ...props }: INormalProgressPorops) {
  const {tableSelectedItem } = useSelector((state: RootState) => state.currentSelected)
  const [dialogTestingClosed, setDialogTestingClosed] = useState<boolean>(true);
  const [dialogOnbroadingClosed, setDialogOnbroadingClosed] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [testResult, setTestResult] = useState<any[]>([]);
  const [selectedTest, setSelectedTest] = useState<any[]>([]);

  // const [height, setHeight] = useState<string>("");
  // const [weight, setWeight] = useState<string>("");
  // const [heartRate, setHeartRate] = useState<string>("");
  // const [temperature, setTemperature] = useState<string>("");
  // const [bloodPressure, setBloodPressure] = useState<string>("");
  // const [glucose, setGlucose] = useState<string>("");
  // const [symptom, setSymptom] = useState<string>("");
  // const [note, setNote] = useState<string>("");
  // const [note2, setNote2] = useState<string>("");

  const [currentState, setCurrentState] = useState<ICurrentState>(initState);

  const [errorMessage, setErrorMessage] = useState<IErrorMessage>(initErrorMessage)


  const handleOnDisMissDialog = () => {
    setCurrentState(initState);
    setErrorMessage(initErrorMessage)
    setCurrentStep(0);
  }

  const handleSubmit = () => {
    // alert("submit");
    handleOnDisMissDialog() // reset when call api send request success
    props.onDismiss();
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleTestConfirm = () => { 
    alert(selectedTest)
    // setDialogTestingClosed(true);
    // props.onDismiss();
  }

  const validateInput = (key, value, messageErr) => {
    switch(key) {
      case 'height':
        setErrorMessage({ ...errorMessage, [key]: isNaN(Number(value)) ? messageErr : ""})
        break;
      case 'weight':
        setErrorMessage({ ...errorMessage, [key]: isNaN(Number(value)) ? messageErr : ""})
        break;
      case 'heartRate':
        setErrorMessage({ ...errorMessage, [key]: isNaN(Number(value)) ? messageErr : ""})
        break;
      case 'temperature':
        setErrorMessage({ ...errorMessage, [key]: isNaN(Number(value)) ? messageErr : ""})
        break;
      case 'bloodPressure':
        setErrorMessage({ ...errorMessage, [key]: isNaN(Number(value)) ? messageErr : ""})
        break;
      case 'glucose':
        setErrorMessage({ ...errorMessage, [key]: isNaN(Number(value)) ? messageErr : ""})
        break;
      case 'symptom':
        setErrorMessage({ ...errorMessage, [key]: value.length === 0 ? messageErr : ""})
        break;
      case 'note':
        setErrorMessage({ ...errorMessage, [key]: value.length === 0 ? messageErr : ""})
        break;
    }
  }

  const onChangeCurrentState = (key, value) => {
    const newState = {
      ...currentState,
      [key]: value
    }
    setCurrentState(newState);
  }

  const _onchange = (key, value, messageErr) => {
    onChangeCurrentState(key, value);
    validateInput(key, value, messageErr)
  }

  const firstStep = (): JSX.Element => {

    return (
      <>
        <div className="section">
          <div className="header-section">Thông tin bệnh nhân</div>
          <div className="content-section">
            {basicKeyValueRender('Họ và tên', tableSelectedItem[0]?.fullname)}
            {basicKeyValueRender('Ngày sinh', tableSelectedItem[0]?.dateOfBirth)}
            {basicKeyValueRender('Địa chỉ', tableSelectedItem[0]?.address)}
            {basicKeyValueRender('Giới tinh', Convert.convertGender(tableSelectedItem[0]?.gender))}
            {basicKeyValueRender('Bảo hiểm y tế', tableSelectedItem[0]?.insurance)}
            {basicKeyValueRender('Số điện thoại', tableSelectedItem[0]?.phonenumber)}
          </div>
        </div>
        <div className="section">
          <div className="header-section">Khám bệnh</div>
          <div className="content-section">
            <div className="content-section-input">
              <TextField 
                label="Chiều cao:" 
                underlined 
                required 
                placeholder="--" 
                errorMessage={errorMessage.height}
                value={currentState.height}
                onChange={(_, value) => _onchange("height" ,value, "Chua dung dinh dang")}
              />
              <div className="unit">cm</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Cân nặng:" 
                underlined 
                required 
                placeholder="--"
                errorMessage={errorMessage.weight}
                value={currentState.weight}
                onChange={(_, value) => _onchange("weight" ,value, "Chua dung dinh dang")}
              />
              <div className="unit">kg</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Nhịp tim:" 
                underlined 
                required 
                placeholder="--"
                errorMessage={errorMessage.heartRate}
                value={currentState.heartRate}
                onChange={(_, value) => _onchange("heartRate" ,value, "Chua dung dinh dang")}
              />
              <div className="unit">bpm</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Nhiệt độ:" 
                underlined 
                required 
                placeholder="--"
                errorMessage={errorMessage.temperature}
                value={currentState.temperature}
                onChange={(_, value) => _onchange("temperature" ,value, "Chua dung dinh dang")}
              />
              <div className="unit">°C</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Huyết áp:" 
                underlined 
                required 
                placeholder="--"
                errorMessage={errorMessage.bloodPressure}
                value={currentState.bloodPressure}
                onChange={(_, value) => _onchange("bloodPressure" ,value, "Chua dung dinh dang")}
              />
              <div className="unit">mmHg</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Đường huyết:" 
                underlined 
                required 
                placeholder="--"
                errorMessage={errorMessage.glucose}
                value={currentState.glucose}
                onChange={(_, value) => _onchange("glucose" ,value, "Chua dung dinh dang")}
              />
              <div className="unit">mg/dl</div>
            </div>
            <div className="content-section-input width100per">
              <TextField 
                label="Triệu chứng ban đầu"  
                underlined
                placeholder="--"
                errorMessage={errorMessage.symptom}
                value={currentState.symptom}
                onChange={(_, value) => _onchange("symptom" ,value, "Chua dung dinh dang")}
              />
            </div>
          </div>
        </div>
        {testResult.length > 0 && <div className="section">
          <div className="header-section">Kết quả xét nghiệm</div>
          <div className="content-section"></div>
        </div>}
        <div className="section">
          <div className="header-section">Kết luận</div>
          <div className="content-section">
            <div className="content-section-input width50per">
              {/* <Picker/> */}
            </div>
            <div className="content-section-input width50per">
              <TextField 
                label="Ghi chú" 
                required 
                multiline
                placeholder="--" 
                errorMessage={errorMessage.note}
                value={currentState.note}
                onChange={(_, value) => _onchange("note" ,value, "Chua dung dinh dang")}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  const secondStep = (): JSX.Element => {

    return (
      <>
        <div className="section">
          <div className="header-section">Kê đơn thuốc</div>
          <div className="content-section">
            <div className="content-section-input width50per">
              {/* <Picker/> */}
            </div>
            <div className="content-section-input width50per">
              <TextField 
                label="Ghi chú" 
                required 
                multiline
                placeholder="--"
                errorMessage={errorMessage.note2}
                value={currentState.note2}
                onChange={(_, value) => onChangeCurrentState("note2" ,value)}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderContent = (): JSX.Element => {
    switch (currentStep) {
      case 0:
        return firstStep();
      case 1:
        return secondStep()
    }
  }

  const renderFooter = (): JSX.Element => {
    const testDialogButton = <PrimaryButton text="Xét nghiệm" onClick={() => setDialogTestingClosed(false)}/>
    const nextButton = <PrimaryButton text="Tiếp theo" onClick={handleNext}/>
    const backButton = <DefaultButton text="Quay lại" onClick={handleBack} />
    const submitButton = <PrimaryButton text="Hoàn thành" onClick={handleSubmit}/>
    const onbroadingButton = <PrimaryButton text="Yêu cầu nhập viện" onClick={() => setDialogOnbroadingClosed(false)}/>

    switch (currentStep) {
      case 0:
        return <>
          {onbroadingButton}
          {testDialogButton}
          {nextButton}
        </>
      case 1:
        return <>
          {backButton}
          {submitButton}
        </>
    }
  }

  const handleChangeCheckTest = (key: TypeOfTest) => {
    let items = [...selectedTest];
    if(selectedTest.length === 0){
        items.push(key)
    } 
    else {
        const index = selectedTest.findIndex((item) => item == key);            
        if(index === -1){                
            items.push(key)
        }
        else {                
            items.splice(index, 1);                
        }
    }
    items.sort();
    setSelectedTest(items);
  }

  const renderTestList = () => {
    return(
        <>
        {
            TestList.map((item) => (
                <Checkbox
                    key={item.key}
                    label={item.text}
                    onChange={(ev, checked) => {
                        handleChangeCheckTest(item.key);
                    }}
                />
            ))
        }
        </>
    )
}

  return (  
    <Modal
      className="modal-process-container"
      isOpen={props.isOpen}
      onDismiss={props.onDismiss}
      isBlocking={true}
    >
      <div className="modal-wrapper">
        <div className="modeal-header">
          Khám bệnh
        </div>
        <div className="modeal-content">
          {renderContent()}
        </div>
        <div className="modeal-footer">
          {renderFooter()}
        </div>
      </div>

      {/*  */}
      <Dialog
          hidden={dialogTestingClosed}
          onDismiss={() => setDialogTestingClosed(true)}
          dialogContentProps={{ title: 'Chọn loại xét nghiệm' }}
          maxWidth={'480px'}
          minWidth={'480px'}
          modalProps={{ isBlocking: true }}
      >
          {renderTestList()}
          <DialogFooter>
              <DefaultButton text='Hủy' onClick={() => setDialogTestingClosed(true)} />
              <PrimaryButton text='Xác nhận' onClick={() => handleTestConfirm()} />
          </DialogFooter>
      </Dialog>
      {/*  */}
      <Dialog
        hidden={dialogOnbroadingClosed}
        onDismiss={() => setDialogOnbroadingClosed(true)}
        dialogContentProps={{ title: 'Xác nhận cho bệnh nhân nhập viện' }}
        modalProps={{ isBlocking: true }}
        
      >
        <DialogFooter>
              <DefaultButton text='Hủy' onClick={() => setDialogOnbroadingClosed(true)} />
              <PrimaryButton text='Xác nhận' onClick={() => alert("confirm")} />
          </DialogFooter>
      </Dialog>
    </Modal>
  );
}

export default NormalProgress;