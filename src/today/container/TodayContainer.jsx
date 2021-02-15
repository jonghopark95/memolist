import React, { useEffect } from "react";
import DefaultLayout from "../../common/defaultLayout";
import { ReactComponent as AddMemoSvg } from "../../assets/add_memo.svg";
import Memo from "../component/Memo";
import { AddMemoBtn } from "./TodayContainer.style";
import { useDispatch, useSelector } from "react-redux";
import { addMemo, getMemo } from "../state";

const AddMemo = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.login.uid);

  return (
    <AddMemoBtn
      onClick={() => {
        dispatch(addMemo({ uid, title: "", desc: "" }));
      }}
    >
      <AddMemoSvg />
    </AddMemoBtn>
  );
};

const Today = () => {
  // console.log(memos);
  const uid = useSelector((state) => state.login.uid);

  return (
    <DefaultLayout>
      <AddMemo />
      {/* {memos && memos.map(({ id }) => <Memo key={id} id={id} />)} */}
    </DefaultLayout>
  );
};

export default Today;
