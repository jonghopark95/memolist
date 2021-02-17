import React from "react";
import {
  LabelBox,
  LoginScreenWrapper,
  SNSLoginBtn,
  SNSLoginWrapper,
} from "./styles/UserSection.style";
import { ReactComponent as GoogleLogo } from "../assets/login_page/google.svg";
import { ReactComponent as FacebookLogo } from "../assets/login_page/facebook.svg";
import { firebaseInstance, authService } from "../firebase";

const handleSNSLogin = async (e) => {
  const {
    target: { name },
  } = e;
  // provider 외부에 선언하고 재정의하면 에러남
  if (name === "google") {
    console.log("gg");
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  } else if (name === "facebook") {
    const provider = new firebaseInstance.auth.FacebookAuthProvider();
    await authService.signInWithPopup(provider);
  }
};

const LoginScreen = React.forwardRef((props, ref) => {
  return (
    <LoginScreenWrapper ref={ref}>
      <SNSLoginWrapper>
        <SNSLoginBtn name="google" onClick={handleSNSLogin}>
          <GoogleLogo />
          구글로 로그인
        </SNSLoginBtn>
      </SNSLoginWrapper>
    </LoginScreenWrapper>
  );
});

export default LoginScreen;
