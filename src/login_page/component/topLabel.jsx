import React from "react";
import { LabelBox, TopLabelWrapper } from "../container/loginContainer.style";

const TopLabel = ({ signup }) => {
  return (
    <TopLabelWrapper>
      <LabelBox size="lg" bold>
        {signup ? "Welcome !" : "Let's get over today!"}
      </LabelBox>
      <LabelBox size="md">
        {signup ? "Join our Service!!" : "Sign in to your account"}
      </LabelBox>
    </TopLabelWrapper>
  );
};

export default TopLabel;
