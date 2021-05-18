import React, { useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import StuProfileBuilderTypeform from "../../components/StuProfileBuilderTypeform/StuProfileBuilderTypeform";
import "./StuProfileBuilder.css";

type GreetProps = {
  setShowGreet: React.Dispatch<React.SetStateAction<boolean>>;
};

const Greet = ({ setShowGreet }: GreetProps) => {
  return (
    <div className="StuProfileGreetContainer">
      <div className="StuProfileGreet">
        <h2>Welcome Student_name</h2>
        <h4>We are glad that you want to be a part of Organization_name !!</h4>
        <h4 className="Leth4">
          Let's create a profile that will help establish your existence on
          CatalysEd
        </h4>
        <button className="StartBtn" onClick={() => setShowGreet(false)}>
          Start &nbsp;
          <AiOutlineDoubleRight className="AiDoubleRightIcon" />
        </button>
      </div>
    </div>
  );
};

const StuProfileBuilder = () => {
  const [showGreet, setShowGreet] = useState<boolean>(true);

  return (
    <div className="StuProfileBuilder">
      {showGreet && <Greet setShowGreet={setShowGreet} />}
      {showGreet === false && <StuProfileBuilderTypeform />}
    </div>
  );
};

export default StuProfileBuilder;