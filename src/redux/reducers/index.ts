import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer, { openLoading, closeLoading } from './common/loadingReducer';
import navigationReducer, {updateSelectedMenu} from './common/navigationReducer';
import userReducer, { setInfoUser, setRole, setUserId } from './common/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    loading: loadingReducer,
    navigation: navigationReducer

});

export default rootReducer;

export {
    setRole, setUserId, setInfoUser,
    openLoading, closeLoading,
    updateSelectedMenu,

}
