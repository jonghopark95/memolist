import createReducer from "../common/redux/createReducer";
import { memoColorPalette } from "../common/styles/commonStyle";

const ADD = "memo/ADD";
const REMOVE = "memo/REMOVE";
const EDIT_CONTENT = "memo/EDIT_CONTENT";
const EDIT_POS = "memo/EDIT_POS";

export const addMemo = ({ title, desc }) => ({ type: ADD, title, desc });
export const removeMemo = (memo_id) => ({ type: REMOVE, memo_id });
export const editMemoContent = ({ id, title, desc }) => ({
  type: EDIT_CONTENT,
  id,
  title,
  desc,
});
export const editMemoPos = ({ id, posX, posY }) => ({
  type: EDIT_POS,
  id,
  posX,
  posY,
});

const INITIAL_STATE = {
  memo: [
    {
      id: 0,
      posX: 0,
      posY: 0,
      title: "오늘 해야 할 일",
      desc: "1. 뭐해야 함 2. 뭐해야함",
      color: memoColorPalette[0],
    },
  ],
  currentIndex: 0,
};

const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => {
    state.currentIndex += 1;
    state.memo.push({
      id: state.currentIndex,
      posX: 0,
      posY: 0,
      title: action.title,
      desc: action.desc,
      color: memoColorPalette[state.currentIndex % memoColorPalette.length],
    });
  },
  [REMOVE]: (state, action) => {
    state.memo = state.memo.filter((memo) => memo.id !== action.memo_id);
  },
  [EDIT_CONTENT]: (state, action) => {
    const index = state.memo.findIndex((memo) => memo.id === action.id);
    if (index >= 0) {
      state.memo[index].title = action.title;
      state.memo[index].desc = action.desc;
    }
  },
  [EDIT_POS]: (state, action) => {
    const index = state.memo.findIndex((memo) => memo.id === action.id);
    if (index >= 0) {
      state.memo[index].posX = action.posX;
      state.memo[index].posY = action.posY;
    }
  },
});

export default reducer;
