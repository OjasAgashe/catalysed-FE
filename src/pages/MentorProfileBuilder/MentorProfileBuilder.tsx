import React, { useEffect, useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import MentorProfileBuilderTypeform from "../../components/MentorProfileBuilderTypeform/MentorProfileBuilderTypeform";
import "./MentorProfileBuilder.css";

type GreetProps = {
  setShowGreet: React.Dispatch<React.SetStateAction<boolean>>;
};

const Greet = ({ setShowGreet }: GreetProps) => {
  return (
    <div className="MentorProfileGreetContainer">
      <div className="MentorProfileGreet">
        <h2>Welcome Mentor_name</h2>
        <h4>
          We are glad that you want to be a mentor of Organization_name !!
        </h4>
        <h4 className="Leth4">
          Let's create a profile that will help establish your
          existence on CatalysEd
        </h4>
        <button className="StartBtn" onClick={() => setShowGreet(false)}>
          Start &nbsp;
          <AiOutlineDoubleRight className="AiDoubleRightIcon" />
        </button>
      </div>
    </div>
  );
};

const MentorProfileBuilder = () => {
  const [showGreet, setShowGreet] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Mentor Profile Builder | CatalysEd";
  });

  return (
    <div className="MentorProfileBuilder">
      {showGreet && <Greet setShowGreet={setShowGreet} />}
      {showGreet === false && <MentorProfileBuilderTypeform />}
    </div>
  );
};

export default MentorProfileBuilder;
