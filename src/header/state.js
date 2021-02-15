import createReducer from "../common/redux/createReducer";

const LOG_ACTION = "user/LOG_ACTION";
const AFTER_LOGIN_CALLBACK = "user/AFTER_LOGIN_CALLBACK";

export const changeLogAction = (bool) => ({ type: LOG_ACTION, bool });
export const changeLogCallbackStatus = (bool) => ({
  type: AFTER_LOGIN_CALLBACK,
  bool,
});

const INITIAL_STATE = {
  after_log_callback: false,
  is_logged_in: false,
  uid: null,
};

const reducer = createReducer(INITIAL_STATE, {
  [LOG_ACTION]: (state, action) => {
    state.is_logged_in = action.bool;
  },
  [AFTER_LOGIN_CALLBACK]: (state, action) => {
    state.after_log_callback = action.bool;
  },
});

export default reducer;
