import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  loginPageButtonColor,
  loginPageColor,
  loginPageInputColor,
} from "../../common/styles/commonStyle";

const leftSideWidth = "65%";
const labelBoxHeight = "40px";
const inputHeight = "40px";
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

export const LoginPageWrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 700px;
`;

export const LeftSide = styled.div`
  width: ${leftSideWidth};
  height: 100%;
  background-color: #fff;
`;

export const RightSide = styled.div`
  position: relative;
  width: calc(100% - ${leftSideWidth});
  height: 100%;
  background-color: ${loginPageColor};
  padding: 100px 60px;
`;

export const SignUpLink = styled(Link)`
  all: unset;
`;

export const SignUpButton = styled.button`
  all: unset;
  width: 100px;
  height: 20px;
  border-radius: 40px;
  border: 1px solid #fff;
  position: absolute;
  top: 30px;
  right: 60px;
  color: #fff;
  padding: 5px;
  cursor: pointer;
  ${putCenter};
`;

export const TopLabelWrapper = styled.div`
  width: 100%;
  height: auto;
`;

export const LoginFormWrapper = styled.form`
  height: 280px;
  width: 100%;
  margin: 20px 0px;
`;

export const BottomWrapper = styled.div`
  height: auto;
  width: 100%;
`;

export const LabelBox = styled.div`
  height: ${labelBoxHeight};
  line-height: ${labelBoxHeight};
  text-align: ${({ align }) => (align ? align : "center")};
  font-size: ${({ size }) => handleFontSize(size)};
  color: #fff;
  font-weight: ${({ bold }) => bold && "bold"};
`;

export const AlertMsg = styled(LabelBox)`
  text-align: left;
  font-size: 15px;
  color: red;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${inputHeight};
`;

export const InputLabel = styled.div`
  position: absolute;
  height: ${inputHeight};
  width: ${inputHeight};
  ${putCenter};
  svg {
    width: 50%;
    height: 50%;
    fill: #6b6b6b;
  }
`;

export const Input = styled.input.attrs(() => ({
  type: "text",
}))`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: ${inputHeight};
  padding: 5px ${inputHeight};
  color: #fff;
  background-color: ${loginPageInputColor};
  ::placeholder {
    color: #6b6b6b;
  }
`;

export const PwInput = styled(Input).attrs({
  type: "password",
})``;

export const SubmitInput = styled(Input).attrs({
  type: "submit",
})`
  background-color: ${loginPageButtonColor};
  border-radius: 30px;
  ${putCenter};
`;

export const SNSLoginWrapper = styled.div`
  height: auto;
  width: 100%;
  ${putCenter};
`;

export const SNSLoginBtn = styled.div`
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
`;
