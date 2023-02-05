import React from "react";

const Wrapper = ({ className, children, style }) => {
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

export default Wrapper;
