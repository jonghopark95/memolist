import React, { useEffect, useRef } from "react";
import {
  UserInteractionSection,
  UserInteractionSpan,
} from "./userSection.style";
import useClicked from "../../common/hooks/useClicked";
import LoginPage from "./loginScreen";
import { authService } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeLogAction, setInit } from "../state";

const UserSection = () => {
  const LoginScreenRef = useRef();
  const { clicked, setClicked } = useClicked(LoginScreenRef);

  const { isLoggedIn } = useSelector((state) => state.login);
  const { loaded } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(changeLogAction(user.uid, true));
      } else dispatch(changeLogAction(null, false));
    });
    dispatch(setInit(true));
  }, [dispatch]);

  const handleOnClick = () => {
    if (isLoggedIn) {
      authService.signOut();
    } else {
      setClicked(true);
    }
  };

  return (
    <UserInteractionSection>
      <UserInteractionSpan onClick={handleOnClick}>
        {!loaded && ""}
        {loaded && isLoggedIn && "로그아웃"}
        {loaded && !isLoggedIn && "로그인"}
      </UserInteractionSpan>
      {!isLoggedIn && clicked && <LoginPage ref={LoginScreenRef} />}
    </UserInteractionSection>
  );
};

export default UserSection;
