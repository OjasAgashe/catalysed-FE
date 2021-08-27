import React from "react";
import { OrgHomeSectionOne } from "../../assets/Illustrations/Illustrations";
import { useCookie } from "../../context/cookie_context/CookieContext";

const SectionOne = () => {
  const { getCatalysedUserNameCookie } = useCookie();

  return (
    <section
      style={{ backgroundImage: `url(${OrgHomeSectionOne})` }}
      className="OrgHomeSectionOneContainer"
    >
      <div className="TextContainer">
        <span className="WelcomeSpan">
          {/* Showing current logged entity name */}
          Welcome {getCatalysedUserNameCookie()} !!
        </span>
        <span className="HelpTextSpanOne">
          Thanks for believing on CatalysEd
        </span>
      </div>
    </section>
  );
};

export default SectionOne;
