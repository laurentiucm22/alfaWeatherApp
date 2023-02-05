import React from "react";

const Button = ({ onClick, type, className, children }) => {
  return (
    <button className={className} onClick={onClick} type={type || "button"}>
      {children}
    </button>
  );
};

export default Button;
