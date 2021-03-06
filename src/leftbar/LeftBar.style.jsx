import { Link } from "react-router-dom";
import styled from "styled-components";
import { leftBarBgColor } from "../components/styles/commonStyle";

const headerHeight = "70px";

export const LBWrapper = styled.div`
  height: calc(100vh - ${headerHeight});
  width: 400px;
  padding: 40px;
  background-color: ${leftBarBgColor};
  font-family: "NEXON Lv1 Gothic OTF Light", sans-serif;
`;

export const LBItem = styled(Link)`
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  color: #000;
  text-decoration: none;
`;

export const LBIcon = styled.img`
  width: 40px;
`;

export const LBLabel = styled.div`
  width: auto;
  padding: 0px 20px;
  font-weight: ${(props) => props.isMatched && "bold"};
`;

export const LBAmount = styled.div`
  width: 10%;
  color: #b2b2b2;
`;
