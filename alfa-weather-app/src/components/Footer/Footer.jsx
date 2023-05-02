import React from "react";
import Container from "../../UI/Container";

const Footer = () => {
  const footerStyle = {
    footerContainer:
      "absolute bottom-0 z-20 flex items-center justify-center w-full p-5 text-sm text-center md:text-lg",
    footerTitle: "font-bold text-md",
    footerSpan: "text-black",
    footerLink: "pl-1",
  };

  return (
    <Container className={footerStyle.footerContainer}>
      <h3 className={footerStyle.footerTitle}>
        <span className={footerStyle.footerSpan}>&copy;Copyrights,</span> all
        rights reserved to
        <a
          href="https://instagram.com/zoomclm"
          alt="laurentiu costachescu instagram"
          target="_blank"
          rel="noreferrer"
          className={footerStyle.footerLink}
        >
          @zoomclm
        </a>
      </h3>
    </Container>
  );
};

export default Footer;
