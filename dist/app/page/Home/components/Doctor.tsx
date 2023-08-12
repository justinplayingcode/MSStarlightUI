import { LinkButton } from "src/app/common/Link";
import { Convert } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/redux/store";
import { useEffect, useState } from "react";
import { BarChart } from "src/app/common/ChartComponents/barChart";
import { AreaChart } from "src/app/common/ChartComponents/areaChart";
import Api from "api";
import { closeLoading, openLoading } from "src/redux/reducers";

function DoctorHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { info } = useSelector((state:RootState) => state.user);
  const [currentState, setCurrentState] = useState<any>(null);
  const [labelsOnBoardingChart, setLabelsOnBoardingChart] = useState<string[]>([]);
  const [valuesOnBoardingInChart, setValuesOnBoardingInChart] = useState<number[]>([]);
  const [valuesOnBoardingOutChart, setValuesOnBoardingOutChart] = useState<number[]>([]);
  const [labelsPatientExaminedChart, setLabelsPatientExaminedChart] = useState<string[]>([]);
  const [valuesPatientExaminedChart, setValuesPatientExaminedChart] = useState<number[]>([]);

  useEffect(() => {
    const historyChart = Api.statisticApi.historieslast7day();
    const onboarding = Api.statisticApi.onboardinginmonth();
    dispatch(openLoading());
    Promise.all([historyChart, onboarding])
    .then(data => {
      const labels3: string[] = [], values3: number[] = [];
        Array.from(data[0]?.data?.reverse()).forEach(e => {
          labels3.push((e as any)?.date);
          values3.push((e as any)?.appointmentCount);
        })
        setLabelsPatientExaminedChart(labels3);
        setValuesPatientExaminedChart(values3);
        //
        const labels4: string[] = [], values41: number[] = [], values42: number[] = [];
        Array.from(data[1]?.data?.reverse()).forEach(e => {
          labels4.push((e as any)?.month);
          values41.push((e as any)?.inCount);
          values42.push((e as any)?.outCount);
        })
        setLabelsOnBoardingChart(labels4);
        setValuesOnBoardingInChart(values41);
        setValuesOnBoardingOutChart(values42);
    })
    .catch()
    .finally(() => dispatch(closeLoading()));

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
              <div className="schedule-details-title">Lịch hẹn khám bệnh hôm nay</div>{currentState?.scheduleCount}
            </div>          
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/cure/appointment')}>Chi tiết</LinkButton>
            </div>
          </div>
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Yêu cầu hẹn lịch khám bệnh</div>{currentState?.requestCount}
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/cure/appointment')}>Chi tiết</LinkButton>
            </div>     
          </div>
          <div className="schedule-details">
            <div className="schedule-details-text">
              <div className="schedule-details-title">Bệnh nhân đang điều trị tại khoa</div>
            </div>
            <div className="schedule-details-button">
              <LinkButton className="button" style={{color: "rgb(210,210,210)"}} onClick={() => navigate('/patient-management-doctor')}>Chi tiết</LinkButton>       
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
        </div>
      </div>
      <div className="chart-container-wrapper chart-container">
        <BarChart
          labels={labelsPatientExaminedChart} 
          titleChart='Số lần khám bệnh cho bệnh nhân 7 ngày qua' 
          values={valuesPatientExaminedChart} 
          legend='Đơn vị: Lần'
        />
      </div>
      <div className="chart-container-wrapper chart-container">
        <AreaChart 
          labels={labelsOnBoardingChart} 
          titleChart='Bệnh nhân nhập viện mỗi tháng tại khoa' 
          valuefisrt={valuesOnBoardingInChart}
          valuesecond={valuesOnBoardingOutChart}
          legendfirst='Nội trú'
          legendsecond='Ngoại trú'
        />
      </div>
    </div>
  );
}

export default DoctorHome;