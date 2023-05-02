import React from "react";
import Container from "../../UI/Container";
import Wrapper from "../../UI/Wrapper";
import Logo from "./Logo";
import Authentification from "../Authentification/Authentification";

const NavBar = () => {
  const navBarStyle = {
    navBarWrapper: "w-11/12 md:w-4/5 m-auto",
    nav: "flex items-center justify-between py-2",
  };

  return (
    <Container>
      <Wrapper className={navBarStyle.navBarWrapper}>
        <nav className={navBarStyle.nav}>
          <Logo />
          <Authentification />
        </nav>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
