import React from "react";
import {
  LabelBox,
  LoginScreenWrapper,
  SNSLoginBtn,
  SNSLoginWrapper,
} from "./styles/userSection.style";
import { ReactComponent as GoogleLogo } from "../assets/login_page/google.svg";
import { ReactComponent as FacebookLogo } from "../assets/login_page/facebook.svg";
import { firebaseInstance, authService } from "../firebase";

const handleSNSLogin = async (e) => {
  const {
    target: { name },
  } = e;
  let provider;
  if (name === "google") {
    provider = new firebaseInstance.auth.GoogleAuthProvider();
  } else if (name === "facebook") {
    provider = new firebaseInstance.auth.FacebookAuthProvider();
  }

  const data = await authService.signInWithPopup(provider);
  console.log(data);
};

const LoginScreen = React.forwardRef((props, ref) => {
  return (
    <LoginScreenWrapper ref={ref}>
      <LabelBox size="lg" bold>
        {/* {init && isLoggedIn ? "logout" : "login"} */}
        login
      </LabelBox>

      <LabelBox size="sm">You can store memo data after login!!</LabelBox>
      <SNSLoginWrapper>
        <SNSLoginBtn name="google" onClick={handleSNSLogin}>
          <GoogleLogo />
        </SNSLoginBtn>
        <SNSLoginBtn name="facebook" onClick={handleSNSLogin}>
          <FacebookLogo />
        </SNSLoginBtn>
      </SNSLoginWrapper>
    </LoginScreenWrapper>
  );
});

export default LoginScreen;
