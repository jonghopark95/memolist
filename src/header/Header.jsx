import React from "react";
import UserSection from "../components/UserSection";
import { HeaderWrapper, Logo, SLink } from "./Header.style";

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
