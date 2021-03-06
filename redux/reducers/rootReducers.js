import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import { historyReducer } from "./historyReducer";
import { loadingReducer } from "./loadingReducer";
import { loginReducer } from "./loginReducer";
import { toastReducer } from "./toastReducer";
import { userReducer } from "./userReducer";
// COMBINED REDUCERS
const reducers = {
  history: historyReducer,
  isLoading: loadingReducer,
  login: loginReducer,
  user: userReducer,
  toast: toastReducer,
  error: errorReducer,
};

export default combineReducers(reducers);
