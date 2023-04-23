import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer, { openLoading, closeLoading } from './common/loadingReducer';
import navigationReducer, {updateSelectedMenu} from './common/navigationReducer';

const rootReducer = combineReducers({
    loading: loadingReducer,
    navigation: navigationReducer
    //add reducer here
});

export default rootReducer;
export {
    openLoading, closeLoading,
    updateSelectedMenu

}
