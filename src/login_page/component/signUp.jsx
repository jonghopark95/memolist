import React from "react";
import { SignUpButton, SignUpLink } from "../container/loginContainer.style";

const SignUp = () => {
  return (
    <>
      <SignUpLink to="/login/signup">
        <SignUpButton>Sign Up</SignUpButton>
      </SignUpLink>
    </>
  );
};

export default SignUp;
