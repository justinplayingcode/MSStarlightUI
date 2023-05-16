import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RouteType } from "./index.type";
import { RootState } from "src/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentSidebar } from "src/redux/reducers";
import './index.scss'


type Props = {
  item: RouteType;
};

const SidebarItem = ({ item }: Props) => {
  const { currentSidebar } = useSelector((state: RootState) => state.currentSelected);
    const dispatch = useDispatch();
    
    return (
        item.sidebarProps && item.path ? (
            <NavLink to={item.path}
                className="link"
                style={{
                    paddingLeft: 30,
                    backgroundColor: currentSidebar === item.state ? 'linear-gradient(to right, #111827, #374151)' : 'unset',
                    color: currentSidebar === item.state ? '#fff' : '#9CA3AF',
                    borderLeft: currentSidebar === item.state ? '4px solid #fff' : '4px solid transparent'
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