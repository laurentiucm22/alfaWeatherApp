import React from "react";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../Redux/slices/uiSlice";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    dispatch(isAuthenticated(false));
    navigate("/");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Button
      className="px-6 py-2 text-sm text-white transition bg-indigo-300 rounded-full shadow-sm md:py-2 text-bold hover:bg-indigo-600 border-1 md:px-7 md:text-md hover:text-white small_logout-btn"
      onClick={logOutHandler}
    >
      Log Out
    </Button>
  );
};

export default LogOut;
