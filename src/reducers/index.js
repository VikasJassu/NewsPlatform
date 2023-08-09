import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice"
import saveNewsReducer from "../redux/slices/saveNewsSlice";
import profileReducer from "../redux/slices/profileSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    saved: saveNewsReducer,
    profile: profileReducer,
})

export default rootReducer