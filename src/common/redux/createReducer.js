import produce from "immer";

const createReducer = (initialState, handlerMap) => {
  return (state = initialState, action) => {
    return produce(state, (draft) => {
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  };
};

export default createReducer;
