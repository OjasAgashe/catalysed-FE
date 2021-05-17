import React, { useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import "./StuProfileBuilder.css";

type GreetProps = {
  setShowGreet: React.Dispatch<React.SetStateAction<boolean>>;
};

const Greet = ({ setShowGreet }: GreetProps) => {
  return (
    <div className="StuProfileGreet">
      <h2>Welcome Student_name</h2>
      <h4>We are glad that you want to be a part of Organization_name !!</h4>
      <p>
        Let's create a profile that will help establish your existence on
        CatalysEd
      </p>
      <button className="StartBtn" onClick={() => setShowGreet(false)}>
        Start &nbsp;
        <AiOutlineDoubleRight className="AiDoubleRightIcon" />
      </button>
    </div>
  );
};

const StuProfileBuilder = () => {
  const [showGreet, setShowGreet] = useState<boolean>(true);

  return (
    <div className="StuProfileBuilder">
      {showGreet && <Greet setShowGreet={setShowGreet} />}
      {showGreet === false && "StudentProfileBuilder"}
    </div>
  );
};

export default StuProfileBuilder;
