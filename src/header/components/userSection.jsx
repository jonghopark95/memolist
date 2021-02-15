import React, { useEffect, useRef } from "react";
import {
  UserInteractionSection,
  UserInteractionSpan,
} from "./userSection.style";
import useClicked from "../../common/hooks/useClicked";
import LoginPage from "./loginScreen";
import { authService } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeLogAction, changeLogCallbackStatus } from "../state";

const UserSection = () => {
  const LoginScreenRef = useRef();
  const { clicked, setClicked } = useClicked(LoginScreenRef);

  const { after_log_callback, is_logged_in } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(changeLogAction(user.uid, true));
      } else dispatch(changeLogAction(false));
    });
    dispatch(changeLogCallbackStatus(true));
  }, [dispatch]);

  const handleOnClick = () => {
    if (is_logged_in) {
      authService.signOut();
    } else {
      setClicked(true);
    }
  };

  return (
    <UserInteractionSection>
      <UserInteractionSpan onClick={handleOnClick}>
        {after_log_callback && is_logged_in ? "로그아웃" : "로그인"}
      </UserInteractionSpan>
      {!is_logged_in && clicked && <LoginPage ref={LoginScreenRef} />}
    </UserInteractionSection>
  );
};

export default UserSection;
