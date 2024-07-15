import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import searchSlice from "./slice/searchSlice";

const rootReducer = (asyncReducers) => ( state, action) => {
    const combinedReducer = combineReducers({
        auth: authSlice,
        search: searchSlice,
        ...asyncReducers,
    });

    return combinedReducer(state, action);
}

export default rootReducer;