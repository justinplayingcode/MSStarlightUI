import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer, { openLoading, closeLoading } from './common/loadingReducer';

const rootReducer = combineReducers({
    loading: loadingReducer,
});

export default rootReducer;
export {
    openLoading, closeLoading
}
