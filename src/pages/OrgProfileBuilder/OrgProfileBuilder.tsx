import React, { useState } from "react";
import OrgProfileBuilderTypeform from "../../components/OrgProfileBuilderTypeform/OrgProfileBuilderTypeform";
import "./OrgProfileBuilder.css";

type GreetProps = {
  setShowGreet: React.Dispatch<React.SetStateAction<boolean>>;
};

const Greet = ({ setShowGreet }: GreetProps) => {
  return (
    <div className="OrgProfileGreet">
      <h2>Welcome User_name</h2>
      <h4>We are excited to have Organization_name on catalysEd !!</h4>
      <p>
        Let's create a profile that will help establish your organization on the
        platform
      </p>
      <button className="StartBtn" onClick={() => setShowGreet(false)}>Start</button>
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
