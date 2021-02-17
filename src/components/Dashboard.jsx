import React from "react";
import {
  DashboardWrapper,
  InnerSpan,
  Name,
  Photo,
  Title,
} from "./styles/Dashboard.style";

const Dashboard = ({ createdAt, displayName, photoURL, title, bg }) => {
  return (
    <DashboardWrapper bg={bg}>
      <Photo src={photoURL} />
      <InnerSpan>
        <Name>{displayName}</Name>님이
        <Title> {title}</Title> 를(을) 완료했습니다.
      </InnerSpan>
    </DashboardWrapper>
  );
};

export default Dashboard;
