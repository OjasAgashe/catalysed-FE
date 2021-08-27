import React, { useEffect, useReducer, useState } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StudentSuggestedPrograms from "../../components/StudentSuggestedPrograms/StudentSuggestedPrograms";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { orgViewSearchProgramReducer } from "../../reducers/orgViewSearchProgramReducer";
import { GetProgramMetaListData } from "../../types/OrgViewSearchProgram";

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

  /*
   * To store meta list of all the programs
   */
  const [programsList, setProgramsList] = useState<GetProgramMetaListData[]>(
    []
  );

  const { getSuggestedPrograms } = useStudentAPI();

  useEffect(() => {
    /*
     * whenever the page renders, we want the scroll position
     * should be on top
     */
    document.documentElement.scrollTop = 0;

    // page title
    document.title = "Student Suggested Programs | CatalysEd";

    const getPrograms = async () => {
      try {
        // get the list
        const response = await getSuggestedPrograms();

        // store the list
        setProgramsList([...response.data]);
      } catch (error) {
      } finally {
        // after getting the data, hide LoadingProgress component
        dispatch({ type: "loading", payload: false });
      }
    };

    getPrograms();
  }, [getSuggestedPrograms]);

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
      <StudentSuggestedPrograms
        state={state}
        dispatch={dispatch}
        programsList={programsList}
      />
    </div>
  );
};

export default StuSuggestedProgramsPage;
