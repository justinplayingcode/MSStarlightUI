import UniformSection from "src/app/common/Section";
import "./index.scss"
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { accountRole } from "model";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading, showToastMessage } from "src/redux/reducers";
import Api from "api";
import { MappingTypeAppointmentSchedule, toastType } from "src/model/enum";
import { basicKeyValueRender } from "src/utils/utils";
import { Convert } from "utils";
import { DefaultButton, Icon, IconButton, Modal } from "@fluentui/react";
import { TestList } from "src/model/doctorModel";

function DetailsCureHistory() {
  const { id: scheduleId } = useParams();
  const { role } = useSelector((state: RootState) => state.user);
  const [currentState, setCurrentState] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string>(null);

  useEffect(() => {
    getInformation();
  }, [])

  const getInformation = () => {
    dispatch(openLoading());
    Api.historyMedicalApi.getDetails(scheduleId).then(data => {
      if(data.status) {
        dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
        navigate(-1);
      } else {
        setCurrentState(data.data);
      }
    }).catch(() => {
      dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
      navigate(-1);
    }).finally(() => dispatch(closeLoading()))
  }

  const renderInfoSchedule = (): JSX.Element => {
    return (
      <>
        {basicKeyValueRender("Ngày khám", currentState?.appointmentDate)}
        {basicKeyValueRender("Kiểu khám", MappingTypeAppointmentSchedule[currentState?.typeAppointment])}
        {basicKeyValueRender("Khoa", currentState?.departmentName)}
        {basicKeyValueRender("Triệu chứng ban đầu", currentState?.initialSymptom)}
      </>
    )
  }

  const renderInfoPatient = (): JSX.Element => {
    return (
      <>
        {basicKeyValueRender("Họ và tên", currentState?.fullname)}
        {basicKeyValueRender("Ngày sinh", currentState?.dateOfBirth)}
        {basicKeyValueRender("Giới tính", Convert.convertGender(currentState?.gender))}
        {basicKeyValueRender("Địa chỉ", currentState?.address)}
        {basicKeyValueRender("Số điện thoại", currentState?.phonenumber)}
        {basicKeyValueRender("Email", currentState?.email)}
        {basicKeyValueRender("Số thẻ BHYT", currentState?.insurance)}
        {basicKeyValueRender("CCCD/CMND", currentState?.identification)}
      </>
    )
  }

  const renderInfoDoctor = (): JSX.Element => {
    return (
      <>
        {basicKeyValueRender("Họ và tên", currentState?.fullname)}
        {basicKeyValueRender("Chức vụ", Convert.getDoctorPosition(currentState?.position))}
        {basicKeyValueRender("Trình độ", Convert.getDoctorRank(currentState?.rank))}
        {basicKeyValueRender("Email", currentState?.email)}
        {basicKeyValueRender("Số điện thoại", currentState?.phonenumber)}
      </>
    )
  }

  const renderHealthIndicator = (): JSX.Element => {
    return (
      <>
        {basicKeyValueRender("Chiều cao", `${currentState?.healthIndicator?.height} cm`)}
        {basicKeyValueRender("Cân nặng", `${currentState?.healthIndicator?.weight} kg`)}
        {basicKeyValueRender("Nhiệt độ", `${currentState?.healthIndicator?.temperature} °C`)}
        {basicKeyValueRender("Nhịp tim", `${currentState?.healthIndicator?.heartRate} bpm`)}
        {basicKeyValueRender("Huyết áp", `${currentState?.healthIndicator?.bloodPressureSystolic}/${currentState?.healthIndicator?.bloodPressureDiastolic} mmHg`)}
        {basicKeyValueRender("Đường huyết", `${currentState?.healthIndicator?.glucose} mg/dl`)}
      </>
    )
  }

  const renderTestResult = (): JSX.Element => {
    if(currentState?.testResult?.length > 0) {
      let element = currentState?.testResult.map((e,i) => {
        return (
          <div className="content-section" key={i}>
            <div className="content-test-result">
              <div className="content-test-result-title">
                <div className="content-test-result-service">{TestList[e.service]}</div>
                <DefaultButton 
                  className="content-test-result-download"
                  onClick={() => handleOpenModel(e.detailsFileCloud)}
                >Chi tiết<Icon iconName= 'QuestionnaireMirrored' />
                </DefaultButton>
              </div>
              <div className="content-test-result-reason">{e.reason}</div>
            </div>
          </div>
        )
      })
      return <UniformSection
          headerTitle="Kết quả xét nghiệm"
          elementInner={element}
          className="cure-details-content-item"
        />
    } else {
      return <></>
    }
  }

  const handleOpenModel = (image: string) => {
    setResultImage(image)
    setIsModalOpen(true)
  }

  const renderSummary = (): JSX.Element => {
    return <>
        {currentState?.diseases.map((e,i) => {
          return basicKeyValueRender("Tên bệnh", e.diseasesName, i)
        })}
    </>
  }

  const renderMedication = (): JSX.Element => {
    return <>
      {currentState?.medication.map((e,i) => {
        return basicKeyValueRender("Tên thuốc", e.name, i)
      })}
      {basicKeyValueRender("Ghi chú", currentState?.note)}
    </>
  }

  const renderNote = ():JSX.Element => {
    return <>
      {basicKeyValueRender("Chỉ định", currentState?.summary)}
    </>
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
    <div className='wrapper-content cure-details'>
      <div className='wrapper-content-inner cure-details-wrapper'>
        <div className="cure-details-header">Thông tin khám bệnh</div>
        <div className="cure-details-content">
          <UniformSection
            headerTitle="Thông tin lịch khám"
            elementInner={renderInfoSchedule()}
            className="cure-details-content-item"
          />
          <UniformSection
            headerTitle={role === accountRole.Doctor ? "Thông tin bệnh nhân" : "Thông tin bác sĩ khám bệnh"}
            elementInner={role === accountRole.Doctor ? renderInfoPatient() : renderInfoDoctor()}
            className="cure-details-content-item"
          />
          <UniformSection
            headerTitle="Tình trạng sức khỏe"
            elementInner={renderHealthIndicator()}
            className="cure-details-content-item"
          />
          {renderTestResult()}
          <UniformSection
            headerTitle="Chuẩn đoán"
            elementInner={renderSummary()}
            className="cure-details-content-item"
          />
          <UniformSection
            headerTitle="Kết luận"
            elementInner={renderNote()}
            className="cure-details-content-item"
          />
          <UniformSection
            headerTitle="Đơn thuốc"
            elementInner={renderMedication()}
            className="cure-details-content-item"
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        isBlocking={false}
        className="modal-cure-history-test-result"
      >
        {renderContentModal()}
      </Modal>
    </div>
  );
}

export default DetailsCureHistory;