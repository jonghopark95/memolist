import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as AddMemoSvg } from "../assets/add_memo.svg";
import LoadingMotion from "../components/loadingMotion";
import DefaultLayout from "../components/defaultLayout";
import { addMemo, setFbDataToState } from "./state";
import Memo from "../components/memo";
import { AddMemoBtn } from "./TodayContainer.style";

const AddMemo = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.login.uid) || undefined;

  return (
    <AddMemoBtn onClick={() => dispatch(addMemo({ title: "", desc: "", uid }))}>
      <AddMemoSvg />
    </AddMemoBtn>
  );
};

const Today = () => {
  const dispatch = useDispatch();
  const { uid, isLoggedIn } = useSelector((state) => state.login);
  const { memos, loaded } = useSelector((state) => state.data);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setFbDataToState(uid));
    }
  }, [dispatch, isLoggedIn, uid]);

  return (
    <DefaultLayout>
      <AddMemo />
      {isLoggedIn === "pending" && <LoadingMotion />}
      {isLoggedIn === false && memos.map(({ id }) => <Memo key={id} id={id} />)}
      {isLoggedIn === true &&
        loaded &&
        memos.map(({ id }) => <Memo key={id} id={id} />)}
    </DefaultLayout>
  );
};

export default Today;
