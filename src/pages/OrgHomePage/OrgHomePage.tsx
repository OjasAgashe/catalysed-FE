import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgHome from "../../components/OrgHome/OrgHome";
import { orgHomeReducer } from "../../reducers/orgHomeReducer";

const OrgHomePage = () => {
  const [state, dispatch] = useReducer(orgHomeReducer, {
    loading: true,
    programsStartingThisMonth: [],
    ongoingPrograms: [],
    responseData: null,
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Org Home | CatalysEd";
  }, []);

  return (
    <div className="OrgHomePage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Your Dashboard..."
        />
      )}

      <OrgHome state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrgHomePage;
