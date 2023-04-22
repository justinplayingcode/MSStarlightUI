import { INavLinkGroup, INavStyles, Image, ImageFit, Nav, Stack } from '@fluentui/react'
import * as React from 'react'
import './index.scss'
import { useEffect } from 'react';
import { accountRole } from 'model';

export interface INavigationProps{
    
}

export interface INavListProps{
    name: string,
    icon: string,
    description: string,
    url: string,
    imageUrl: string
}

 export const Navigation = (props: INavigationProps) => {
    
    const [selectedKey, setSelectedKey] = React.useState<string>("")

    const [role, setRole] =React.useState<accountRole>(accountRole.Admin);
    const [navGroup, setNavGroup] = React.useState<INavLinkGroup[]>([]);

    const navStyles: Partial<INavStyles> = {
        root: {
            boxSizing: 'border-box',
            overflowY: 'auto',
        },
    };

    useEffect(() => {
        assembleTopNavLinkGroups(getNavList());
    },[])

    const getNavList = () => {
        const list: INavListProps[] = [];
        list.push({
            name: 'Trang chủ',
            icon: 'Home',
            description: '',
            url: '#',
            imageUrl: ''
        });

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

    const assembleTopNavLinkGroups = (list: INavListProps[]) => {
        const groups: INavLinkGroup[] = [
            {
                links:[]
            }
        ];
        list.map((item, index) => {
            groups[0].links.push({
                name: item.name,
                icon: item.icon,
                url: item.url,
                key: `key${index}`,
            })
        });        
        setNavGroup(groups);
        setSelectedKey(groups[0].links[0].key);
    }

    return (
        <Stack className="left-content">
            <Image className='logo' imageFit={ImageFit.cover} src='https://res.cloudinary.com/dipiauw0v/image/upload/v1682052619/DATN/Hospital_logo_ymn2vi.png'/>
            <Nav
                className="top-nav"
                selectedKey={selectedKey}
                styles={navStyles}
                groups={navGroup}
                onRenderGroupHeader={(p, r) => (
                    <Stack className="header-container">
                        <Stack className="nav-header">{p!.name}</Stack>
                    </Stack>
                )}
                onLinkClick={(ev, item) => {
                    ev.stopPropagation();
                    setSelectedKey(item.key)
                }}
            />
        </Stack>
    )
};