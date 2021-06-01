import React, { useEffect } from "react";
import CommonHome from "../../components/CommonHome/CommonHome";

const Home = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Home | CatalysEd";
  }, []);

  return (
    <div>
      <CommonHome />
    </div>
  );
};

export default Home;
