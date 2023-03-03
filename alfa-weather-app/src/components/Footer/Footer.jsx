import React from "react";
import Wrapper from "../../UI/Wrapper";

const Footer = () => {
  return (
    <Wrapper className="absolute bottom-0 z-20 flex items-center justify-center w-full p-5 text-center">
      <h3 className="font-bold text-md">
        <span className="text-black">&copy;Copyrights,</span> all rights
        reserved to&nbsp;
        <a
          href="https://instagram.com/zoomclm"
          alt="laurentiu costachescu instagram"
          target="_blank"
          rel="noreferrer"
        >
          @zoomclm
        </a>
      </h3>
    </Wrapper>
  );
};

export default Footer;
