import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as AddMemoSvg } from "../assets/add_memo.svg";
import LoadingMotion from "../components/loadingMotion";
import DefaultLayout from "../components/defaultLayout";
import { addMemo, setFbDataToState } from "./state";
import Memo from "../components/memo";
import { AddMemoBtn } from "./TodoContainer.style";
import { withRouter } from "react-router-dom";

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
