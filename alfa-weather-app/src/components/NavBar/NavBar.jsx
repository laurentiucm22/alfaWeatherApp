import React, { useState } from "react";
import Container from "../../UI/Container";
import Wrapper from "../../UI/Wrapper";
import { BiSearch } from "react-icons/bi";
import SearchMenu from "../Authentification/SearchMenu";
import Logo from "./Logo";
import Authentification from "../Authentification/Authentification";

import { useSelector } from "react-redux";

const NavBar = ({ firebaseAuth }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isAuth = useSelector((state) => state.rootUi.isAuthenticate);

  const navBarStyle = {
    navBarWrapper: "w-11/12 md:w-4/5 m-auto",
    nav: "flex items-center justify-between py-2",
  };

  return (
    <Container>
      <Wrapper className={navBarStyle.navBarWrapper}>
        <nav className={navBarStyle.nav}>
          <Logo />

          <Authentification firebaseAuth={firebaseAuth} />

          {isAuth && (
            <SearchMenu
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          )}

          {isAuth && (
            <Container>
              <BiSearch
                size={32}
                className="p-2 transition bg-indigo-500 rounded-full cursor-pointer text-bold text-slate-200 hover:text-white hover:bg-indigo-700"
                onClick={() => setIsCollapsed(false)}
              />
            </Container>
          )}
        </nav>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
