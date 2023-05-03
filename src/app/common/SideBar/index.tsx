import { accountRole } from 'model';
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { updateSelectedMenu } from 'src/redux/reducers';
import { ISideBarProps, getNavList } from './index.type';
import { RootState } from 'src/redux/store';
import { useEffect } from 'react';
import { FaBars } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import './index.scss'
import Image from "image"

const SideBar = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const [menuItem, setMenuItem] = React.useState<ISideBarProps[]>([]);
    const { role } = useSelector((state: RootState) => state.user);
    const thisRole = accountRole.Doctor;

    useEffect(() => {
        assembleTopNavLinkGroups(getNavList(role, false));
    },[])

    const assembleTopNavLinkGroups = (list: ISideBarProps[]) => {
        const groups: ISideBarProps[] = [];
        list.map((item, index) => {
            groups.push({
                name: item.name,
                icon: item.icon,
                url: item.url,
                key: `key${index}`,
            })
        });        
        setMenuItem(groups);        
    }

    return (
        <div className='sidebar'>
            <div className='top-section'>
                <img className='logo' alt='' 
                style={{ display: isOpen ? "block" : "none" }}
                src={Image.logo}/>
                <div style={{ marginLeft: isOpen ? "200px" : "0px" }} className='bars'>
                    <FaBars onClick={() => setIsOpen(!isOpen)} />
                </div>
            </div>
            <div className='menu-section'>
                {
                    menuItem.map((item) => (
                        <NavLink to={item.url} key={item.key} className="link"
                            style={
                                ({ isActive }) => (
                                    isActive
                                        ? {
                                            textDecoration: 'none',
                                            backgroundColor: '#2e3192'
                                        }
                                        : {}
                                )
                            }
                        >
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar;