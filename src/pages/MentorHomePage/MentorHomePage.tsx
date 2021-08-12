import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import MentorHome from "../../components/MentorHome/MentorHome";
import { studentHomeReducer } from "../../reducers/studentHomeReducer";

const MentorHomePage = () => {
  const [state, dispatch] = useReducer(studentHomeReducer, {
    loading: true,
    runningPrograms: [],
    aboutToStartPrograms: [],
    suggestedPrograms: [],
    entity: "MENTOR",
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Mentor Home | CatalysEd";
  }, []);

  return (
    <div className="MentorHomePage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Your Dashboard..."
        />
      )}

      <MentorHome state={state} dispatch={dispatch} />
    </div>
  );
};

export default MentorHomePage;
