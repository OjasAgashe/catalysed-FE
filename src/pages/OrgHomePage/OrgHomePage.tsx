import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgHome from "../../components/OrgHome/OrgHome";
import { orgHomeReducer } from "../../reducers/orgHomeReducer";

const OrgHomePage = () => {
  /*
   * state.loading: to show the LoadingProgress till we are getting
   * data of the Org Dashboard
   *
   * state.programsStartingThisMonth: to store the meta list of programs
   * starting this month
   *
   * state.ongoingPrograms: to store the meta list of ongoing programs
   *
   * state.responseData: to store the response data for the Org Dashboard
   */
  const [state, dispatch] = useReducer(orgHomeReducer, {
    loading: true,
    programsStartingThisMonth: [],
    ongoingPrograms: [],
    responseData: null,
  });

  useEffect(() => {
    /*
     * Whenever anyone is visiting this page first time, we want the scroll
     * position on the top
     */
    document.documentElement.scrollTop = 0;

    // set the document title
    document.title = "Org Home | CatalysEd";
  }, []);

  return (
    <div className="OrgHomePage Page">
      {/*
       * Show the LoadingProgress component till we are getting
       * the data of the Dashboard
       */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Your Dashboard..."
        />
      )}

      {/* Show OrgHome component */}
      <OrgHome state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrgHomePage;
