import { useEffect, useState } from "react";
import { RouteType } from "./index.type";
import SidebarItem from "./SidebarItem";

import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { NavLink } from "react-router-dom";
import './index.scss'
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { Stack } from "@fluentui/react";

type Props = {
    item: RouteType;
};

const SidebarItemCollapse = ({ item }: Props) => {
    const { currentSidebar } = useSelector((state: RootState) => state.currentSelected);
    
    const [open, setOpen] = useState(false);

    useEffect(() => {        
        if (currentSidebar.includes(item.state)) {
            setOpen(true);
        }
        else {
            setOpen(false)
        }
    }, [currentSidebar, item]);

    return (
        item.sidebarProps ? (
            <>
                <NavLink
                    to={''}
                    className='link'
                    style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        color: open ? "#fff" : "#9CA3AF",
                        background: open ? '#264A63' : 'unset',
                        borderLeft: '4px solid transparent',
                    }}
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <div className='link-icon-text'>
                        <div className="icon">{item.sidebarProps.icon}</div>
                        <div className="link_text">{item.sidebarProps.displayText}</div>
                    </div>
                    <div className='link-arrow'>
                        {open ? <MdExpandMore /> : <MdExpandLess />}
                    </div>
                </NavLink>
                <div 
                >
                {
                    open && item.child?.map((route, index) => (
                        route.sidebarProps ? (
                            <Stack className="route-child" key={index}>
                              {route.child ? <SidebarItemCollapse item={route}/> : <SidebarItem item={route} bcColor="#111827"/>}
                            </Stack>
                        ) : null
                    ))
                }
                </div>
            </>
        ) : null
    );
};

export default SidebarItemCollapse;