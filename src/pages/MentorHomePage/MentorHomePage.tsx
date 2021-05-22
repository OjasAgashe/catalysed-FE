import React, { useEffect } from "react";
import MentorHome from "../../components/MentorHome/MentorHome";

const MentorHomePage = () => {
      useEffect(() => {
        document.title = "Mentor Home | CatalysEd";
      }, []);

  return (
    <div>
      <MentorHome />
    </div>
  );
};

export default MentorHomePage;
