import createReducer from "../common/redux/createReducer";
import { memoColorPalette } from "../common/styles/commonStyle";
import firestore from "../firebase";

const GET = "memo/GET";
const SET = "memo/SET";
const ADD = "memo/ADD";
const REMOVE = "memo/REMOVE";
const EDIT_CONTENT = "memo/EDIT_CONTENT";
const EDIT_POS = "memo/EDIT_POS";
const EDIT_SIZE = "memo/EDIT_SIZE";

const INITIAL_STATE = {
  memos: [
    {
      id: 0,
      width: 400,
      height: 300,
      posX: 50,
      posY: 50,
      title: "환영합니다!!",
      desc:
        "로그인 하시면 작성한 메모들을 저장할 수 있습니다!\n\n오른쪽 + 버튼을 이용해 메모를 추가할 수 있습니다.",
      color: memoColorPalette[0],
    },
    {
      id: 1,
      width: 400,
      height: 300,
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
export const removeMemo = (id, uid) => ({ type: REMOVE, id, uid });
export const editMemoContent = ({ id, title, desc, uid }) => ({
  type: EDIT_CONTENT,
  id,
  title,
  desc,
  uid,
});
export const editMemoPos = ({ id, uid, posX, posY }) => ({
  type: EDIT_POS,
  id,
  uid,
  posX,
  posY,
});
export const editMemoSize = ({ id, width, height, uid }) => ({
  type: EDIT_SIZE,
  id,
  width,
  height,
  uid,
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
        let doc = firestore.collection(`memos-${uid}`).doc();
        let updateMemo = { ...data };
        updateMemo.id = doc.id;
        await doc.set(updateMemo);
        break;
      case "remove":
        await firestore.collection(`memos-${uid}`).doc(id).delete();
        break;
      case "edit":
        firestore.collection(`memos-${uid}`).doc(id).update(data);
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
    const { uid, id } = action;
    setStateDataToFb(uid, id, "add", memo_dict);
  },
  [REMOVE]: (state, action) => {
    state.memos = state.memos.filter((memo) => memo.id !== action.id);
    const { uid, id } = action;
    setStateDataToFb(uid, id, "remove", null);
  },
  [EDIT_CONTENT]: (state, action) => {
    const index = state.memos.findIndex((memo) => memo.id === action.id);
    if (index >= 0) {
      state.memos[index].title = action.title;
      state.memos[index].desc = action.desc;
    }
    const { uid, id, title, desc } = action;
    setStateDataToFb(uid, id, "edit", { title, desc });
  },
  [EDIT_POS]: (state, action) => {
    const index = state.memos.findIndex((memo) => memo.id === action.id);
    if (index >= 0) {
      state.memos[index].posX = action.posX;
      state.memos[index].posY = action.posY;
    }
    const { uid, id, posX, posY } = action;
    setStateDataToFb(uid, id, "edit", { posX, posY });
  },
  [EDIT_SIZE]: (state, action) => {
    const index = state.memos.findIndex((memo) => memo.id === action.id);
    if (index >= 0) {
      state.memos[index].width = action.width;
      state.memos[index].height = action.height;
    }
    const { uid, id, width, height } = action;
    setStateDataToFb(uid, id, "edit", { width, height });
  },
});

export default reducer;
