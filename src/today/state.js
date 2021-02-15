import { useSelector } from "react-redux";
import createReducer from "../common/redux/createReducer";
import { memoColorPalette } from "../common/styles/commonStyle";
import firestore from "../firebase";

const GET = "memo/GET";
const SAVE = "memo/SAVE";
const SET = "memo/SET";
const ADD = "memo/ADD";
const REMOVE = "memo/REMOVE";
const EDIT_CONTENT = "memo/EDIT_CONTENT";
const EDIT_POS = "memo/EDIT_POS";

const INITIAL_STATE = {
  memos: [
    {
      id: 0,
      posX: 50,
      posY: 50,
      title: "환영합니다!!",
      desc:
        "로그인 하시면 작성한 메모들을 저장할 수 있습니다!\n\n오른쪽 + 버튼을 이용해 메모를 추가할 수 있습니다.",
      color: memoColorPalette[0],
    },
    {
      id: 1,
      posX: 200,
      posY: 200,
      title: "메모를 클릭해 보세요",
      desc:
        "1. 상단바를 이용해 메모의 위치를 변경할 수 있습니다. \n2. 휴지통 버튼을 클릭하면 메모를 삭제할 수 있습니다.\n3. 팔레트 버튼을 클릭하면 메모 색상을 변경할 수 있습니다.\n메모의 가장자리에 커서를 가져다 대면 메모의 크기를 변경할 수 있습니다.",
      color: memoColorPalette[1],
    },
  ],
  currentIndex: 0,
  loaded: false,
};

export const getMemo = (uid) => ({ type: GET, uid });
export const setMemo = (data) => ({ type: SET, data });
export const addMemo = ({ title, desc, uid }) => ({
  type: ADD,
  title,
  desc,
  uid,
});
export const removeMemo = (memo_id, uid) => ({ type: REMOVE, memo_id, uid });
export const editMemoContent = ({ id, title, desc, uid }) => ({
  type: EDIT_CONTENT,
  id,
  title,
  desc,
  uid,
});
export const editMemoPos = ({ id, posX, posY, uid }) => ({
  type: EDIT_POS,
  id,
  posX,
  posY,
  uid,
});

export const setFbDataToState = (uid) => {
  return (dispatch) => {
    return firestore
      .collection(`memos-${uid}`)
      .get()
      .then((snapshot) => {
        let fbMemos = [];

        snapshot.forEach((doc) => {
          // 저장된 메모가 있을 경우
          fbMemos.push(doc.data());
        });

        if (fbMemos.length === 0) {
          // 저장된 메모 없을 경우
          INITIAL_STATE.memos.forEach((memo) => {
            let doc = firestore.collection(`memos-${uid}`).doc();
            let updateMemo = { ...memo };
            updateMemo.id = doc.id;
            fbMemos.push(updateMemo);
            doc.set(updateMemo);
          });
        }

        dispatch(setMemo(fbMemos));
      })
      .catch((err) => console.log(err));
  };
};

const reducer = createReducer(INITIAL_STATE, {
  [SET]: (state, action) => {
    state.memos = action.data;
    state.currentIndex = action.data.length - 1;
    state.loaded = true;
  },
  [ADD]: (state, action) => {
    state.currentIndex += 1;

    let memo_dict = {
      id: state.currentIndex,
      posX: 50,
      posY: 50,
      title: action.title,
      desc: action.desc,
      color: memoColorPalette[state.currentIndex % memoColorPalette.length],
    };
    state.memos.push(memo_dict);
    // firestore에 추가
    if (action.uid !== undefined) {
      let doc = firestore.collection(`memos-${action.uid}`).doc();
      let updateMemo = { ...memo_dict };
      updateMemo.id = doc.id;
      doc.set(updateMemo);
    }
  },
  [REMOVE]: (state, action) => {
    state.memos = state.memos.filter((memo) => memo.id !== action.memo_id);
    firestore.collection(`memos-${action.uid}`).doc(action.memo_id).delete();
  },
  [EDIT_CONTENT]: (state, action) => {
    const index = state.memos.findIndex((memo) => memo.id === action.id);
    if (index >= 0) {
      state.memos[index].title = action.title;
      state.memos[index].desc = action.desc;
    }
    firestore.collection(`memos-${action.uid}`).doc(action.id).update({
      title: action.title,
      desc: action.desc,
    });
  },
  [EDIT_POS]: (state, action) => {
    const index = state.memos.findIndex((memo) => memo.id === action.id);
    if (index >= 0) {
      state.memos[index].posX = action.posX;
      state.memos[index].posY = action.posY;
    }
    firestore.collection(`memos-${action.uid}`).doc(action.id).update({
      posX: action.posX,
      posY: action.posY,
    });
  },
});

export default reducer;
