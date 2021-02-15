import React from "react";
import {
  BottomWrapper,
  LabelBox,
  SNSLoginBtn,
  SNSLoginWrapper,
} from "../container/loginContainer.style";
import { ReactComponent as GoogleLogo } from "../../assets/login_page/google.svg";
import { ReactComponent as FacebookLogo } from "../../assets/login_page/facebook.svg";

const SNSLogin = ({ signup }) => {
  return (
    <BottomWrapper>
      <LabelBox size="sm" style={{ marginBottom: "30px" }}>
        OR
      </LabelBox>
      <LabelBox size="md">{signup ? "Sign up with" : "Login with"}</LabelBox>
      <SNSLoginWrapper>
        <SNSLoginBtn>
          <GoogleLogo />
        </SNSLoginBtn>
        <SNSLoginBtn>
          <FacebookLogo />
        </SNSLoginBtn>
      </SNSLoginWrapper>
    </BottomWrapper>
  );
};

export default SNSLogin;
