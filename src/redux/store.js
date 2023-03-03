import { createStore } from "redux";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});
export default store;
