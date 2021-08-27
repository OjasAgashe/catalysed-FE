import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="FooterLinks">
        {/* Add correct to="" later */}
        <Link className="FooterLinkOne" to="/">
          About
        </Link>
        <Link className="FooterLinkTwo" to="/">
          Contact us
        </Link>
        <Link className="FooterLinkThree" to="/">
          FAQ
        </Link>
      </div>
      <div className="FooterCopyright">
        {/* Changing Year value every Year */}©{" "}
        {new Date(Date.now()).getFullYear()} CatalysEd, Org.
      </div>
    </div>
  );
};

export default Footer;
