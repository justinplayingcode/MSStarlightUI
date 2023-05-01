import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer, { openLoading, closeLoading } from './common/loadingReducer';
import navigationReducer, {updateSelectedMenu} from './common/navigationReducer';
import userReducer, { setInfoUser, setRole, setUsername, userLogout } from './common/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    loading: loadingReducer,
    navigation: navigationReducer

});

export default rootReducer;

export {
    setRole, setUsername, setInfoUser, userLogout,
    openLoading, closeLoading,
    updateSelectedMenu,

}
