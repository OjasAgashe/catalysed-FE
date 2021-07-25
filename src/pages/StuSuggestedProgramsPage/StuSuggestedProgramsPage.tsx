import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StudentSuggestedPrograms from "../../components/StudentSuggestedPrograms/StudentSuggestedPrograms";
import { orgViewSearchProgramReducer } from "../../reducers/orgViewSearchProgramReducer";

const StuSuggestedProgramsPage = () => {
  /*
   * As this page is similar to View Search Page of the Org
   * (OrgViewSearchProgramPage), that's why we are using its
   * state in this
   *
   * There is only one change in comparison of View Search Page
   * of the Org, we do not have filter By Category, and filter By
   * Status option in Student Suggested Program Page, that's why
   * we have store empty string ("") as the initial value of
   * selectedRadioForFilterCategory and selectedRadioForFilter
   */
  const [state, dispatch] = useReducer(orgViewSearchProgramReducer, {
    loading: true,
    searchedTitle: "",
    searchedNotPresentText: "",
    selectedRadioForFilterMode: "All",
    selectedRadioForSort: "All",
    selectedRadioForDateSort: "All",
    selectedRadioForFilter: "",
    selectedRadioForFilterCategory: "",
  });

  useEffect(() => {
    /*
     * whenever the page renders, we want the scroll position
     * should be on top
     */
    document.documentElement.scrollTop = 0;

    // page title
    document.title = "Student Suggested Programs | CatalysEd";
  }, []);

  return (
    <div className="StuSuggestedProgramsPage Page">
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
       * Show StudentSuggestedPrograms component
       */}
      <StudentSuggestedPrograms state={state} dispatch={dispatch} />
    </div>
  );
};

export default StuSuggestedProgramsPage;
