import React from "react";
import Container from "../../UI/Container";
import Button from "../../UI/Button";
import Logo from "../NavBar/Logo";
import LogOut from "./LogOut";

const SearchMenu = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <>
      {!isCollapsed && (
        <Container className="absolute top-0 right-0 z-40 w-full h-full transition ease-in-out bg-indigo-600 md:w-2/5 lg:w-1/4">
          <Container className="flex items-center justify-between px-4">
            <Logo />
            <Button onClick={() => setIsCollapsed(true)}>X</Button>
          </Container>
          <LogOut />
        </Container>
      )}
    </>
  );
};

export default SearchMenu;
