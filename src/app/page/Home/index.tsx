import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoading, closeLoading, setInfoUser } from "src/redux/reducers";
import './index.scss'
import { accountRole } from "model";
import { Convert } from "utils";
import Api from "src/api";
import { RootState } from "src/redux/store";
import image from "image";
import { basicKeyValueRender, tooltipPlainText } from "src/utils/utils";
import DoctorManagementChart from "./components/adminChart/doctormanagement";
import OnBoardingChart from "./components/adminChart/onboardingpermonth";
import PatientManagementChart from "./components/adminChart/patientmanagement";
import PatientExaminedChart from "./components/adminChart/patientexaminedperday";
import { LinkButton } from "src/app/common/Link";
import { useNavigate } from "react-router-dom";

interface IHealthStatus {
  key: string;
  value: any;
}


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { info, role } = useSelector((state:RootState) => state.user);
  
  const onRenderAdmin = (): JSX.Element => {
    return (
      <>
      <div className="chart-container-wrapper chart-container">
        <PatientExaminedChart/>
      </div>
      <div className="chart-container-wrapper chart-container">
        <OnBoardingChart/>
      </div>
      <div className="chart-container-wrapper chart-container">
        <DoctorManagementChart/>
      </div>
      <div className="chart-container-wrapper chart-container">
        <PatientManagementChart/>
      </div>
      </>
    )
  }

  const onRenderDoctor = (): JSX.Element => {
    return (
      <>
        <div className="doctor-section-container container1">
          <div className="doctor-section">
            <div className="date">{Convert.getCurrentDateString()}</div>
            <hr/>
            <div className="infomation">{info?.department}</div>
            <div className="infomation">{Convert.getDoctorPosition(info?.position)}: {info?.fullname}</div>
            <LinkButton className="details" onClick={() => navigate('/profile')}>Thông tin cá nhân</LinkButton>
          </div>
          <div className="doctor-section">
            <div className="title">Số lịch hẹn khám hôm nay:</div>
            <div className="total">2</div>
            <LinkButton className="details" onClick={() => alert('navigate to /henlichkham')}>Chi tiết</LinkButton>
          </div>
          <div className="doctor-section">
            <div className="title">Bệnh nhân đang điều trị tại khoa:</div>
            <div className="total">20</div>
            <LinkButton className="details" onClick={() => alert('navigate to /tablebenhnhannamvien')}>Chi tiết</LinkButton>
          </div>

          <div className="doctor-section">
            <div className="title">Bệnh nhân khám tại khoa trong ngày:</div>
            <div className="total">40</div>
            <LinkButton className="details" onClick={() => alert('navigate to /lichsukham')}>Chi tiết</LinkButton>
          </div>
        </div>
        {/*  */}
        <div className="chart-container-wrapper chart-container">
          <DoctorManagementChart/> {/* thay đôi sau */}
        </div>
        <div className="chart-container-wrapper chart-container">
          <PatientManagementChart/> {/* thay đôi sau */}
        </div>
      </>
    )
  }

  const onRenderPatient = (): JSX.Element => {
    const displayValue = (value) => value === 0 ? "--" : value;

    const healthStatus: IHealthStatus[] = [
      {
        key: 'Nhịp tim',
        value: `${displayValue(info?.heartRate)} bpm`,
      },
      {
        key: 'Nhiệt độ cơ thể',
        value: `${displayValue(info?.temperature)} °C`,
      },
      {
        key: 'Huyết áp',
        value: `${displayValue(info?.bloodPressureSystolic)}/${displayValue(info?.bloodPressureDiastolic)} mmHg`,
      },
      {
        key: 'Đường huyết',
        value: `${displayValue(info?.glucose)} mg/dl`,
      }
    ]

    return (
      <>
        <div className="patient-section-container section1">
          <div className="patient-section"></div>
          <div className="patient-section"></div>
        </div>
        <div className="patient-section-container section2">
          <div className="patient-section">
            <div className="patient-section-header">
              <div  className="title">
                Theo dõi sức khỏe
              </div>
              <LinkButton onClick={() => navigate('/news')}>Thông tin, tư vấn về sức khỏe</LinkButton>
            </div>
            <div className="patient-section-content">
              <div className="text">Chiều cao: {info?.weight === 0 ? "--" : info?.weight} cm</div>
              <div className="text">Cân nặng: {info?.height === 0 ? "--" : info?.height} kg</div>
              <div className="health">
                <div className="title">Các chỉ số quan trọng của cơ thể</div>
                <div className="heath-items">
                  {healthStatus.map(item => basicKeyValueRender(item.key, item.value))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const onRenderContent = (): JSX.Element => {
    switch(role) {
      case accountRole.Admin:
        return onRenderAdmin();
      case accountRole.Doctor:
        return onRenderDoctor();
      case accountRole.Patient:
        return onRenderPatient();
    }
  }

  return (
    <div className="home-wrapper">
      <div className="content">{onRenderContent()}</div>
    </div>
  )
}

export default Home