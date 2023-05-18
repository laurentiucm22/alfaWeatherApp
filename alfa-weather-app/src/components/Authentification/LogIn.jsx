import React from "react";
import Button from "../../UI/Button";

const LogIn = () => {
  return (
    <Button
      type="submit"
      className="py-2 mr-4 text-sm transition bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 px-7 md:text-md small_login-btn"
    >
      Log In
    </Button>
  );
};
export default LogIn;
