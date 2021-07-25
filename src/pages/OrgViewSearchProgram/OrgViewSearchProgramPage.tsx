import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgViewSearchProgram from "../../components/OrgViewSearchProgram/OrgViewSearchProgram";
import { orgViewSearchProgramReducer } from "../../reducers/orgViewSearchProgramReducer";

const OrgViewSearchProgramPage = () => {
  /*
   * state.loading : has true initial value, because we want to show
   * the Loading Progress component till we do not get the programs meta
   * data on OrgViewSearchProgram Component
   *
   * state.searchedTitle : will store the value that the user will enter
   * in searchedBar, to filter based on it
   *
   * state.searchedNotPresentText : will contain the message that we will
   * show when our filtered array is empty, means no data is present based
   * on filter value
   *
   * state.selectedRadioForFilter,
   * state.selectedRadioForFilterMode,
   * state.selectedRadioForFilterCategory,
   * state.selectedRadioForSort,
   * state.selectedRadioForDateSort : have "All" as initial value, because
   * when the page renders the first time we do not want any type of filter
   */
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
    /*
     * whenever the page renders, we want the scroll position
     * should be on top
     */
    document.documentElement.scrollTop = 0;

    // page title
    document.title = "Org View/Search | CatalysEd";
  }, []);

  return (
    <div className="OrgViewSearchProgramPage Page">
      {/*
       * Till the state.loading has value true, show Loading
       * Progress component
       */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Your Programs..."
        />
      )}

      {/*
       * Show OrgViewSearchProgram component
       */}
      <OrgViewSearchProgram state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrgViewSearchProgramPage;
