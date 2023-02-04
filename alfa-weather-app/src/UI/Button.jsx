import React from "react";

const Button = ({ onClick, type, children }) => {
  return (
    <button onClick={onClick} type={type || "button"}>
      {children}
    </button>
  );
};

export default Button;
