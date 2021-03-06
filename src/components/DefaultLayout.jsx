import React from "react";
import styled from "styled-components";

const headerHeight = "70px";

const DefaultLayoutWrapper = styled.main`
  position: relative;
  width: 100%;
  height: calc(100vh - ${headerHeight});
  background-color: #fff;
  padding: 50px;
  font-family: "NEXON Lv1 Gothic OTF Light", sans-serif;
`;

const Main = styled.div`
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
