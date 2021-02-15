import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import {
  LeftSide,
  LoginPageWrapper,
  RightSide,
} from "./loginContainer.style.jsx";

import TopLabel from "../component/topLabel";
import LoginForm from "../component/loginForm";
import SNSLogin from "../component/snsLogin";
import SignUp from "../component/signUp.jsx";

const LoginPage = ({ location: { pathname } }) => {
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    if (pathname.split("/")[2] !== undefined) {
      setSignup(true);
    } else {
      setSignup(false);
    }
  }, [signup, pathname]);

  return (
    <LoginPageWrapper>
      <LeftSide></LeftSide>
      <RightSide>
        {!signup && <SignUp />}
        <TopLabel signup={signup} />
        <LoginForm />
        <SNSLogin signup={signup} />
      </RightSide>
    </LoginPageWrapper>
  );
};

export default withRouter(LoginPage);
