import React, { useEffect, useState } from "react";
import OrgProfileBuilderTypeform from "../../components/OrgProfileBuilderTypeform/OrgProfileBuilderTypeform";
import { AiOutlineDoubleRight } from "react-icons/ai";
import "./OrgProfileBuilder.css";
import { useCookie } from "../../context/cookie_context/CookieContext";

type GreetProps = {
  setShowGreet: React.Dispatch<React.SetStateAction<boolean>>;
};

/*
 * Greet: component to show Greeting, before asking questions of
 * profile building
 */
const Greet = ({ setShowGreet }: GreetProps) => {
  const { getCatalysedUserNameCookie, getCatalysedOrgNameCookie } = useCookie();

  return (
    <div className="OrgProfileGreetContainer">
      <div className="OrgProfileGreet">
        <h2>Welcome {getCatalysedUserNameCookie()}</h2>
        <h4>
          We are excited to have {getCatalysedOrgNameCookie()} on CatalysEd !!
        </h4>
        <h4 className="Leth4">
          Let's create a profile that will help establish your organization on
          the platform
        </h4>
        <button className="StartBtn" onClick={() => setShowGreet(false)}>
          Start &nbsp;
          <AiOutlineDoubleRight className="AiDoubleRightIcon" />
        </button>
      </div>
    </div>
  );
};

const OrgProfileBuilder = () => {
  const [showGreet, setShowGreet] = useState<boolean>(true);

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want
     * the scroll bar on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Org Profile Builder | CatalysEd";
  }, []);

  return (
    <div className="OrgProfileBuilder Page">
      {/* Till the showGreet is true, Show Greet component */}
      {showGreet && <Greet setShowGreet={setShowGreet} />}

      {/*
       * And when showGreet becomes false, show
       * OrgProfleBuilderTypeform component
       */}
      {showGreet === false && <OrgProfileBuilderTypeform />}
    </div>
  );
};

export default OrgProfileBuilder;
