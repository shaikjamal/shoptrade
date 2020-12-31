import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import mainReducer from "./reducer";
import history from '../store/history';

const appReducer = combineReducers({
    mainReducer,
  router: connectRouter(history)
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;