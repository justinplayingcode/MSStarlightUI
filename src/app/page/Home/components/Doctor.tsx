import { LinkButton } from "src/app/common/Link";
import { Convert } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/redux/store";
import { useEffect, useState } from "react";
import { AreaChart } from "src/app/common/Chart/areaChart";
import { BarChart } from "src/app/common/Chart/barChart";

function DoctorHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { info } = useSelector((state:RootState) => state.user);

  const [currentState, setCurrentState] = useState<any>(null);

  useEffect(() => {
    // call api
    const a = {
      scheduleCount: 2,
      onboardingIn: 10,
      onboardingOut: 10,
      onboardingInCount: [500, 400, 560, 400, 300, 450, 700, 800, 1000, 650, 600, 500],
      onboardingOutCount: [200, 600, 360, 300, 100, 550, 400, 500, 1200, 250, 500, 800],
      labelsBarChar: ["8/7", "9/7", "10/7", "11/7", "12/7", "13/7", "14/7",],
      valuesBarChar: [300, 120, 250, 200, 220, 150, 100]
    }
    setCurrentState(a)
  }, [])

  return (  
    <div id="doctor-home">
      <div className="information" style={{background: "url(https://res.cloudinary.com/justinpham311/image/upload/v1689399210/benhvien/doctorhome_peswxk.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="information-welcome">Chào mừng quay lại hệ thống</div>
        <div className="information-first">
          <div>
            <div className="information-text"><div>{Convert.getDoctorRank(info?.rank)}:</div>{info?.fullname}</div>
            <div className="information-text"><div>Chuyên khoa:</div>{info?.department}</div>
            <div className="information-text"><div>Chức vụ:</div>{Convert.getDoctorPosition(info?.position)}</div>
          </div>
        </div>
        <div className="information-second">
          <LinkButton style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/home/profile')}>Thông tin cá nhân</LinkButton>
        </div>
      </div>
      <div className="schedule">
        <div className="schedule-date">{Convert.getCurrentDateString()}</div>
        <div className="schedule-content">
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Lịch hẹn khám bệnh hôm nay:</div>{currentState?.scheduleCount}
            </div>          
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/cure/appointment#tab0')}>Chi tiết</LinkButton>
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
              <div className="schedule-details-title">Số bệnh nhân đang điều trị nội trú:</div>{currentState?.onboardingIn}
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/patient-management-doctor')}>Chi tiết</LinkButton>
            </div>     
          </div>
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Số bệnh nhân đang điều trị ngoại trú:</div>{currentState?.onboardingOut}
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/patient-management-doctor')}>Chi tiết</LinkButton>       
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container-wrapper chart-container">
        <BarChart
          labels={currentState?.labelsBarChar} 
          titleChart='Số lượng bệnh nhân tới khám 7 ngày qua' 
          values={currentState?.valuesBarChar} 
          legend='Bệnh nhân'
        />
      </div>
      <div className="chart-container-wrapper chart-container">
        <AreaChart 
          labels={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']} 
          titleChart='Bệnh nhân nhập viện mỗi tháng' 
          valuefisrt={currentState?.onboardingInCount}
          valuesecond={currentState?.onboardingOutCount}
          legendfirst='Nội trú'
          legendsecond='Ngoại trú'
        />
      </div>
    </div>
  );
}

export default DoctorHome;