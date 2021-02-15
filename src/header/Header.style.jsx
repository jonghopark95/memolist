import { Link } from "react-router-dom";
import styled from "styled-components";

export const headerHeight = "70px";

export const HeaderWrapper = styled.header`
  width: 100%;
  height: ${headerHeight};
  background-color: #34495e;
  display: flex;
  position: relative;
`;

export const Logo = styled.div`
  line-height: ${headerHeight};
  color: #ecf0f1;
  width: 20%;
  padding-left: 40px;
  font-size: 30px;
  font-family: "Benne", serif;
`;

export const SLink = styled(Link)`
  width: 40px;
  height: 100%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-decoration: none;
`;
