import React from "react";
import DefaultLayout from "../../common/defaultLayout";
import { ReactComponent as AddMemoSvg } from "../../assets/add_memo.svg";
import Memo from "../component/Memo";
import { AddMemoBtn } from "./TodayContainer.style";
import { useDispatch, useSelector } from "react-redux";
import { addMemo } from "../state";

const AddMemo = () => {
  const dispatch = useDispatch();

  return (
    <AddMemoBtn onClick={() => dispatch(addMemo({ title: "", desc: "" }))}>
      <AddMemoSvg />
    </AddMemoBtn>
  );
};

const Today = () => {
  const memos = useSelector((state) => state.memo);
  console.log(memos);
  return (
    <DefaultLayout>
      <AddMemo />
      {memos && memos.map(({ id }) => <Memo key={id} id={id} />)}
    </DefaultLayout>
  );
};

export default Today;
