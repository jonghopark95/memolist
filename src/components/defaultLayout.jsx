import React from "react";
import styled from "styled-components";

const headerHeight = "70px";

const DefaultLayoutWrapper = styled.main`
  position: relative;
  width: 100%;
  height: calc(100vh - ${headerHeight});
  background-color: #fff;
  padding: 50px;
`;

const Main = styled.div`
  /* height: calc(100% - 80px); */
  height: 100%;
`;

const DefaultLayout = ({ children }) => {
  return (
    <DefaultLayoutWrapper>
      <Main>{children}</Main>
    </DefaultLayoutWrapper>
  );
};

export default DefaultLayout;
