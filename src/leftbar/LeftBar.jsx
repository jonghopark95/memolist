import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { LBAmount, LBIcon, LBItem, LBLabel, LBWrapper } from "./LeftBar.style";
import Todo from "../assets/todo.svg";
import Done from "../assets/done.svg";

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
  const { isLoggedIn } = useSelector((state) => state.login);

  const amount = (status) => {
    if (isLoggedIn === false) {
      return memos.filter((memo) => memo.status === status).length;
    } else if (isLoggedIn === true) {
      if (loaded) return memos.filter((memo) => memo.status === status).length;
    } else {
      return "";
    }
  };

  return (
    <LBWrapper>
      <LeftBarItem
        to="/home/todo"
        icon={Todo}
        label="Todo"
        amount={amount("pending")}
      />
      <LeftBarItem
        to="/home/done"
        icon={Done}
        label="Done"
        amount={amount("complete")}
      />
    </LBWrapper>
  );
};

export default LeftBar;
