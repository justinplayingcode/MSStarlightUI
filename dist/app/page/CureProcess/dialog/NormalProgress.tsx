import { Checkbox, ChoiceGroup, DefaultButton, Dialog, DialogFooter, IChoiceGroupOption, IPersonaProps, Icon, IconButton, Modal, PrimaryButton, TextField } from "@fluentui/react";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useState, useEffect } from "react";
import { basicKeyValueRender } from "src/utils/utils";
import { Convert, Validate } from "utils";
import { TestList } from "src/model/doctorModel";
import { Onboarding, TypeOfTest, toastType } from "src/model/enum";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading, showToastMessage, tableRefresh } from "src/redux/reducers";
import Api from "api";
import Picker from "../../../common/Picker";

interface ITestResult {
  service: TypeOfTest,
  reason: string,
  detailFile: string
}

interface INormalProgressPorops {
  isOpen: boolean,
  onDismiss: () => void,
  historyAppointment: any;
  testresult: ITestResult[];
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
  diseases: string;
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
  onBoarding: Onboarding;
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
  diseases: ""
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
  onBoarding: 0
}

function NormalProgress({ ...props }: INormalProgressPorops) {
  const { tableSelectedItem } = useSelector((state: RootState) => state.currentSelected)
  const { info } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();

  const [dialogTestingClosed, setDialogTestingClosed] = useState<boolean>(true);
  const [dialogOnbroadingClosed, setDialogOnbroadingClosed] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedTest, setSelectedTest] = useState<any[]>([]);
  const [currentState, setCurrentState] = useState<ICurrentState>(initState);
  const [errorMessage, setErrorMessage] = useState<IErrorMessage>(initErrorMessage);
  const [servicedTest, setServiceTest] = useState<any[]>([]);
  const [diseases, setDiseases] = useState<IPersonaProps[]>([]);
  const [medication, setMedication] = useState<IPersonaProps[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string>(null);

  useEffect(() => {
    const healthIndicator = props.historyAppointment?.healthIndicator;
    const updateState: ICurrentState = {
      height: healthIndicator?.height || "",
      weight: healthIndicator?.weight || "",
      heartRate: healthIndicator?.heartRate || "",
      temperature: healthIndicator?.temperature || "",
      bloodPressure: !!(healthIndicator?.bloodPressureSystolic && healthIndicator?.bloodPressureDiastolic) ? `${healthIndicator?.bloodPressureSystolic}/${healthIndicator?.bloodPressureDiastolic}` : "",
      glucose: healthIndicator?.glucose || "",
      symptom: tableSelectedItem[0]?.initialSymptom || "",
      note: "",
      note2: "",
      onBoarding: 0
    }
    setCurrentState(updateState);
  }, [props.historyAppointment])

  useEffect(() => {
    if(props.isOpen === true) {
      setCurrentStep(0);
    }
  }, [props.isOpen])

  const handleOnDisMissDialog = () => {
    setCurrentState(initState);
    setDiseases([]);
    setMedication([]);
    setErrorMessage(initErrorMessage)
  }

  const handleNext = () => {
    if(!Validate.isDecimal(currentState.height)) {
      setErrorMessage({ ...errorMessage, height: "Chưa đúng định dạng, ví dụ: 160" })
      return;
    }
    if(!Validate.isDecimal(currentState.weight)) {
      setErrorMessage({ ...errorMessage, weight: "Chưa đúng định dạng, ví dụ: 50" })
      return;
    }
    if(!Validate.isDecimal(currentState.heartRate)) {
      setErrorMessage({ ...errorMessage, heartRate: "Chưa đúng định dạng, ví dụ: 60" })
      return;
    }
    if(!Validate.isDecimal(currentState.temperature)) {
      setErrorMessage({ ...errorMessage, temperature: "Chưa đúng định dạng, ví dụ: 36 hoặc 36.5" })
      return;
    }
    if(!Validate.isDecimal(currentState.glucose)) {
      setErrorMessage({ ...errorMessage, glucose: "Chưa đúng định dạng, ví dụ: 4 hoặc 4.5 hoặc 4.55" })
      return;
    }
    if(!Validate.bloodPressure(currentState.bloodPressure)) {
      setErrorMessage({ ...errorMessage, height: "Chưa đúng định dạng, ví dụ: 120/80" })
      return;
    }
    if(currentState.note.length === 0) {
      setErrorMessage({ ...errorMessage, note: "Vui lòng không để trống" })
      return;
    }
    if(currentState.symptom.length === 0) {
      setErrorMessage({ ...errorMessage, symptom: "Vui lòng không để trống" })
      return;
    }
    if(diseases.length === 0) {
      setErrorMessage({ ...errorMessage, diseases: "Vui lòng không để trống" })
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleTestConfirm = () => { 
    const bloodPressureAray = currentState.bloodPressure.split("/");
    const body = {
      testservices: selectedTest,
      appointmentScheduleId: tableSelectedItem[0]._id,
      height: currentState.height,
      weight: currentState.weight,
      heartRate: currentState.heartRate,
      temperature: currentState.temperature,
      glucose: currentState.glucose,
      bloodPressureDiastolic: bloodPressureAray[1], 
      bloodPressureSystolic: bloodPressureAray[0],
      initialSymptom: currentState.symptom,
      historyId: props.historyAppointment?._id,
    }
    dispatch(openLoading());
    Api.scheduleApi.testingRequest(body).then(data => {
      if(!data.status) {
        dispatch(showToastMessage({message: 'Thành công gửi yêu cầu xét nghiệm cho bệnh nhân', type: toastType.succes}));
        setDialogTestingClosed(true);
        handleOnDisMissDialog(); // reset when call api send request success
        props.onDismiss();
        dispatch(tableRefresh());
      } else {
        dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
      }
    }).catch(() => dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error})))
    .finally(() => dispatch(closeLoading()))
  }

  const validateInput = (key, value, messageErr) => {
    switch(key) {
      case 'height':
        setErrorMessage({ ...errorMessage, [key]: !Validate.isDecimal(value) ? messageErr : ""})
        break;
      case 'weight':
        setErrorMessage({ ...errorMessage, [key]: !Validate.isDecimal(value) ? messageErr : ""})
        break;
      case 'heartRate':
        setErrorMessage({ ...errorMessage, [key]: !Validate.isDecimal(value) ? messageErr : ""})
        break;
      case 'temperature':
        setErrorMessage({ ...errorMessage, [key]: !Validate.isDecimal(value) ? messageErr : ""})
        break;
      case 'bloodPressure':
        setErrorMessage({ ...errorMessage, [key]: !Validate.bloodPressure(value) ? messageErr : ""})
        break;
      case 'glucose':
        setErrorMessage({ ...errorMessage, [key]: !Validate.isDecimal(value) ? messageErr : ""})
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

  const handleOpenModel = (image: string) => {
    setResultImage(image)
    setIsModalOpen(true)
  }

  const onRenderTestResult = (item) => {
    return (
      <div className="content-section" style={{width: "50%"}}>
        <div className="content-test-result">
          <div className="content-test-result-title">
            <div className="content-test-result-service">{TestList[item.service]}</div>
            <DefaultButton className="content-test-result-download"
            onClick={() => handleOpenModel(item.detailsFileCloud)}>
              Chi tiết<Icon iconName= 'QuestionnaireMirrored' />
            </DefaultButton>
          </div>
          <div className="content-test-result-reason">{item.reason}</div>
        </div>
      </div>
    )
  }

  const firstStep = (): JSX.Element => {
    const mappingValues = (datas) => {
      const values = datas.map(e => {
        return {
          displayName: e.diseasesName,
          text: e.diseasesName,
          secondaryText: e.symptom,
          id: e._id,
          prevention: e.prevention
        }
      })
      return values
    }
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
                placeholder="..." 
                errorMessage={errorMessage.height}
                value={currentState.height}
                onChange={(_, value) => _onchange("height" ,value, "Chưa đúng định dạng số")}
              />
              <div className="unit">cm</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Cân nặng:" 
                underlined 
                required 
                placeholder="..."
                errorMessage={errorMessage.weight}
                value={currentState.weight}
                onChange={(_, value) => _onchange("weight" ,value, "Chưa đúng định dạng số")}
              />
              <div className="unit">kg</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Nhịp tim:" 
                underlined 
                required 
                placeholder="..."
                errorMessage={errorMessage.heartRate}
                value={currentState.heartRate}
                onChange={(_, value) => _onchange("heartRate" ,value, "Chưa đúng định dạng số")}
              />
              <div className="unit">bpm</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Nhiệt độ:" 
                underlined 
                required 
                placeholder="..."
                errorMessage={errorMessage.temperature}
                value={currentState.temperature}
                onChange={(_, value) => _onchange("temperature" ,value, "Chưa đúng định dạng số")}
              />
              <div className="unit">°C</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Huyết áp:" 
                underlined 
                required 
                placeholder="..."
                errorMessage={errorMessage.bloodPressure}
                value={currentState.bloodPressure}
                onChange={(_, value) => _onchange("bloodPressure" ,value, "Chưa đúng định dạng, ví dụ: 120/80")}
              />
              <div className="unit">mmHg</div>
            </div>
            <div className="content-section-input">
              <TextField 
                label="Đường huyết:" 
                underlined 
                required 
                placeholder="..."
                errorMessage={errorMessage.glucose}
                value={currentState.glucose}
                onChange={(_, value) => _onchange("glucose" ,value, "Chưa đúng định dạng số")}
              />
              <div className="unit">mg/dl</div>
            </div>
            <div className="content-section-input width100per">
              <TextField 
                label="Triệu chứng ban đầu"  
                underlined
                placeholder="..."
                errorMessage={errorMessage.symptom}
                value={currentState.symptom}
                onChange={(_, value) => _onchange("symptom" ,value, "Chưa đúng định dạng số")}
              />
            </div>
          </div>
        </div>
        {
          (props.testresult || []).length > 0 && 
            <div className="section">
              <div className="header-section">Kết quả xét nghiệm</div>
                {
                  props.testresult.map(item => onRenderTestResult(item))
                }
            </div>
        }
        <div className="section">
          <div className="header-section">Kết luận</div>
          <div className="content-section">
            <div className="content-section-input width100per">
            <Picker
              label={"Chuẩn đoán bệnh: "}
              onChangeCallBack={(value) => {setDiseases(value); setErrorMessage({...errorMessage, diseases: "" })}}
              value={diseases}
              integrateItems={Api.diseasesApi.pickerDiseases}
              mappingValues={mappingValues}
              placeholder={"Nhập tên bệnh"}
            />
            <span className="common-error">{errorMessage.diseases}</span>
            </div>
            <div className="content-section-input width100per">
              <TextField 
                label="Ghi chú" 
                required 
                multiline
                placeholder="..." 
                errorMessage={errorMessage.note}
                value={currentState.note}
                onChange={(_, value) => _onchange("note" ,value, "Chưa đúng định dạng số")}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  const secondStep = (): JSX.Element => {
    const mappingValues = (datas) => {
      const values = datas.map(e => {
        return {
          displayName: e.name,
          text: e.name,
          secondaryText: e.designation,
          id: e._id,
          usage: e.usage
        }
      })
      return values
    }
    return (
      <>
        <div className="section">
          <div className="header-section">Kê đơn thuốc</div>
          <div className="content-section medication">
            <div className="content-section-input width100per">
              <Picker
                label={"Chọn thuốc: "}
                onChangeCallBack={(value) => setMedication(value)}
                value={medication}
                integrateItems={Api.medicationApi.pickerMedication}
                mappingValues={mappingValues}
                placeholder="Nhập tên thuốc"
              />
            </div>
            <div className="content-section-input width100per">
              <TextField 
                label="Ghi chú" 
                required 
                multiline
                placeholder="..."
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

  const handleTestingBtn = () => {
    if(!Validate.isDecimal(currentState.height)) {
      setErrorMessage({ ...errorMessage, height: "Chưa đúng định dạng, ví dụ: 160" })
      return;
    }
    if(!Validate.isDecimal(currentState.weight)) {
      setErrorMessage({ ...errorMessage, weight: "Chưa đúng định dạng, ví dụ: 50" })
      return;
    }
    if(!Validate.isDecimal(currentState.heartRate)) {
      setErrorMessage({ ...errorMessage, heartRate: "Chưa đúng định dạng, ví dụ: 60" })
      return;
    }
    if(!Validate.isDecimal(currentState.temperature)) {
      setErrorMessage({ ...errorMessage, temperature: "Chưa đúng định dạng, ví dụ: 36 hoặc 36.5" })
      return;
    }
    if(!Validate.isDecimal(currentState.glucose)) {
      setErrorMessage({ ...errorMessage, glucose: "Chưa đúng định dạng, ví dụ: 4 hoặc 4.5 hoặc 4.55" })
      return;
    }
    if(!Validate.bloodPressure(currentState.bloodPressure)) {
      setErrorMessage({ ...errorMessage, height: "Chưa đúng định dạng, ví dụ: 120/80" })
      return;
    }
    if(currentState.symptom.length === 0) {
      setErrorMessage({ ...errorMessage, symptom: "Vui lòng không để trống" })
      return;
    }
    dispatch(openLoading());
    Api.scheduleApi.getAllTestService().then(data => {
      if(!data.status) {
        const results = (data.data as any[]).map(e => {
          return {
            key: e._id,
            displayName: TestList[e.service],
          }
        })
        setServiceTest(results);
        setDialogTestingClosed(false)
      } else {
        dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
      }
    }).catch(() => dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}))).finally(() => dispatch(closeLoading()));
  }

  const handleSubmit = () => {
    const bloodPressureAray = currentState.bloodPressure.split("/");
    const body = {
      id: tableSelectedItem[0]._id,
      historyId: props.historyAppointment._id,
      medicationId: medication.map(item => item.id),
      diagnosis: diseases.map(item => item.id),
      summary: currentState.note,
      note: currentState.note2,
      boardingStatus: currentState.onBoarding,
      heartRate: currentState.heartRate,
      temperature: currentState.temperature,
      bloodPressureSystolic: bloodPressureAray[0],
      bloodPressureDiastolic: bloodPressureAray[1],
      height: currentState.height,
      weight: currentState.weight,
      glucose: currentState.glucose,
      patientId: tableSelectedItem[0].patientId,
      departmentId: info.departmentId
    }
    dispatch(openLoading());
    Api.scheduleApi.done(body).then(data => {
      if(!data.status) {
        dispatch(showToastMessage({message: 'Hoàn thành khám bệnh cho bệnh nhân', type: toastType.succes}));
        setDialogOnbroadingClosed(true);
        props.onDismiss();
        handleOnDisMissDialog();
        dispatch(tableRefresh());
      } else {
        dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
      }
    }).catch(() => dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error})))
    .finally(() => dispatch(closeLoading()))
  }

  const renderFooter = (): JSX.Element => {
    const testDialogButton = <PrimaryButton text="Xét nghiệm" onClick={handleTestingBtn}/>
    const nextButton = <PrimaryButton text="Tiếp theo" onClick={handleNext}/>
    const backButton = <DefaultButton text="Quay lại" onClick={handleBack} />
    const submitButton = <PrimaryButton text="Hoàn thành" onClick={() => { setDialogOnbroadingClosed(false); onChangeCurrentState("onBoarding", 1) }}/>

    switch (currentStep) {
      case 0:
        return <>
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
            servicedTest.map((item) => (
                <Checkbox
                    key={item.key}
                    label={item.displayName}
                    onChange={(ev, checked) => {
                        handleChangeCheckTest(item.key);
                    }}
                    className="testing-request-dialog"
                />
            ))
        }
        </>
    )
  }

  const onChangeOnboarding = (_, option) => {
    onChangeCurrentState("onBoarding", Number(option.key))
  }

  const contentOnBoarding = () => {
    const options: IChoiceGroupOption[] = [
      { key: (Onboarding.none).toString(), text: 'Không' },
      { key: (Onboarding.inpatient).toString(), text: 'Nội trú' },
      { key: (Onboarding.outpatient).toString(), text: 'Ngoại trú' },
    ];

    return (
      <>
        <ChoiceGroup defaultSelectedKey={(Onboarding.none).toString()} options={options} onChange={onChangeOnboarding} label={`Yêu cầu bệnh nhân ${tableSelectedItem[0]?.fullname || ""} nhập viện`} required={true} />
      </>
    )
  }

  const renderContentModal = ():JSX.Element => {
    return (
      <div className="modal-cure-history-wrapper">
        <div className="modal-cure-history-content">
          <div className="modal-cure-history-image"
            style={{backgroundImage: `url(${resultImage})`}}
          ></div>
        </div>
        <IconButton
            className="modal-cure-history-btn-dismiss"
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Close popup modal"
            onClick={() => setIsModalOpen(false)}
          />
      </div>
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
              <PrimaryButton text='Xác nhận' onClick={handleTestConfirm} disabled={selectedTest.length === 0} />
          </DialogFooter>
      </Dialog>
      <Dialog
        hidden={dialogOnbroadingClosed}
        onDismiss={() => { setDialogOnbroadingClosed(true); onChangeCurrentState("onBoarding", 0)}}
        modalProps={{ isBlocking: true }}
      >
        {contentOnBoarding()}
        <DialogFooter>
              <DefaultButton text='Hủy' onClick={() => { setDialogOnbroadingClosed(true); onChangeCurrentState("onBoarding", 0)}} />
              <PrimaryButton text='Xác nhận' onClick={handleSubmit} />
          </DialogFooter>
      </Dialog>
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        isBlocking={false}
        className="modal-cure-history-test-result"
      >
        {renderContentModal()}
      </Modal>
    </Modal>
  );
}

export default NormalProgress;
