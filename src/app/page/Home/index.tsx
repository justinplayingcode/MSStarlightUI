import { useDispatch, useSelector } from "react-redux";
import './index.scss'
import { accountRole } from "model";
import { Convert } from "utils";
import { RootState } from "src/redux/store";
import { basicKeyValueRender } from "src/utils/utils";
import DoctorManagementChart from "./components/adminChart/doctormanagement";
import OnBoardingChart from "./components/adminChart/onboardingpermonth";
import PatientManagementChart from "./components/adminChart/patientmanagement";
import PatientExaminedChart from "./components/adminChart/patientexaminedperday";
import { LinkButton } from "src/app/common/Link";
import { useNavigate } from "react-router-dom";
import DoctorHome from "./components/Doctor";

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
        return <DoctorHome/>;
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