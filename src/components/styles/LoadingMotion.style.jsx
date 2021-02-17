import styled, { keyframes } from "styled-components";
import { leftBarColor } from "../../common/styles/commonStyle";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DotBox = styled.div`
  width: 80px;
  height: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  animation: 0.5s ${rotate} infinite ease-in-out;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${leftBarColor};
  border-radius: 50%;
`;
