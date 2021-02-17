import styled, { css } from "styled-components";

const headerHeight = "70px";
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

export const LoginScreenWrapper = styled.div`
  width: 300px;
  height: auto;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9999;
  padding: 15px;
  background-color: #2c3e50;
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
  height: 40px;
  width: 100%;
  background-color: white;
  ${putCenter};
  cursor: pointer;
  font-size: 15px;
`;

export const SNSLoginBtn = styled.button`
  all: unset;
  width: 100%;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  ${putCenter};
  svg {
    width: 20px;
    height: 20px;
    margin-right: 7px;
  }
  cursor: pointer;
`;

export const UserInteractionSection = styled.div`
  position: absolute;
  right: 0;
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 80px;
  line-height: ${headerHeight};
`;

export const UserInteractionSpan = styled.span`
  width: auto;
  height: 100%;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
`;

export const WelcomeMent = styled(UserInteractionSpan)`
  cursor: default;
`;

export const Picture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0px 15px;
`;
