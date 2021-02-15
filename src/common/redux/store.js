import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import {
  reduxFirestore,
  getFiresstore,
  firestoreReducer,
} from "redux-firestore";
// import thunk from "redux-thunk";
import firebase from "../../firebase";
import loginReducer from "../../header/state";

const createStoreWithFirebase = compose(reduxFirestore(firebase))(createStore);
const reducer = combineReducers({
  // memos: todayReducer,
  firestore: firestoreReducer,
  login: loginReducer,
});

const initialState = {};
export default createStoreWithFirebase(reducer, initialState);

// export default createStore(
//   reducer,
//   compose(
//     applyMiddleware(thunk.withExtraArgument({ getFiresstore })),
//     reduxFirestore(firebase)
//   )
// );
