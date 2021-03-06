import React, { useEffect, useRef } from "react";
import {
  Picture,
  UserInteractionSection,
  UserInteractionSpan,
  WelcomeMent,
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

  const { displayName, photoURL, isLoggedIn } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;
        dispatch(
          changeLogAction({ uid, displayName, photoURL, isLoggedIn: true })
        );
      } else
        dispatch(
          changeLogAction({
            uid: null,
            displayName: null,
            photoURL: null,
            isLoggedIn: false,
          })
        );
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
      {isLoggedIn === true && (
        <>
          <WelcomeMent>환영합니다 {displayName}님! </WelcomeMent>
          <Picture src={photoURL} />
        </>
      )}
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
