import React from "react";
import {
  AlertMsg,
  Input,
  InputLabel,
  InputWrapper,
  LabelBox,
  LoginFormWrapper,
  PwInput,
  SubmitInput,
} from "../container/loginContainer.style";
import { ReactComponent as User } from "../../assets/login_page/user.svg";
import { ReactComponent as Locker } from "../../assets/login_page/locker.svg";

const LoginForm = () => {
  return (
    <LoginFormWrapper>
      <LabelBox size="sm" align="left">
        Username
      </LabelBox>
      <InputWrapper>
        <InputLabel>
          <User />
        </InputLabel>
        <Input placeholder="login" />
      </InputWrapper>
      <AlertMsg>로그인 실패</AlertMsg>
      <LabelBox size="sm" align="left">
        Password
      </LabelBox>
      <InputWrapper>
        <InputLabel>
          <Locker />
        </InputLabel>
        <PwInput placeholder="password" />
      </InputWrapper>
      <AlertMsg></AlertMsg>
      <SubmitInput value="확인" />
    </LoginFormWrapper>
  );
};

export default LoginForm;
