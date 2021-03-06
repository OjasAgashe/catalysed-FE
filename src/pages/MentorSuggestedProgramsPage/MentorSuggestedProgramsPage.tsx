/* 
    This page is the same as StuSuggestedProgramsPage,
    Only API call is different
*/

import React, { useEffect, useReducer, useState } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StudentSuggestedPrograms from "../../components/StudentSuggestedPrograms/StudentSuggestedPrograms";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";
import { orgViewSearchProgramReducer } from "../../reducers/orgViewSearchProgramReducer";
import { GetProgramMetaListData } from "../../types/OrgViewSearchProgram";

const MentorSuggestedProgramsPage = () => {
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

  const [programsList, setProgramsList] = useState<GetProgramMetaListData[]>(
    []
  );

  const { getSuggestedPrograms } = useMentorAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Mentor Suggested Programs | CatalysEd";

    const getPrograms = async () => {
      try {
        const response = await getSuggestedPrograms();
        setProgramsList([...response.data]);
      } catch (error) {
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getPrograms();
  }, [getSuggestedPrograms]);

  return (
    <div className="MentorSuggestedProgramsPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Your Programs..."
        />
      )}

      <StudentSuggestedPrograms
        state={state}
        dispatch={dispatch}
        programsList={programsList}
      />
    </div>
  );
};

export default MentorSuggestedProgramsPage;
