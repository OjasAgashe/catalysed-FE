import React, { useEffect } from "react";
import MentorHome from "../../components/MentorHome/MentorHome";

const MentorHomePage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Mentor Home | CatalysEd";
  }, []);

  return (
    <div>
      <MentorHome />
    </div>
  );
};

export default MentorHomePage;
