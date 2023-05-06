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

    useEffect(() => {
        assembleTopNavLinkGroups(getNavList(role, false));
    },[])

    // const sideRef = React.useRef(null);

    // const clickOutside = (ref) => {
    //     useEffect(() => {
    //         setIsOpen(false)
    //         console.log("as")
    //     }, [ref])
    // }

    // clickOutside(sideRef)

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
                        menuItem.map((item) => (
                            <NavLink to={item.url} key={item.key} className="link"
                                style={
                                    ({ isActive }) => (
                                        isActive
                                            ? {
                                                textDecoration: 'none',
                                            }
                                            : {}
                                    )
                                }
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <div className="icon">{item.icon}</div>
                                <div className="link_text">{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SideBar;