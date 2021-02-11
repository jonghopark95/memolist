import React from "react";
import { LBAmount, LBIcon, LBItem, LBLabel, LBWrapper } from "./LeftBar.style";
import Today from "../../assets/leftbar/today.svg";
import { withRouter } from "react-router-dom";

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
  return (
    <LBWrapper>
      <LeftBarItem to="/today" icon={Today} label="Today" amount="8" />
      <LeftBarItem to="/month" icon={Today} label="Month" amount="8" />
      {/* <LeftBarItem to="/next" icon={Today} label="Next 7 Days" amount="8" /> */}
    </LBWrapper>
  );
};

export default LeftBar;
