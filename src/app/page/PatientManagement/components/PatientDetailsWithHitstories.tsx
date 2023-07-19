import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading, showToastMessage } from "src/redux/reducers";
import Api from "api";
import { MappingTypeAppointmentSchedule, toastType } from "src/model/enum";
import { basicKeyValueRender } from "src/utils/utils";
import { Convert } from "utils";
import UniformSection from "src/app/common/Section";
import { LinkButton } from "src/app/common/Link";


function PatientDetailsWithHitories() {
  const { id: patientId } = useParams();
  const [currentState, setCurrentState] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getInformation();
  }, [])

  const getInformation = () => {
    dispatch(openLoading());
    Api.historyMedicalApi.getDetailsPatient(patientId).then(data => {
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

  const renderHealthIndicator = (): JSX.Element => {
    return (
      <>
        {basicKeyValueRender("Chiều cao", `${currentState?.height} cm`)}
        {basicKeyValueRender("Cân nặng", `${currentState?.weight} kg`)}
        {basicKeyValueRender("Nhiệt độ", `${currentState?.temperature} °C`)}
        {basicKeyValueRender("Nhịp tim", `${currentState?.heartRate} bpm`)}
        {basicKeyValueRender("Huyết áp", `${currentState?.bloodPressureSystolic}/${currentState?.bloodPressureDiastolic} mmHg`)}
        {basicKeyValueRender("Đường huyết", `${currentState?.glucose} mg/dl`)}
      </>
    )
  }

  const renderHistories = (): JSX.Element => {
    return (
      <>
        {currentState?.schedules.map((e, index) => {
          return (
            <div key={index} className="patient-management-history">
              {basicKeyValueRender("Ngày khám", e?.appointmentDate)}
              {basicKeyValueRender("Loại", MappingTypeAppointmentSchedule[e?.typeAppointment])}
              <LinkButton className="name-viewed" navigate={`/patient-management-doctor/details/historymedical/${e.id}`}>Chi tiết</LinkButton>
            </div>
          )
        })}
      </>
    )
  }

  return (  
    <div className='wrapper-content patient-management-details'>
      <div className='wrapper-content-inner patient-management-wrapper'>
        <div className="patient-management-header">Thông tin bệnh nhân</div>
        <div className="patient-management-content">
          <UniformSection
            headerTitle="Thông tin cơ bản"
            elementInner={renderInfoPatient()}
            className="patient-management-item"
          />
          <UniformSection
            headerTitle="Chỉ số sức khỏe"
            elementInner={renderHealthIndicator()}
            className="patient-management-item"
          />
          <UniformSection
            headerTitle="Lịch sử khám bệnh gần nhất"
            elementInner={renderHistories()}
            className="patient-management-item"
          />
        </div>
      </div>
    </div>
  );
}

export default PatientDetailsWithHitories;