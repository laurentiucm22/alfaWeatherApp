import React from "react";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../Redux/slices/uiSlice";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const dispatch = useDispatch();

  const logInHandler = () => {
    localStorage.setItem("isAuth", true);
    dispatch(isAuthenticated(true));
  };

  return (
    <Button
      className="py-2 mr-4 transition bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 px-7 text-bold text-md"
      onClick={logInHandler}
    >
      Log In
    </Button>
  );
};

export const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(isAuthenticated(null));
    navigate("/");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Button
      className="py-2 text-white transition bg-indigo-300 rounded-full shadow-sm text-bold hover:bg-indigo-600 border-1 px-7 text-md hover:text-white"
      onClick={logOutHandler}
    >
      Log Out
    </Button>
  );
};
