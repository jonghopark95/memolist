import createReducer from "../common/redux/createReducer";
import { memoColorPalette } from "../components/styles/commonStyle";

import firestore from "../firebase";

const SET = "memo/SET";
const ADD = "memo/ADD";
const REMOVE = "memo/REMOVE";
const EDIT = "memo/EDIT";
const DONE = "memo/DONE";

const getRandomNumber = (num) => {
  return Math.floor(Math.random() * Math.floor(num));
};

const initialMemoWidth = 300;
const initialMemoHeight = 200;

const DEFAULT_MEMO = {
  posX: 250,
  posY: 250,
  title: "",
  desc: "",
  status: "pending",
  width: initialMemoWidth,
  height: initialMemoHeight,
  color: "#fff",
};

const INITIAL_STATE = {
  memos: [
    {
      id: 0,
      width: initialMemoWidth,
      height: initialMemoHeight,
      posX: 50,
      posY: 50,
      color: "#000",
      title: "메모를 추가해보세요!!",
      status: "pending",
      desc: "오른쪽 + 버튼을 이용해 메모를 추가할 수 있습니다.",
      bg: memoColorPalette[3].bg,
      hd: memoColorPalette[3].hd,
    },
    {
      id: 1,
      width: initialMemoWidth,
      height: initialMemoHeight,
      posX: 150,
      posY: 180,
      color: "#000",
      title: "로그인 해보세요 !!",
      desc: "로그인 하시면 작성해 둔 메모가 저장됩니다.",
      status: "pending",
      bg: memoColorPalette[4].bg,
      hd: memoColorPalette[4].hd,
    },
    {
      id: 2,
      width: 550,
      height: 320,
      posX: 270,
      posY: 300,
      color: "#000",
      title: "메모를 클릭해 보세요 !!",
      desc:
        "1. 상단바를 이용해 메모의 위치를 변경할 수 있습니다. \n2. T버튼을 클릭하면 글자 색상을 변경할 수 있습니다.\n3. 팔레트 버튼을 클릭하면 메모 색상을 변경할 수 있습니다.\n4. 휴지통 버튼을 클릭하면 메모를 삭제할 수 있습니다.\n5. 작업을 완료하셨으면 체크 버튼을 누르세요. \n6. 메모의 가장자리에 커서를 가져다 대면 메모의 크기를 변경할 수 있습니다.(최소: 300px X 200px)",
      status: "pending",
      bg: memoColorPalette[14].bg,
      hd: memoColorPalette[14].hd,
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
export const doneMemo = ({ ...rest }) => ({
  type: DONE,
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
      case "done":
        const { title } = data;
        if (title !== "") {
          await firestore.collection("doneRecord").add({
            ...data,
            createdAt: Date.now(),
            creatorId: uid,
          });
        }

        break;
      default:
        throw Error;
    }
  }
};

const reducer = createReducer(INITIAL_STATE, {
  [SET]: (state, action) => {
    state.memos = action.data;
    state.loaded = true;
  },
  [ADD]: (state, action) => {
    const { uid } = action;
    let new_memo = { ...DEFAULT_MEMO };
    let rand_num = getRandomNumber(memoColorPalette.length);
    new_memo.bg = memoColorPalette[rand_num].bg;
    new_memo.hd = memoColorPalette[rand_num].hd;

    if (uid !== undefined) {
      let doc = firestore.collection(`memos-${uid}`).doc();
      new_memo.id = doc.id;
      doc.set(new_memo);
    } else {
      state.currentIndex = state.memos.length;
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
  [DONE]: (state, action) => {
    const { type, uid, ...rest } = action;
    if (uid !== undefined) {
      setStateDataToFb(uid, null, "done", rest);
    }
  },
});

export default reducer;
