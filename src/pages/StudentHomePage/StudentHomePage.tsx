import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StudentHome from "../../components/StudentHome/StudentHome";
import { studentHomeReducer } from "../../reducers/studentHomeReducer";

const StudentHomePage = () => {
  const [state, dispatch] = useReducer(studentHomeReducer, {
    loading: true,
    runningPrograms: [],
    aboutToStartPrograms: [],
    suggestedPrograms: [],
    entity: "STUDENT"
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Student Home | CatalysEd";
  }, []);

  return (
    <div className="StudentHomePage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Your Dashboard..."
        />
      )}

      <StudentHome state={state} dispatch={dispatch} />
    </div>
  );
};

export default StudentHomePage;
