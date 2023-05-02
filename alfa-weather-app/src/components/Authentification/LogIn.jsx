import React from "react";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../Redux/slices/uiSlice";
import Button from "../../UI/Button";

const LogIn = () => {
  const dispatch = useDispatch();

  const logInHandler = () => {
    localStorage.setItem("isAuth", true);
    dispatch(isAuthenticated(true));
  };

  return (
    <Button
      type="submit"
      className="py-2 mr-4 text-sm transition bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 px-7 md:text-md small_login-btn"
      onClick={logInHandler}
    >
      Log In
    </Button>
  );
};
export default LogIn;
