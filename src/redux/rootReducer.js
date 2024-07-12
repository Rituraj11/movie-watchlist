import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";

const rootReducer = (asyncReducers) => ( state, action) => {
    const combinedReducer = combineReducers({
        auth: authSlice,
        ...asyncReducers,
    });

    return combinedReducer(state, action);
}

export default rootReducer;