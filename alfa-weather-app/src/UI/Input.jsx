import React from "react";

const Input = ({ type, className, onChange, value, id }) => {
  return (
    <input
      type={type || "text"}
      className={className}
      onChange={onChange}
      value={value}
      id={id}
    />
  );
};

export default Input;
