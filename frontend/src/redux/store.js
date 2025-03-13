import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; 
import { authReducer } from "./reducers/authReducer";
import { taskReducer } from "./reducers/taskReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

window.store = store;

export default store;
