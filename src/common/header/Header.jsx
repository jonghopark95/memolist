import React from "react";
import {
  HeaderWrapper,
  Logo,
  SLink,
  UserInteractionSection,
} from "./Header.style";

const UserSection = () => {
  return (
    <UserInteractionSection>
      <SLink to="/login">로그인</SLink>
    </UserInteractionSection>
  );
};

const Header = () => {
  return (
    <HeaderWrapper>
      <SLink to="/">
        <Logo>memolist</Logo>
      </SLink>
      <UserSection />
    </HeaderWrapper>
  );
};

export default Header;
