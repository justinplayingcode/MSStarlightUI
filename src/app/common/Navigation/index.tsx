import { INavLinkGroup, INavStyles, Nav, Stack } from '@fluentui/react'
import * as React from 'react'
import './index.scss'
import { useEffect } from 'react';

export interface INavigationProps{
    
}

const Navigation = (props: INavigationProps) => {
    
    const [selectedKey, setSelectedKey] = React.useState<string>("")


    const navStyles: Partial<INavStyles> = {
        root: {
            width: 208,
            //   height: 350,
            boxSizing: 'border-box',
            overflowY: 'auto',
        },
    };

    //day la danh sach cac chuc nang cho tung account
    const topNavLinkGroups: INavLinkGroup[] = [
        {
            name: 'Trang chủ',
            links: [
                {
                    name: 'Home',
                    icon: 'Home',
                    key:'key0',
                    url: '#',
                },
                {
                    name: 'Tài khoản',
                    icon: 'AccountManagement',
                    url: '#',
                    key: 'key1',        
                },
                {
                    name: 'Thuốc',
                    icon: 'Pill',
                    url: '#',
                    key: 'key2',
                },
                {
                    name: 'Bệnh',
                    icon:'Trackers',
                    url: '#',
                    key: 'key3',
                },
                {
                    name: 'Khoa, viện',
                    icon: 'ManagerSelfService',
                    url: '#',
                    key: 'key4',
                },
                {
                    name: 'Lịch sử khám bệnh',
                    icon: 'Clock',
                    url: '#',
                    key: 'key4',
                },
                {
                    name: 'Thông tin, tư vấn',
                    icon: 'News',
                    url: '#',
                    key: 'key5',
                },
            ],
        },
    ];

    useEffect(() => {
        setSelectedKey(topNavLinkGroups[0].links[0].key)
    },[])

    return (
        <Stack className="left-content">
            {/* maybe add a logo on top left */}
            <Nav
                className="top-nav"
                selectedKey={selectedKey}
                styles={navStyles}
                groups={topNavLinkGroups}
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
export default Navigation;