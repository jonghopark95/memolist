import React, { useEffect } from "react";
import DefaultLayout from "../../common/defaultLayout";
import { ReactComponent as AddMemoSvg } from "../../assets/add_memo.svg";
import Memo from "../component/Memo";
import { AddMemoBtn } from "./TodayContainer.style";
import { useDispatch, useSelector } from "react-redux";
import { addMemo, setFbDataToState } from "../state";

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
      {!loaded && "로딩 애니메이션"}
      {loaded && memos && memos.map(({ id }) => <Memo key={id} id={id} />)}
    </DefaultLayout>
  );
};

export default Today;
