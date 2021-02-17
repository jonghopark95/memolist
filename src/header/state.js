import createReducer from "../common/redux/createReducer";

const LOG_ACTION = "user/LOG_ACTION";
const INIT = "user/INIT";

export const changeLogAction = ({
  uid,
  displayName,
  photoURL,
  isLoggedIn,
}) => ({
  type: LOG_ACTION,
  uid,
  displayName,
  photoURL,
  isLoggedIn,
});
export const setInit = (init) => ({ type: INIT, init });

const INITIAL_STATE = {
  isLoggedIn: "pending",
  init: false,
  uid: null,
  displayName: null,
  photoURL: null,
};

const reducer = createReducer(INITIAL_STATE, {
  [LOG_ACTION]: (state, action) => {
    state.uid = action.uid;
    state.displayName = action.displayName;
    state.photoURL = action.photoURL;
    state.isLoggedIn = action.isLoggedIn;
  },
  [INIT]: (state, action) => {
    state.init = action.init;
  },
});

export default reducer;
