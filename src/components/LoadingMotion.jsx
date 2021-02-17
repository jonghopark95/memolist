import React from "react";
import { LoadingWrapper, DotBox, Dot } from "./styles/LoadingMotion.style";

const LoadingMotion = () => {
  return (
    <LoadingWrapper>
      <DotBox>
        <Dot />
        <Dot />
        <Dot />
      </DotBox>
    </LoadingWrapper>
  );
};

export default LoadingMotion;
