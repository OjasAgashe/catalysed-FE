import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgDirectoryDetailsCommonHeader from "../../components/OrgDirectoryDetailsCommonHeader/OrgDirectoryDetailsCommonHeader";
import OrgDirectoryDetailsConnectedToPrograms from "../../components/OrgDirectoryDetailsConnectedToPrograms/OrgDirectoryDetailsConnectedToPrograms";
import OrgDirectoryDetailsStudentPersonalInfo from "../../components/OrgDirectoryDetailsStudentPersonalInfo/OrgDirectoryDetailsStudentPersonalInfo";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgDirectoryDetailsReducer } from "../../reducers/orgDirectoryDetailsReducer";

const OrgDirectoryStudentDetailsPage = () => {
  const [state, dispatch] = useReducer(orgDirectoryDetailsReducer, {
    choosedOption: "PersonalInfo",
    responseData: null,
    loading: true,
    error: "",
  });

  const { studentId } = useParams<{ studentId: string }>();
  const history = useHistory();
  const { getSpecificConnectedStudent } = useOrgAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Student Details | CatalysEd";

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getSpecificConnectedStudent(parseInt(studentId));

        dispatch({ type: "responseData", payload: response.data });
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          history.push("*");
        } else {
          dispatch({ type: "loading", payload: false });
          dispatch({ type: "error", payload: "Sorry !! No Details Found" });
        }
      }
    };

    getDetails();
  }, [getSpecificConnectedStudent, history, studentId]);

  return (
    <div className="OrgDirectoryStudentPage">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <OrgDirectoryDetailsCommonHeader state={state} dispatch={dispatch} />

      {state.choosedOption === "PersonalInfo" && (
        <OrgDirectoryDetailsStudentPersonalInfo state={state} />
      )}

      {state.choosedOption === "ConnectedToPrograms" && (
        <OrgDirectoryDetailsConnectedToPrograms state={state} />
      )}
    </div>
  );
};

export default OrgDirectoryStudentDetailsPage;
