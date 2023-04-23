import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer, { openLoading, closeLoading } from './common/loadingReducer';
import navigationReducer, {updateSelectedMenu} from './common/navigationReducer';
import userReducer, { setInfoUser, setRole, setUsername } from './common/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    loading: loadingReducer,
    navigation: navigationReducer

});

export default rootReducer;

export {
    setRole, setUsername, setInfoUser,
    openLoading, closeLoading,
    updateSelectedMenu,

}
