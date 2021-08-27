import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StudentHome from "../../components/StudentHome/StudentHome";
import { studentHomeReducer } from "../../reducers/studentHomeReducer";

const StudentHomePage = () => {
  /*
   * state.loading: to show LoadingProgress component till the
   * time, we are getting details of runningPrograms, aboutToStartPrograms,
   * suggestedPrograms
   *
   * state.runningPrograms: to store the data of running programs
   *
   * state.aboutToStartPrograms: to store the data of about to start programs
   *
   * state.suggestedPrograms: to store the data of about to start programs
   *
   * state.entity: will always contain "STUDENT" value
   */
  const [state, dispatch] = useReducer(studentHomeReducer, {
    loading: true,
    runningPrograms: [],
    aboutToStartPrograms: [],
    suggestedPrograms: [],
    entity: "STUDENT",
  });

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time,
     * we want the scrollbar position on top
     */
    document.documentElement.scrollTop = 0;

    // set the document title
    document.title = "Student Home | CatalysEd";
  }, []);

  return (
    <div className="StudentHomePage Page">
      {/*
       * Till the time we are getting all the data
       * related to Student HomePage, show LoadingProgress
       * component
       */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Your Dashboard..."
        />
      )}

      {/* Show StudentHome */}
      <StudentHome state={state} dispatch={dispatch} />
    </div>
  );
};

export default StudentHomePage;
