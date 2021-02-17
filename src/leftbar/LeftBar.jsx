import React from "react";
import { LBAmount, LBIcon, LBItem, LBLabel, LBWrapper } from "./LeftBar.style";
import Today from "../assets/leftbar/today.svg";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftBarItem = withRouter(
  ({ to, icon, label, amount, location: { pathname } }) => {
    return (
      <LBItem to={to}>
        <LBIcon src={icon}></LBIcon>
        <LBLabel isMatched={to === pathname ? true : false}>{label}</LBLabel>
        <LBAmount>{amount}</LBAmount>
      </LBItem>
    );
  }
);

const LeftBar = () => {
  const { memos, loaded } = useSelector((state) => state.data);
  const todayAmount = memos.filter((memo) => memo.status === "pending").length;

  return (
    <LBWrapper>
      <LeftBarItem
        to="/home/today"
        icon={Today}
        label="Today"
        amount={loaded ? todayAmount : ""}
      />
    </LBWrapper>
  );
};

export default LeftBar;
