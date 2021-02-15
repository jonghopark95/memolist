import styled, { css } from "styled-components";
import { headerHeight } from "../Header.style";

const labelBoxHeight = "40px";
const fontColor = "#fff";
const handleFontSize = (size) => {
  switch (size) {
    case "sm":
      return "12px";
    case "md":
      return "18px";
    case "lg":
      return "25px";
    default:
      return "12px";
  }
};
const putCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginScreen = styled.div`
  width: 300px;
  height: 200px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9999;
  padding: 30px;
  background-color: #2c3e50;
`;

export const UserInteractionSection = styled.div`
  width: 20%;
  padding-right: 80px;
  line-height: ${headerHeight};
  text-align: right;
  position: absolute;
  right: 0;
`;

export const LabelBox = styled.div`
  height: ${labelBoxHeight};
  line-height: ${labelBoxHeight};
  text-align: ${({ align }) => (align ? align : "center")};
  font-size: ${({ size }) => handleFontSize(size)};
  color: ${fontColor};
  font-weight: ${({ bold }) => bold && "bold"};
`;

export const SNSLoginWrapper = styled.div`
  height: auto;
  width: 100%;
  ${putCenter};
`;

export const SNSLoginBtn = styled.button`
  all: unset;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  ${putCenter};
  svg {
    width: 50%;
    height: 50%;
  }
  margin: 5px 20px;
  cursor: pointer;
`;

export const UserInteractionSpan = styled.span`
  width: 40px;
  height: 100%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;
