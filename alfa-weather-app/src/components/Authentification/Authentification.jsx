import React, { useState } from "react";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import SearchMenu from "../NavBar/SearchMenu";
import Input from "../../UI/Input";
import { useSelector } from "react-redux";
import Form from "../../UI/Form";

const Authentification = () => {
  // I want to mimic setting up a user
  // Base on that user, you should have access to the DB with your specific weather data 🙂
  // Just that in this case, the user is going to be always the same one
  const [mail, setMail] = useState("example@user.com");
  const [password, setPassword] = useState("example123@");
  const isAuth = useSelector((state) => state.rootUi.isAuthenticate);

  const onUserLogIn = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={onUserLogIn} className="flex items-center red-300 items">
      <Input
        className="hidden"
        placeholder="mail"
        type="email"
        value={mail}
        onChange={setMail}
      />
      <Input
        className="hidden"
        placeholder="password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      {isAuth ? <LogOut /> : <LogIn />}
      {isAuth && <SearchMenu />}
    </Form>
  );
};

export default Authentification;
