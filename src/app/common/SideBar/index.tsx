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
    const [subnav, setSubnav] = React.useState<boolean>(false)
    const { role } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        assembleTopNavLinkGroups(getNavList(role, false));
    },[])

    const assembleTopNavLinkGroups = (list: ISideBarProps[]) => {
        const groups: ISideBarProps[] = [];
        list.map((item) => {
            if (!item.subNav) {
                groups.push({
                    title: item.title,
                    path: item.path,
                    icon: item.icon,
                    key: `key${item.title}`,
                })
            } else{
                groups.push({
                    title: item.title,
                    path: item.path,
                    icon: item.icon,
                    iconClosed: item.iconClosed,
                    iconOpened: item.iconOpened,
                    subNav: item.subNav,
                    key: `key${item.title}`,
                })
            }
        });        
        setMenuItem(groups);        
    }

    return (
        <div className={`main-sidebar ${isOpen ? "" : 'sidebar-responsive'}`}>
            <div className='sidebar'>
                <div style={{ marginLeft: isOpen ? "240px" : "0px" }} className='bars'>   
                    <FaBars onClick={() => setIsOpen(!isOpen)} 
                        style={{
                            height: '28px',
                            width:'28px',
                            color: '#9CA3AF'
                        }}
                    />
                </div>
                <div className='top-section'>
                    <img className='logo' alt='' 
                        src={Image.logo}/>
                </div>
                <div className='menu-section'>
                    {
                        menuItem.map((item) => {
                            return(
                                <>                                
                                <NavLink
                                    to={!item.subNav && item.path}
                                    key={item.key}
                                    className='link'
                                    // className={(!item.subNav ? 'link' : 'link active')}
                                    // style={{background: 'none', color: 'none', borderLeft: 'none'}}
                                    style={({ isActive }) => (
                                        isActive && item.subNav
                                            ? {background: 'none', color: 'none', borderLeft: 'none'}
                                            : {}
                                    )}
                                    onClick={() => item.subNav && setSubnav(!subnav)}
                                >
                                    <div className='link-icon-text'>
                                        <div className="icon">{item.icon}</div>
                                        <div className="link_text">{item.title}</div>
                                    </div>
                                    <div className='link-arrow'>                                        
                                        {item.subNav && subnav
                                            ? item.iconOpened
                                            : item.subNav
                                            ? item.iconClosed
                                            : null
                                        }
                                    </div>
                                </NavLink>
                                {subnav && item?.subNav?.map((item, index) => {
                                    return(
                                        <NavLink to={item.path}
                                        key={index}
                                        className="link"
                                        style={{
                                            paddingLeft: 40
                                        }}
                                        >
                                            <div className='link-icon-text'>
                                                <div className="icon">{item.icon}</div>
                                                <div className="link_text">{item.title}</div>
                                            </div>
                                        </NavLink>
                                    )
                                })}
                                </>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SideBar;