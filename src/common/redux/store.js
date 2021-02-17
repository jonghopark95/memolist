import { combineReducers, createStore, applyMiddleware } from "redux";
import todoReducer from "../../todo/state";
import loginReducer from "../../header/state";
import thunk from "redux-thunk";

const reducer = combineReducers({
  data: todoReducer,
  login: loginReducer,
});

export default createStore(reducer, applyMiddleware(thunk));
