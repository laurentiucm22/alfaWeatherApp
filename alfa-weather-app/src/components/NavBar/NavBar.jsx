import React from "react";
import Container from "../../UI/Container";
import Wrapper from "../../UI/Wrapper";
import Logo from "./Logo";
import { LogIn, LogOut } from "./Authentification";
import SearchMenu from "./SearchMenu";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isAuth = useSelector((state) => state.rootUi.isAuthenticate);

  return (
    <Container>
      <Wrapper className="w-4/5 m-auto">
        <nav className="flex items-center justify-between py-3">
          <Logo />
          <Container className="flex items-center">
            {isAuth ? <LogOut /> : <LogIn />}
            {isAuth && <SearchMenu />}
          </Container>
        </nav>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
