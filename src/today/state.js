import createReducer from "../common/redux/createReducer";
import { memoColorPalette } from "../components/styles/commonStyle";

import firestore from "../firebase";

const SET = "memo/SET";
const ADD = "memo/ADD";
const REMOVE = "memo/REMOVE";
const EDIT = "memo/EDIT";

const getRandomNumber = (num) => {
  return Math.floor(Math.random() * Math.floor(num));
};

const initialMemoWidth = 300;
const initialMemoHeight = 200;

const DEFAULT_MEMO = {
  posX: 50,
  posY: 50,
  title: "",
  desc: "",
  width: initialMemoWidth,
  height: initialMemoHeight,
};

const INITIAL_STATE = {
  memos: [
    {
      id: 0,
      width: initialMemoWidth,
      height: initialMemoHeight,
      posX: 50,
      posY: 50,
      title: "환영합니다!!",
      desc:
        "로그인 하시면 작성한 메모들을 저장할 수 있습니다!\n\n오른쪽 + 버튼을 이용해 메모를 추가할 수 있습니다.",
      bg: memoColorPalette[1].bg,
      hd: memoColorPalette[1].hd,
    },
    {
      id: 1,
      width: 400,
      height: 250,
      posX: 200,
      posY: 200,
      title: "메모를 클릭해 보세요",
      desc:
        "1. 상단바를 이용해 메모의 위치를 변경할 수 있습니다. \n2. 휴지통 버튼을 클릭하면 메모를 삭제할 수 있습니다.\n3. 팔레트 버튼을 클릭하면 메모 색상을 변경할 수 있습니다.\n\n메모의 가장자리에 커서를 가져다 대면 메모의 크기를 변경할 수 있습니다.",
      bg: memoColorPalette[3].bg,
      hd: memoColorPalette[3].hd,
    },
  ],
  currentIndex: 0,
  loaded: false,
};

export const setMemo = (data) => ({ type: SET, data });
export const addMemo = ({ title, desc, uid }) => ({
  type: ADD,
  title,
  desc,
  uid,
});
export const removeMemo = (id, uid) => ({ type: REMOVE, id, uid });
export const editMemo = ({ id, ...rest }) => ({
  type: EDIT,
  id,
  ...rest,
});

export const setFbDataToState = (uid) => {
  return (dispatch) => {
    if (uid !== null) {
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
    }
  };
};

const setStateDataToFb = async (uid, id, type, data) => {
  if (uid !== undefined) {
    switch (type) {
      case "add":
        break;
      case "remove":
        await firestore.collection(`memos-${uid}`).doc(id).delete();
        break;
      case "edit":
        await firestore.collection(`memos-${uid}`).doc(id).update(data);
        break;
      default:
        throw Error;
    }
  }
};

const reducer = createReducer(INITIAL_STATE, {
  [SET]: (state, action) => {
    state.memos = action.data;
    state.currentIndex = action.data.length - 1;
    state.loaded = true;
  },
  [ADD]: (state, action) => {
    const { uid } = action;
    let new_memo = { ...DEFAULT_MEMO };
    new_memo.color = memoColorPalette[getRandomNumber(memoColorPalette.length)];

    if (uid !== undefined) {
      let doc = firestore.collection(`memos-${uid}`).doc();
      new_memo.id = doc.id;
      doc.set(new_memo);
    } else {
      state.currentIndex += 1;
      new_memo.id = state.currentIndex;
    }

    state.memos.push(new_memo);
  },
  [REMOVE]: (state, action) => {
    const { uid, id } = action;
    state.memos = state.memos.filter((memo) => memo.id !== id);
    if (uid !== undefined) {
      setStateDataToFb(uid, id, "remove", null);
    }
  },
  [EDIT]: (state, action) => {
    const { type, uid, id, ...rest } = action;

    const index = state.memos.findIndex((memo) => memo.id === id);
    if (index >= 0) {
      for (const [key, value] of Object.entries(rest)) {
        state.memos[index][key] = value;
      }
    }

    if (uid !== undefined) {
      setStateDataToFb(uid, id, "edit", rest);
    }
  },
});

export default reducer;
