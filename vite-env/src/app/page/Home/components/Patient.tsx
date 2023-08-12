import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { LinkButton } from "../../../common/Link";
import { Convert } from "../../../../utils";

interface IHealthStatus {
  key: string;
  value: any;
}

function PatientHome() {
  const { info } = useSelector((state:RootState) => state.user);
  const navigate = useNavigate();
  const displayValue = (value: any) => value === 0 ? "--" : value;
  const healthStatus: IHealthStatus[] = [
    {
      key: 'Chiều cao',
      value: `${displayValue(info?.height)} cm`,
    },
    {
      key: 'Cân nặng',
      value: `${displayValue(info?.weight)} kg`,
    },
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
    <div id="patient-home">
      <div className="information" style={{background: "url(https://res.cloudinary.com/justinpham311/image/upload/v1689434345/benhvien/critical-care-hospital-in-bangalore_zips7p.webp)", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="information-welcome">Chào mừng quay lại hệ thống</div>
        <div className="information-first">
          <div>
            <div className="information-text"><div>Xin chào:</div>{info?.fullname}</div>
            <div className="information-text"><div>Ngày sinh:</div>{info?.dateOfBirth}</div>
            <div className="information-text"><div>Địa chỉ:</div>{info?.address}</div>
          </div>
        </div>
        <div className="information-second">
          <LinkButton style={{color: "#fff"}} onClick={() => navigate('/home/profile')}>Thông tin cá nhân</LinkButton>
        </div>
      </div>
      <div className="schedule">
        <div className="schedule-date">{Convert.getCurrentDateString()}</div>
        <div className="schedule-content">
          <div className="schedule-details">
            <div className="schedule-details-text flexrow">
              <div className="schedule-details-title">Lịch hẹn khám bệnh hôm nay</div>
            </div>          
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/make-appointment')}>Chi tiết</LinkButton>
            </div>
          </div>
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Lịch sử khám bệnh</div>
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/schedulehistory')}>Chi tiết</LinkButton>   
            </div>
          </div>
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Hẹn lịch khám bệnh với bác sĩ</div>
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/make-appointment')}>Chi tiết</LinkButton>   
            </div>
          </div>
          <div className="schedule-details">
          </div>
        </div>
      </div>
      <div className="schedule healthInformation">
        <div className="schedule-date">Chỉ số sức khỏe ở lần khám bệnh gần nhất</div>
        <div className="schedule-content">
          {healthStatus.map(e => {
            return <>
              <div className="schedule-details">
                <div className="schedule-details-text fz20">
                  <div className="schedule-details-title">{e.key}</div>
                  {e.value}
                </div>          
              </div>
            </>
          })}
        </div>
      </div>
      <div className="schedule healthInformation">
        <div className="schedule-date">Thông tin nhanh</div>
        <div className="schedule-content">
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Về bệnh viện</div>
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('')}>Chi tiết</LinkButton>   
            </div>
          </div>
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Về dịch vụ</div>
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('')}>Chi tiết</LinkButton>   
            </div>
          </div>
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Liên hệ</div>
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('')}>Chi tiết</LinkButton>   
            </div>
          </div>
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Thông tin, tin tức liên quan đến sức khỏe</div>
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('')}>Chi tiết</LinkButton>   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHome;