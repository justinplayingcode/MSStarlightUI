import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer, { openLoading, closeLoading } from './common/loadingReducer';

const rootReducer = combineReducers({
    loading: loadingReducer,
    //add reducer here
});

export default rootReducer;
export {
    openLoading, closeLoading
}
