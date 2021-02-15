import { combineReducers, createStore, applyMiddleware } from "redux";
import todayReducer from "../../today/state";
import loginReducer from "../../header/state";
import thunk from "redux-thunk";

const reducer = combineReducers({
  data: todayReducer,
  login: loginReducer,
});

export default createStore(reducer, applyMiddleware(thunk));
