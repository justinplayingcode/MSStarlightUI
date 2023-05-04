import { Calendar, Icon, Image, Stack, Text } from "@fluentui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoading, closeLoading, setInfoUser } from "src/redux/reducers";
import './index.scss'
import { IServiceCard, ServiceCard } from "src/app/common/ServiceCard";
import { accountRole } from "model";
import { Avatar } from "src/app/common";
import { AvatarSize } from "src/app/common/Avatar/avatar";
import { Convert } from "utils";
import { primaryHealthStatus } from "./index.type";
import authApi from "src/api/auth";
import { RootState } from "src/redux/store";
import image from "image";


const Home = () => {
    const [items, setItems] = useState([]);   
    const [homeMenu, setHomeMenu] = useState<IServiceCard[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>();

    const dispatch = useDispatch();
    const {info} = useSelector((state:RootState) => state.user);
    const role = useSelector<RootState>(state => state.user.role);

    useEffect(() => {
        dispatch(openLoading());
        getInfoCurrentUser();
    }, [])

    const getInfoCurrentUser = async () => {
        const { data } = await authApi.getInfoCurrentUser();
        
        dispatch(setInfoUser(data))
        dispatch(closeLoading());
    }  


    const onSelectDate = useCallback((date: Date, dateRangeArray: Date[]): void => {
      setSelectedDate(date);
    }, []);

    const getCurrentDateString = (date?: Date): string => {
        return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
      };

    const getAccountRoleName = (role: accountRole) => {
        switch(role){
            case accountRole.Admin:
                return <>Admin</>;
            case accountRole.Doctor:
                return <>Bác sĩ</>;
            case accountRole.Patient:
                return <>Bệnh nhân</>
            default:
                return <></>;
        }
    }

    const getPatientStatus = (status : number) => {
        let display : JSX.Element;
        switch(status){
            case 0:
                display = <Stack style={{color: '#FFC000'}}>Đang chờ khám</Stack>;
                break;
            case 1:
                display = <Stack style={{color: '#01B0F1'}}>Đang khám</Stack>;
                break;
            case 2:
                display = <Stack style={{color: '#C2272F'}}>Chờ xét nghiệm</Stack>;
                break;
            case 3: 
                display = <Stack>{' -- '}</Stack>;
                break;
            default:
                display = <Stack>{' -- '}</Stack>;
            break;
        }

        return (
            <Stack horizontal>Trạng thái: {display}</Stack>
        )
    }

    const getHeiWeightInfo = (height: number, weight: number) => {
        return(
            <Stack className="height-weight-container">
                <Stack className="status-info">
                    <Stack className="info-icon">
                        <img alt="" src={image.weight} />
                    </Stack>
                    <Stack>{Convert.convertZeroNumber(weight)} Kg</Stack>
                </Stack>
                <Stack className="status-info">
                    <Stack className="info-icon">
                        <img alt="" src={image.height} />
                    </Stack>
                    <Stack>{Convert.convertZeroNumber(height)} cm</Stack>
                </Stack>
            </Stack>
        )
    }

    const renderWelcome = () => {
        return(
            <Stack className="welcome-section">
                <Stack className="welcome-left">
                    <Stack className="welcome-text">
                        <Stack className="text-header">Xin chào, {info?.name}</Stack>
                        <Text className="text-remind">Chúc một ngày tốt lành và đừng quên chăm sóc sức khỏe bản thân nhé</Text>
                    </Stack>
                    <Stack className="curent-date">Hôm nay là {getCurrentDateString(new Date())}</Stack>
                </Stack>
                <img alt="" className="welcome-image" src={image.welcomeLogo}/>
            </Stack>
        )
    }

    const renderMenu = () => {
        return (
            <>
                {homeMenu.map((item, index) =>
                    <ServiceCard key={index} iconName={item.iconName} name={item.name} description={item.description} />
                )}
            </>
        )
    }

    const renderHealthCard = (name: string, imageUrl: string, color: string, bgcolor: string, info: number, unit: string, description: string) => {
        const temp = Convert.convertZeroNumber(info)
        return(
            <Stack className="status-container">
                <Stack className="status-info">
                    <Stack className="info-icon"
                        style={{backgroundColor: bgcolor}}
                    >
                        <img alt="" src={imageUrl} />
                    </Stack>
                    <Stack className="info-text" style={{color: color}}>
                        {unit === 'C'
                            ? <>{temp}&#8451;</>
                            : <>{temp}{unit}</>
                        }
                    </Stack>
                </Stack>
                <Stack className="status-detail">
                    <Stack className="status-name">{name}</Stack>
                    <Stack className="status-description">{description}</Stack>
                </Stack>
            </Stack>
        )
    }

    const renderHealthStatus = () => {
        return(
            <>
                <Stack className="basic-status">
                {renderHealthCard('Nhịp tim', image.heartbeat, '#D86369','#FBF0F1', info?.heartRate, 'bpm', 'Nhịp tim là chỉ số quan trọng nhất')}
                {renderHealthCard('Nhiệt độ', image.temperature,'#6D93E2','#EDF3FC', info?.temperature, 'C', 'Thân nhiệt dưới 35 độ C là biểu hiện sức khỏe nghiêm trọng')}
                {renderHealthCard('Huyết áp', image.bloodPressure, '#D52B1E','#FBF0F1', info?.bloodPressure, '', 'Huyết áp có thể tăng giảm vài lần trong ngày')}
                {renderHealthCard('Đường huyết', image.glucose, '#FBC216','#FFEEC1', info?.glucose, 'mg/dl', "Chỉ số đường huyết ở mức bình thường là 80-120 mg/dl")}
                </Stack>
                <Stack className="status-news">
                    Tin tức
                </Stack>
            </>
        )
    }

    const renderPreviewProfile = (role: accountRole) => {
        return (
            <Stack className="preview-profile">
                <Stack className="profile-info" tokens={{ childrenGap: 16 }}>
                    <Avatar size={AvatarSize.SuperLarge} avatar_scr={info?.avatar} isRound={true} />
                    <Stack className="info-name">{info?.fullname}</Stack>
                    <Stack>{getAccountRoleName(role)}</Stack>
                    {info?.onboarding && <>Đang nằm viện</>}
                    {role === accountRole.Patient && getHeiWeightInfo(info?.height, info?.weight)}
                    <Stack>Ngày sinh: {info?.dateOfBirth}</Stack>
                    {role === accountRole.Doctor ? <>{info?.department}</> : <></>}
                    {role === accountRole.Patient ? getPatientStatus(info?.status) : <></>}
                </Stack>

                <Calendar
                    className="calendar"
                    showMonthPickerAsOverlay
                    highlightSelectedMonth
                    showGoToToday={false}
                    onSelectDate={onSelectDate}
                    value={selectedDate}
                    //Chac de TA thoi nhi
                    // Calendar uses English strings by default. For localized apps, you must override this prop.
                    // strings={defaultCalendarStrings}
                />
            </Stack>
        )
    }

    return (
        <Stack className="home-container">
            <Stack className="home-left-section">
                {renderWelcome()}
                <Stack className="menu-section">
                    {
                        role === accountRole.Patient
                        ? renderHealthStatus()
                        : renderMenu()
                    }                    
                </Stack>
            </Stack>
            <Stack className="home-right-section">
                {renderPreviewProfile(role as accountRole)}
            </Stack>
        </Stack>
    )
}

export default Home;