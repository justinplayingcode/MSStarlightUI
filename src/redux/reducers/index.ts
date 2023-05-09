import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer, { openLoading, closeLoading } from './common/loadingReducer';
import navigationReducer, {updateSelectedMenu} from './common/navigationReducer';
import userReducer, { setInfoUser, setRole, setUsername, userLogout } from './userReducer';
import panelReducer, { closePanel, closePanelLoading, openPanel, openPanelLoading } from './common/panelReducer';

const rootReducer = combineReducers({
    user: userReducer,
    loading: loadingReducer,
    navigation: navigationReducer,
    panel: panelReducer,
});

export default rootReducer;

export {
    setRole, setUsername, setInfoUser, userLogout,
    openLoading, closeLoading,
    updateSelectedMenu,
    openPanel, closePanel, openPanelLoading, closePanelLoading,
    

}
