import React, { useState } from "react";
import OrgProfileBuilderTypeform from "../../components/OrgProfileBuilderTypeform/OrgProfileBuilderTypeform";
import { AiOutlineDoubleRight } from "react-icons/ai";
import "./OrgProfileBuilder.css";

type GreetProps = {
  setShowGreet: React.Dispatch<React.SetStateAction<boolean>>;
};

const Greet = ({ setShowGreet }: GreetProps) => {
  return (
    <div className="OrgProfileGreetContainer">
      <div className="OrgProfileGreet">
        <h2>Welcome User_name</h2>
        <h4>We are excited to have Organization_name on CatalysEd !!</h4>
        <h4 className="Leth4">
          Let's create a profile that will help establish your
          organization on the platform
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

  return (
    <div className="OrgProfileBuilder">
      {showGreet && <Greet setShowGreet={setShowGreet} />}
      {showGreet === false && <OrgProfileBuilderTypeform />}
    </div>
  );
};

export default OrgProfileBuilder;
