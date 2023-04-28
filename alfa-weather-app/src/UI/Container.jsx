import React from "react";

const Container = ({ style, className, children }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Container;
