import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMemo, setFbDataToState } from "./state";
import { AddMemoBtn } from "./TodoContainer.style";
import { ReactComponent as AddMemoSvg } from "../assets/add_memo.svg";
import LoadingMotion from "../components/LoadingMotion";
import DefaultLayout from "../components/DefaultLayout";
import Memo from "../components/Memo";

const AddMemo = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.login.uid) || undefined;

  return (
    <AddMemoBtn onClick={() => dispatch(addMemo({ title: "", desc: "", uid }))}>
      <AddMemoSvg />
    </AddMemoBtn>
  );
};

const Todo = (props) => {
  const {
    location: { pathname },
  } = props;
  const dispatch = useDispatch();
  const { uid, isLoggedIn } = useSelector((state) => state.login);
  const { memos, loaded } = useSelector((state) => state.data);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setFbDataToState(uid));
    }
  }, [dispatch, isLoggedIn, uid]);

  const path = pathname.split("/")[2];

  const memoSet = (path) => {
    if (path === "todo") {
      return memos.filter((memo) => memo.status === "pending");
    } else {
      return memos.filter((memo) => memo.status === "complete");
    }
  };

  console.log(memos);

  return (
    <DefaultLayout>
      {path === "todo" && <AddMemo />}
      {isLoggedIn === "pending" && <LoadingMotion />}
      {isLoggedIn === false &&
        memoSet(path).map(({ id }) => <Memo key={id} id={id} />)}
      {isLoggedIn === true &&
        loaded &&
        memoSet(path).map(({ id }) => <Memo key={id} id={id} />)}
    </DefaultLayout>
  );
};

export default withRouter(Todo);
