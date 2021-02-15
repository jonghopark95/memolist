import createReducer from "../common/redux/createReducer";

const LOG_ACTION = "user/LOG_ACTION";
const INIT = "user/INIT";

export const changeLogAction = (uid, loggedIn) => ({
  type: LOG_ACTION,
  uid,
  loggedIn,
});
export const setInit = (init) => ({ type: INIT, init });

const INITIAL_STATE = {
  isLoggedIn: "pending",
  uid: null,
  init: false,
};

const reducer = createReducer(INITIAL_STATE, {
  [LOG_ACTION]: (state, action) => {
    state.uid = action.uid;
    state.isLoggedIn = action.loggedIn;
  },
  [INIT]: (state, action) => {
    state.init = action.init;
  },
});

export default reducer;
