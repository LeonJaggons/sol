import { combineReducers } from "redux";
import appReducer from "./appReducer";
import messagesReducer from "./messagesReducer";
import postReducer from "./postReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    post: postReducer,
    messages: messagesReducer,
});
