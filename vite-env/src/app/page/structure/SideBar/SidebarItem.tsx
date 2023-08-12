import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RouteType } from "./index.type";
import { useDispatch } from "react-redux";
import './index.scss'
import { RootState } from "../../../../redux/store";
import { setCurrentSidebar } from "../../../../redux/reducers";


type Props = {
  item: RouteType;
  bcColor?: string;
};

const SidebarItem = ({ item, bcColor }: Props) => {
  const { currentSidebar } = useSelector((state: RootState) => state.currentSelected);
    const dispatch = useDispatch();
    
    return (
        item.sidebarProps && item.path ? (
            <NavLink to={item.path}
                className="link"
                style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: currentSidebar.includes(item.state) ? bcColor || '#264A63' : '#111827',
                    color: currentSidebar.includes(item.state) ? '#fff' : '#9CA3AF',
                }}
                onClick={() => {                    
                    dispatch(setCurrentSidebar(item.state))
                }}
            >
                <div className='link-icon-text'>
                    <div className="icon">{item.sidebarProps.icon}</div>
                    <div className="link_text">{item.sidebarProps.displayText}</div>
                </div>
            </NavLink>
        ) : null
    );
};

export default SidebarItem;