import React from "react";
import DefaultLayout from "../../common/defaultLayout";
import { ReactComponent as AddMemoSvg } from "../../assets/add_memo.svg";
import Memo from "../component/Memo";
import { AddMemoBtn } from "./TodayContainer.style";

const AddMemo = () => {
  return (
    <AddMemoBtn>
      <AddMemoSvg />
    </AddMemoBtn>
  );
};

const Today = () => {
  return (
    <DefaultLayout>
      <AddMemo />
      <Memo title="오늘 해야 할 일" desc="1. 뭐해야 함 2. 뭐해야함" />
      {/* <Memo style={{top:"50px", right:"60px"}} title="내일 해야 할 일" desc="1. 뭐해야 함 2. 뭐해야함" /> */}
    </DefaultLayout>
  );
};

export default Today;
