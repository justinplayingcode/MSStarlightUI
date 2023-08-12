import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {RouteType, getNavList,} from './index.type';
import { useEffect } from 'react';
import { FaBars } from 'react-icons/fa'
import './index.scss'
import SidebarItemCollapse from './SidebarItemCollapse';
import SidebarItem from './SidebarItem';
import { RootState } from '../../../../redux/store';
import { setCurrentSidebar } from '../../../../redux/reducers';

const SideBar = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const [menuItem, setMenuItem] = React.useState<RouteType[]>([]);
    const { role, info } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const getSectionUrl = () => {
        const defaultUrl = 'http://localhost:3000'
        const lng = defaultUrl.length;
        const currentUrl = window.location.href;
        return currentUrl.substring(lng)
    }

    useEffect(() => {
        setMenuItem(getNavList(role!, info?.departmentCode));
        dispatch(setCurrentSidebar(getSectionUrl()))
    },[])

    useEffect(() => {
      setMenuItem(getNavList(role!, info?.departmentCode));
      dispatch(setCurrentSidebar(getSectionUrl()))
    },[window.location.href])

    return (
        <div className={`main-sidebar ${isOpen ? "" : 'sidebar-responsive'}`}>
            <div className='sidebar'>
                <div style={{ marginLeft: isOpen ? "240px" : "0px" }} className='bars'>
                    <FaBars onClick={() => setIsOpen(!isOpen)}
                        style={{
                            height: '28px',
                            width: '28px',
                            color: '#9CA3AF'
                        }}
                    />
                </div>
                <div className='top-section'>
                    <img 
                      className='logo' alt=''
                      src={'https://res.cloudinary.com/justinpham311/image/upload/v1691511899/benhvien/image2vector_1_1_sqsa7j.svg'} 
                      style={{width: '90%'}}
                    />
                </div>
                <div className='menu-section'>
                    {menuItem.map((route, index) => (
                        route?.sidebarProps ? (
                            route.child ? (
                                <SidebarItemCollapse item={route} key={index} />
                            ) : (
                                <SidebarItem item={route} key={index} />
                            )
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SideBar;