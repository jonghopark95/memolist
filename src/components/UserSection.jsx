import React, { useEffect, useRef } from "react";
import {
  UserInteractionSection,
  UserInteractionSpan,
} from "./styles/UserSection.style";
import useClicked from "../common/hooks/useClicked";
import LoginPage from "./LoginScreen";
import { authService } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeLogAction } from "../header/state";
import { useHistory } from "react-router-dom";

const UserSection = () => {
  const LoginScreenRef = useRef();
  const { clicked, setClicked } = useClicked(LoginScreenRef);

  const { isLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(changeLogAction(user.uid, true));
      } else dispatch(changeLogAction(null, false));
    });
  }, [dispatch]);

  const handleOnClick = () => {
    if (isLoggedIn) {
      authService.signOut();
      history.go(0);
    } else {
      setClicked(true);
    }
  };

  return (
    <UserInteractionSection>
      <UserInteractionSpan onClick={handleOnClick}>
        {isLoggedIn === "pending" && ""}
        {!isLoggedIn && "로그인"}
        {isLoggedIn === true && "로그아웃"}
      </UserInteractionSpan>
      {!isLoggedIn && clicked && <LoginPage ref={LoginScreenRef} />}
    </UserInteractionSection>
  );
};

export default UserSection;
