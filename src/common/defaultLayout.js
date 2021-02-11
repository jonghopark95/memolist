import React from "react";
import styled from "styled-components";
import { headerHeight } from "./header/Header.style";

const DefaultLayoutWrapper = styled.main`
  position: relative;
  width: 100%;
  height: calc(100vh - ${headerHeight});
  background-color: #fff;
  padding: 50px;
`;

const Title = styled.div`
  height: 80px;
  font-size: 40px;
`;

const Main = styled.div`
  /* height: calc(100% - 80px); */
  height: 100%;
`;

const DefaultLayout = ({ children, onClick }) => {
  return (
    <DefaultLayoutWrapper onClick={onClick}>
      {/* <Title>{title}</Title> */}
      <Main>{children}</Main>
    </DefaultLayoutWrapper>
  );
};

export default DefaultLayout;
