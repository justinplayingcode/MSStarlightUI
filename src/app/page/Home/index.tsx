import { Calendar, Icon, Image, Stack, Text } from "@fluentui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoading, closeLoading, setInfoUser } from "src/redux/reducers";
import './index.scss'
import { IServiceCard, ServiceCard } from "src/app/common/ServiceCard";
import { accountRole } from "model";
import { Avatar, IconComponent } from "src/app/common";
import { AvatarSize } from "src/app/common/Avatar/avatar";
import { Convert } from "utils";
import { primaryHealthStatus } from "./index.type";
import Api from "src/api";
import { RootState } from "src/redux/store";
import image from "image";
import { HealthIndicator } from "src/model/enum";
import { tooltipPlainText } from "src/utils/utils";
import React from "react";
import DoctorManagementChart from "./components/adminChart/doctormanagement";
import OnBoardingChart from "./components/adminChart/onboardingpermonth";
import PatientManagementChart from "./components/adminChart/patientmanagement";
import PatientExaminedChart from "./components/adminChart/patientexaminedperday";
import { LinkButton } from "src/app/common/Link";
import { useNavigate } from "react-router-dom";


// const Home = () => {
//     const [items, setItems] = useState([]);   
//     const [homeMenu, setHomeMenu] = useState<IServiceCard[]>([]);
//     const [selectedDate, setSelectedDate] = useState<Date>();

//     const dispatch = useDispatch();
//     const {info} = useSelector((state:RootState) => state.user);
//     const role = useSelector<RootState>(state => state.user.role);

//     const onSelectDate = useCallback((date: Date, dateRangeArray: Date[]): void => {
//         setSelectedDate(date);
//     }, []);

//     const getAccountRoleName = (role: accountRole) => {
//         switch(role){
//             case accountRole.Admin:
//                 return <>Administrator</>;
//             case accountRole.Doctor:
//                 return <>Bác sĩ</>;
//             case accountRole.Patient:
//                 return <>Bệnh nhân</>
//             default:
//                 return <></>;
//         }
//     }

//     const getPatientStatus = (status : number) => {
//         let display : JSX.Element;
//         switch(status){
//             case 0:
//                 display = <Stack style={{color: '#FFC000'}}>Đang chờ khám</Stack>;
//                 break;
//             case 1:
//                 display = <Stack style={{color: '#01B0F1'}}>Đang khám</Stack>;
//                 break;
//             case 2:
//                 display = <Stack style={{color: '#C2272F'}}>Chờ xét nghiệm</Stack>;
//                 break;
//             case 3: 
//                 display = <Stack>{' -- '}</Stack>;
//                 break;
//             default:
//                 display = <Stack>{' -- '}</Stack>;
//             break;
//         }

//         return (
//             <Stack horizontal>Trạng thái: {display}</Stack>
//         )
//     }

//     const getHeiWeightInfo = (height: number, weight: number) => {
//         return(
//             <Stack className="height-weight-container">
//                 <Stack className="status-info">
//                     <Stack className="info-icon">
//                         <img alt="" src={image.weight} />
//                     </Stack>
//                     <Stack>{Convert.convertZeroNumber(weight)} Kg</Stack>
//                 </Stack>
//                 <Stack className="status-info">
//                     <Stack className="info-icon">
//                         <img alt="" src={image.height} />
//                     </Stack>
//                     <Stack>{Convert.convertZeroNumber(height)} cm</Stack>
//                 </Stack>
//             </Stack>
//         )
//     }

//     const renderWelcomePatient = () => {
//         return(
//             <Stack className="welcome-section">
//                 <div className="welcome-left welcome-block">
//                     <Stack className="curent-date">{`${Convert.getCurrentDateString()}`}</Stack>
//                     <Stack className="welcome-text">
//                         <Stack className="text-header">Xin chào, {info?.fullname}</Stack>
//                         <Text className="text-remind">Chúc một ngày tốt lành và đừng quên chăm sóc sức khỏe bản thân nhé</Text>
//                     </Stack>
//                 </div>
//             </Stack>
//         )
//     }

//     const renderWelcomeAdmin = () => {
//         return(
//             <Stack className="welcome-section">
//                 <div className="welcome-left welcome-block">
//                     <Stack className="curent-date">{`${Convert.getCurrentDateString()}`}</Stack>
//                     <Stack className="welcome-text">
//                         <Stack className="text-header">Xin chào, {info?.fullname}</Stack>
//                         <Text className="text-remind">Chúc một ngày làm việc hiệu quả</Text>
//                     </Stack>
//                     <div className="text-totalnewuser">Số người dùng mới tuần qua: 10</div>
//                     {/* <img alt="" className="welcome-image" src={image.adminlogo}/> */}
//                 </div>
//                 <div className="welcome-block welcome-block-admin">
//                     <div className="welcome-block-icon"
//                         style={{
//                             backgroundColor: "#66CDAA"
//                         }}
//                     ><img alt="" src={image.userdoctor}/> </div>
//                     <div className="welcome-block-dec">Bác sĩ</div>
//                     <div className="welcome-block-number">100</div>
//                 </div>
//                 <div className="welcome-block welcome-block-admin">
//                     <div className="welcome-block-icon"
//                         style={{
//                             backgroundColor: "#B9D9EB"
//                         }}
//                     ><img alt="" src={image.userpatient}/></div>
//                     <div className="welcome-block-dec">Bệnh nhân đang điều trị</div>
//                     <div className="welcome-block-number">12000</div>
//                 </div>
//             </Stack>
//         )
//     }

//     const renderWelcomeDoctor = () => {
//         return(
//             <Stack className="welcome-section">
//                 <Stack className="welcome-left welcome-block">
//                     <Stack className="curent-date">{`${Convert.getCurrentDateString()}`}</Stack>
//                         <Stack className="welcome-text">
//                             <Stack className="text-header">Xin chào, {info?.fullname}</Stack>
//                             <Text className="text-remind">Chúc một ngày làm việc hiệu quả</Text>
//                         </Stack>
//                 </Stack>
//                 <Stack className="welcome-left welcome-block">
//                     tin tuc
//                 </Stack>
//             </Stack>
//         )
//     }

//     const renderMenuAdmin = () => {
//         return (
//             <>
//                 <Stack className="status-news chart-container">
//                     <div className="chart-block">
//                         chert 1
//                     </div>
//                     <div className="chart-block">
//                         chart 2
//                     </div>
//                 </Stack>
//             </>
//         )
//     }

//     const renderMenuDoctor = () => {
//         return (
//             <>
//                 <Stack className="status-news chart-container">
//                     <div className="chart-block">
//                         chert 1
//                     </div>
//                     <div className="chart-block">
//                         chart 2
//                     </div>
//                 </Stack>
//             </>
//         )
//     }

//     const renderHealthCard = (name: string, imageUrl: string, color: string, bgcolor: string, info: any, unit: string, description: string) => {
//         let temp, temp1, temp2, content;
//         if(name === HealthIndicator.BloodPressure) {
//             temp1 = Convert.convertZeroNumber(info?.systolic);
//             temp2 = Convert.convertZeroNumber(info?.diastolic);
//             content = <>{`${temp1} / ${temp2}`} <span className="info-text-unit">{unit}</span></>
//         } else {
//             temp = Convert.convertZeroNumber(info);
//             content = unit === 'C' ? <>{`${temp} `}<span className="info-text-unit">&#8451;</span></> : <>{`${temp} `}<span className="info-text-unit">{unit}</span></>;
//         }
//         return(
//             <Stack className="status-container">
//                 <Stack className="status-info">
//                     <Stack className="info-icon"
//                         style={{backgroundColor: bgcolor}}
//                     >
//                         <img alt="" src={imageUrl} />
//                     </Stack>
//                     <div className="info-text" style={{color: color}}>
//                         {content}
//                     </div>
//                 </Stack>
//                 <Stack className="status-detail">
//                     <Stack className="status-name">{name}</Stack>
//                     <Stack className="status-description">
//                         {tooltipPlainText(description)}
//                     </Stack>
//                 </Stack>
//             </Stack>
//         )
//     }

//     const renderHealthStatus = () => {
//         return(
//             <>
//                 <Stack className="basic-status">
//                 {renderHealthCard(HealthIndicator.HeartRate, image.heartbeat, '#D86369','#FBF0F1', info?.heartRate, 'bpm', 'Nhịp tim là chỉ số quan trọng nhất')}
//                 {renderHealthCard(HealthIndicator.Temperature, image.temperature,'#6D93E2','#EDF3FC', info?.temperature, 'C', 'Thân nhiệt dưới 35 độ C là biểu hiện sức khỏe nghiêm trọng')}
//                 {renderHealthCard(HealthIndicator.BloodPressure, image.bloodPressure, '#D52B1E','#FBF0F1', info?.bloodPressure, 'mmHg', 'Huyết áp có thể tăng giảm vài lần trong ngày')}
//                 {renderHealthCard(HealthIndicator.Glucose, image.glucose, '#FBC216','#FFEEC1', info?.glucose, 'mg/dl', "Chỉ số đường huyết ở mức bình thường là 80-120 mg/dl")}
//                 </Stack>
//                 <Stack className="status-news news-container">
//                     Tin tức
//                 </Stack>
//             </>
//         )
//     }

//     // const renderPreviewProfile = (role: accountRole) => {
//     //     return (
//     //         <Stack className="preview-profile">
//     //             <Stack className="profile-info" tokens={{ childrenGap: 16 }}>
//     //                 <Avatar size={AvatarSize.SuperLarge} avatar_scr={info?.avatar} isRound={true} />
//     //                 <Stack className="info-name">{info?.fullname}</Stack>
//     //                 <Stack>{getAccountRoleName(role)}</Stack>
//     //                 {info?.onboarding && <>Đang nằm viện</>}
//     //                 {role === accountRole.Patient && getHeiWeightInfo(info?.height, info?.weight)}
//     //                 <Stack>Ngày sinh: {info?.dateOfBirth}</Stack>
//     //                 {role === accountRole.Doctor ? <>{info?.department}</> : <></>}
//     //                 {role === accountRole.Patient ? getPatientStatus(info?.status) : <></>}
//     //             </Stack>
//     //         </Stack>
//     //     )
//     // }

//     const welcomeSection = () => {
//         let content;
//         switch(role) {
//             case accountRole.Admin:
//                 content = renderWelcomeAdmin();
//                 break;
//             case accountRole.Doctor:
//                 content = renderWelcomeDoctor();
//                 break;
//             case accountRole.Patient:
//                 content = renderWelcomePatient();
//                 break;
//         }
//         return content;
//     }

//     const menuSection = () => {
//         let content;
//         switch(role) {
//             case accountRole.Admin:
//                 content = renderMenuAdmin();
//                 break;
//             case accountRole.Doctor:
//                 content = renderMenuDoctor();
//                 break;
//             case accountRole.Patient:
//                 content = renderHealthStatus();
//                 break;
//         }
//         return content;
//     }

//     return (
//         <Stack className="wrapper-content home-container">
//             <Stack className="home-left-section">
//                 {welcomeSection()}
//                 <div className="menu-section">
//                     {menuSection()}                    
//                 </div>
//             </Stack>
//             {/* <Stack className="home-right-section">
//                 {renderPreviewProfile(role as accountRole)}
//             </Stack> */}
//         </Stack>
//     )
// }

// export default Home;

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
    return (
      <>patient, hiển thị lịch hẹn khám bệnh nếu có, hiển thị các thông số sức khỏe cơ bản</>
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
      {/* <div className="header">{`Xin chào ${info.fullname}`}</div> */}
      <div className="content">{onRenderContent()}</div>
    </div>
  )
}

export default Home