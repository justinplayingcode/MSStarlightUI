import { Calendar, Icon, Image, Stack, Text } from "@fluentui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoading, closeLoading } from "src/redux/reducers";
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
    const {avatar, info} = useSelector((state:RootState) => state.user);
    const role = useSelector<RootState>(state => state.user.role);

    const doctorrole = accountRole.Doctor;
    const patientrole = accountRole.Patient;
    // lấy role từ redux ra 

    const profile ={
        // name: 'Phạm Duy Thắng',
        // dateOfBirth: new Date(2001, 1, 30),
        // avatarUrl: '',
        heartRate: 97,
        temperature: 36,
        bloodPressure: '120/80',
        glucose: 90,
        weight: 53,
        height: 165
    }


    const onSelectDate = useCallback((date: Date, dateRangeArray: Date[]): void => {
      setSelectedDate(date);
    }, []);

    useEffect(() => {
        console.log('item');
        //catch api here
    }, [items])

    const fetchaasa = async () => {
        dispatch(openLoading());
        const reqbody = {
            name: "aa",
            a: 0
        }
        try {
            const data = await authApi.login(reqbody);
            console.log(data)
            dispatch(closeLoading())
            // show toast succes showMessageToast("", type)
        } catch (err) {
            // show toast fail
            dispatch(closeLoading())
        }
    }

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

    const renderHealthCard = (name: string, imageUrl: string, info: string, unit: string, description: string) => {
        return(
            <Stack className="status-container">
                <Stack className="status-info">
                    <img alt="" src={imageUrl} />
                    {unit === 'C'
                        ? <>{info}&#8451;</>
                        : <>{info}{unit}</>
                    }
                </Stack>
                <Stack className="status-name">{name}</Stack>
                <Stack className="status-description">{description}</Stack>
            </Stack>
        )
    }

    const renderHealthStatus = () => {
        return(
            <>
                <Stack className="basic-status">
                {renderHealthCard('Nhịp tim', 
                "https://res.cloudinary.com/dipiauw0v/image/upload/v1682249027/DATN/Menulogo/heartbeat-removebg-preview_pg1ozi.png",
                profile.heartRate.toString(), 'bpm', 'Nhịp tim của người bệnh'
                )}
                </Stack>
                <Stack className="status-news">

                </Stack>
            </>
        )
    }

    const renderPreviewProfile = (role: accountRole) => {
        return (
            <Stack className="preview-profile">
                <Stack className="profile-info" tokens={{childrenGap: 16}}>
                    <Avatar size={AvatarSize.SuperLarge} avatar_scr={avatar}/>
                    <Stack>{info?.onboarding ? <>Đang nằm viện</> : <></>} </Stack>
                    <Stack className="info-name">{info?.name}</Stack>                    
                    {/* <Stack>{`${Convert.getAge(info?.dateOfBirth)} years`}</Stack> */}
                    <Stack>Năm sinh: {Convert.getBornYear(info?.dateOfBirth)}</Stack>
                    <Stack>{getAccountRoleName(role)}</Stack>
                    <Stack>{role === accountRole.Doctor ? <>{info?.department}</> : <></>}</Stack>
                    <Stack>{role === accountRole.Patient ? <>Trạng thái: {getPatientStatus(info?.status)}</> : <></>}</Stack>
                    {/* more info depend on role */}
                </Stack>

                {/* <Calendar
                    className="calendar"
                    showMonthPickerAsOverlay
                    highlightSelectedMonth
                    showGoToToday={false}
                    onSelectDate={onSelectDate}
                    value={selectedDate}
                    //Chac de TA thoi nhi
                    // Calendar uses English strings by default. For localized apps, you must override this prop.
                    // strings={defaultCalendarStrings}
                /> */}
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
                {renderPreviewProfile(doctorrole as accountRole)}
            </Stack>
        </Stack>
    )
}

export default Home;