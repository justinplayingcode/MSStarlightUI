import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RouteType } from "./index.type";
import { RootState } from "src/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentSidebar } from "src/redux/reducers";
import './index.scss'


type Props = {
  item: RouteType;
  isChild?: boolean
};

const SidebarItem = ({ item, isChild }: Props) => {
  const { currentSidebar } = useSelector((state: RootState) => state.currentSelected);
    const dispatch = useDispatch();
    
    return (
        item.sidebarProps && item.path ? (
            <NavLink to={item.path}
                className="link"
                style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: currentSidebar.includes(item.state) ? '#1976D2' : '#111827',
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