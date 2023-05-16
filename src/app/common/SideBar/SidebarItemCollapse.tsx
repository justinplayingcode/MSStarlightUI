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
    }, [currentSidebar, item]);

    return (
        item.sidebarProps ? (
            <>
                <NavLink
                    to={''}
                    className='link'
                    style={{
                        paddingLeft: 40,
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
                {/* secondary menu */}
                <div 
                // style={{paddingLeft: 40}}
                >
                {
                    open && item.child?.map((route, index) => (
                        route.sidebarProps ? (
                            route.child ? (
                                <Stack className="route-child">
                                    <SidebarItemCollapse item={route} key={index} />

                                </Stack>
                            ) : (
                                <Stack className="route-child">

                                    <SidebarItem item={route} key={index} />
                                </Stack>
                            )
                        ) : null
                    ))
                }
                </div>
            </>
        ) : null
    );
};

export default SidebarItemCollapse;