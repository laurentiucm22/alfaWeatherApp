import React from "react";

const Card = ({ className, children, style }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Card;
