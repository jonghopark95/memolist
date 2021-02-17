import React from "react";
import {
  DashboardWrapper,
  InnerSpan,
  Name,
  Photo,
  Title,
} from "./styles/Dashboard.style";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Photo />
      <InnerSpan>
        <Name>박종호</Name>님이
        <Title> 오늘 해야할 것</Title> 을 완료했습니다.
      </InnerSpan>
    </DashboardWrapper>
  );
};

export default Dashboard;
