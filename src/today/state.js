import { useSelector } from "react-redux";
import createReducer from "../common/redux/createReducer";
import { memoColorPalette } from "../common/styles/commonStyle";

const GET = "memo/GET";
const ADD = "memo/ADD";
const REMOVE = "memo/REMOVE";
const EDIT_CONTENT = "memo/EDIT_CONTENT";
const EDIT_POS = "memo/EDIT_POS";

export const getMemo = (uid) => ({ type: GET, uid });
export const addMemo = ({ uid, title, desc }) => ({
  type: ADD,
  uid,
  title,
  desc,
});
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
      title: "환영합니다!!",
      desc:
        "로그인 하시면 작성한 메모들을 저장할 수 있습니다!\n\n오른쪽 + 버튼을 이용해 메모를 추가할 수 있습니다.\n메모를 클릭 후, \n1. 상단바를 이용해 메모의 위치를 변경할 수 있습니다. \n2. 휴지통 버튼을 클릭하면 메모를 삭제할 수 있습니다.\n3. 팔레트 버튼을 클릭하면 메모 색상을 변경할 수 있습니다.\n메모의 가장자리에 커서를 가져다 대면 메모의 크기를 변경할 수 있습니다.",
      color: memoColorPalette[0],
    },
  ],
  currentIndex: 0,
};

const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => {
    state.currentIndex += 1;
    let memo_dict = {
      id: state.currentIndex,
      posX: 0,
      posY: 0,
      title: action.title,
      desc: action.desc,
      color: memoColorPalette[state.currentIndex % memoColorPalette.length],
    };
    state.memo.push(memo_dict);
    // dbService.collection(`memos-${action.uid}`).add({
    //   uid: action.uid,
    //   memo_dict,
    //   createdAt: Date.now(),
    // });
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
