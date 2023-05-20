import { combineReducers } from '@reduxjs/toolkit';
import currentSelectedReducer, { setCurentId, setCurrentSidebar, setTableSelectedCount, setTableSelectedItem} from './common/curentSelectedReducer'
import loadingReducer, { openLoading, closeLoading } from './common/loadingReducer';
import navigationReducer, {updateSelectedMenu} from './common/navigationReducer';
import panelReducer, { closePanel, closePanelLoading, openPanel, openPanelLoading } from './common/panelReducer';

import userReducer, { setInfoUser, setRole, setUsername, userLogout } from './userReducer';
import doctorManagementReducer, { setDoctorList } from './doctorManagementReducer';
import tableReducer, { tableRefresh } from './common/tableReducer';
const rootReducer = combineReducers({
    currentSelected: currentSelectedReducer,
    loading: loadingReducer,
    navigation: navigationReducer,
    panel: panelReducer,
    table: tableReducer,
    user: userReducer,
    doctorManagement: doctorManagementReducer,
});

export default rootReducer;

export {
    setCurentId, setCurrentSidebar, setTableSelectedCount, setTableSelectedItem,
    openLoading, closeLoading,
    updateSelectedMenu,
    openPanel, closePanel, openPanelLoading, closePanelLoading,
    setRole, setUsername, setInfoUser, userLogout,
    setDoctorList,
    tableRefresh
}
