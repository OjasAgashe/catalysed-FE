import React, { useEffect, useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import StuProfileBuilderTypeform from "../../components/StuProfileBuilderTypeform/StuProfileBuilderTypeform";
import { useCookie } from "../../context/cookie_context/CookieContext";
import "./StuProfileBuilder.css";

/*
 * This file is much same as OrgProfileBuilder, only
 * we are using StuProfileBuilderTypeform instead of
 * OrgProfileBuilderTypeform
 */

type GreetProps = {
  setShowGreet: React.Dispatch<React.SetStateAction<boolean>>;
};

const Greet = ({ setShowGreet }: GreetProps) => {
  const { getCatalysedUserNameCookie } = useCookie();

  return (
    <div className="StuProfileGreetContainer">
      <div className="StuProfileGreet">
        <h2>Welcome {getCatalysedUserNameCookie()}</h2>
        <h4>We are glad that you want to be a part of Catalysed !!</h4>
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

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Student Profile Builder | CatalysEd";
  }, []);

  return (
    <div className="StuProfileBuilder Page">
      {showGreet && <Greet setShowGreet={setShowGreet} />}
      {showGreet === false && <StuProfileBuilderTypeform />}
    </div>
  );
};

export default StuProfileBuilder;
