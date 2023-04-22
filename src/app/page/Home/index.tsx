import { Calendar, Icon, Image, Stack, Text } from "@fluentui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openLoading, closeLoading } from "src/redux/reducers";
import './index.scss'
import { IServiceCard, ServiceCard } from "src/app/common/ServiceCard";
import { INavListProps } from "src/app/common/Navigation";
import { accountRole } from "model";
import { Avatar } from "src/app/common";
import { AvatarSize } from "src/app/common/Avatar/avatar";


const Home = () => {
    const [items, setItems] = useState([]);    
    const [role, setRole] = useState<accountRole>(accountRole.Admin);
    const [homeMenu, setHomeMenu] = useState<IServiceCard[]>([]);
    const [name, setName] = useState<string>('Phạm Duy Thắng');
    const [selectedDate, setSelectedDate] = useState<Date>();

    const profile ={
        name: 'Phạm Duy Thắng',
        dateOfBirth: new Date(2001, 1, 30),
        avatarUrl: '',
    }

    const defaultAvatar = 'https://res.cloudinary.com/dipiauw0v/image/upload/v1682100699/DATN/unisex_avatar.jpg';

    const dispatch = useDispatch();


    const onSelectDate = useCallback((date: Date, dateRangeArray: Date[]): void => {
      setSelectedDate(date);
    }, []);

    useEffect(() => {
        dispatch(openLoading());
        setTimeout(fetchaasa, 3000)
    }, [])

    useEffect(() => {
        assembleMenu(getNavList())
    },[])

    useEffect(() => {
        console.log('item');
        //catch api here
    }, [items])

    const fetchaasa = () => {
        console.log('here');

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(result => {
                setItems(result);
            }).catch(() => { }).finally(() => { dispatch(closeLoading()) })
    }


    const getNavList = () => {
        const list: INavListProps[] = [];
        if(role !== accountRole.Patient){
            list.push({
                name: 'Tài khoản',
                icon: 'AccountManagement',
                description:'Quản lý tài khoản của bác sĩ và bệnh nhân',
                url: '#',   
                imageUrl: '#'
            });

            if(role !== accountRole.Doctor){
                list.push(
                {
                    name: 'Khoa, viện',
                    icon: 'ManagerSelfService',
                    description: '',
                    url: '#',
                    imageUrl: ''
                }
                )
            }
        };

        list.push(
            {
                name: 'Lịch sử khám bệnh',
                icon: 'Clock',
                description: '',
                url: '#',
                imageUrl: ''
            },
            {
                name: 'Bệnh',
                icon: 'Trackers',
                description:'',
                url: '#',
                imageUrl:''
            },
            {
                name: 'Thuốc',
                icon: 'Pill',
                description:'',
                url: '#',
                imageUrl:''
            },
            {
                name: 'Thông tin, tư vấn',
                icon: 'News',
                description: '',
                url: '#',
                imageUrl: ''
            }
        );
        return list;
    }

    const assembleMenu = (list: INavListProps[]) => {
        const newHomeMenu : IServiceCard[] = [];
        list.map((item) => {
            newHomeMenu.push({
                name: item.name,
                iconName: item.icon,
                description: item.description,
            })
        });
        setHomeMenu(newHomeMenu);
    }

    const renderWelcome = () => {
        return(
            <Stack className="welcome-section">
                <Stack className="welcome-text">
                    <Stack className="text-header">Xin chào, {name}</Stack>
                    <Text className="text-remind">Chúc một ngày tốt lành và đừng quên chăm sóc sức khỏe bản thân nhé</Text>
                </Stack>
                <Stack className="welcome-image">

                </Stack>
            </Stack>
        )
    }

    const renderPreviewProfile = () => {
        return (
            <Stack className="preview-profile">
                <Stack className="profile-info">
                    <Avatar size={AvatarSize.SuperLarge} avatar_scr={profile.avatarUrl}/>
                    <Stack>{name}</Stack>
                    <Stack>{ }</Stack>
                </Stack>

                <Calendar
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
                    {homeMenu.map((item,index) =>
                        <ServiceCard key={index} iconName={item.iconName} name={item.name} description={item.description} />
                    )}
                </Stack>
            </Stack>
            <Stack className="home-right-section">
                {renderPreviewProfile()}
            </Stack>
        </Stack>
    )
}

export default Home;