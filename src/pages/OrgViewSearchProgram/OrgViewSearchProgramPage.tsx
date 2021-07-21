import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgViewSearchProgram from "../../components/OrgViewSearchProgram/OrgViewSearchProgram";
import { orgViewSearchProgramReducer } from "../../reducers/orgViewSearchProgramReducer";

const OrgViewSearchProgramPage = () => {
  const [state, dispatch] = useReducer(orgViewSearchProgramReducer, {
    loading: true,
    searchedTitle: "",
    searchedNotPresentText: "",
    selectedRadioForFilter: "All",
    selectedRadioForFilterMode: "All",
    selectedRadioForFilterCategory: "All",
    selectedRadioForSort: "All",
    selectedRadioForDateSort: "All",
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Org View/Search | CatalysEd";
  }, []);

  return (
    <div className="OrgViewSearchProgramPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Your Programs..."
        />
      )}

      <OrgViewSearchProgram state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrgViewSearchProgramPage;
