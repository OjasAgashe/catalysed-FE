import React, { useEffect, useReducer, useState } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProfileCommonHeader from "../../components/OrgProfileCommonHeader/OrgProfileCommonHeader";
import StudentProfileEditSectionContainer from "../../components/StudentProfileEditSectionContainer/StudentProfileEditSectionContainer";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { studentProfileEditReducer } from "../../reducers/studentProfileEditReducer";
import { StudentProfileEditData } from "../../types/StudentProfileEdit";
import Error from "../../components/Error/Error";
import "./StudentProfileEdit.css";

const StudentProfileEdit = () => {
  const [state, dispatch] = useReducer(studentProfileEditReducer, {
    loading: true,
    loadingMessage: "",
    error: "",
    putCallError: "",
    validated: false,
    phoneValueIsInvalid: false,
    dataHasChanged: false,
    showModal: false,
    leave: false,
    stay: false,
    navigateToPath: "",
    responseData: null,
    phoneValue: "",
  });

  const [editedData, setEditedData] = useState<StudentProfileEditData | null>(
    null
  );

  const { getStudentProfile } = useStudentAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Student Profile Edit | CatalysEd";

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getStudentProfile();

        const dataTempObj = {
          ...response.data,
          primaryLanguage: "English",
          phone: {
            countryCode: "+91",
            countryName: "INDIA",
            number: "1212121212",
          },
          address: { country: "India", region: "Delhi" },
        };

        dispatch({ type: "responseData", payload: dataTempObj });

        dispatch({
          type: "phoneValue",
          payload: dataTempObj.phone.countryCode + dataTempObj.phone.number,
        });

        setEditedData(dataTempObj);
      } catch (error) {
        dispatch({ type: "error", payload: "Sorry!! No Details Found" });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getDetails();
  }, [getStudentProfile]);

  return (
    <div className="StudentProfileEditPage Page">
      {(state.loading || state.loadingMessage) && (
        <LoadingProgress
          loading={state.loading || (state.loadingMessage ? true : false)}
          emailSent={false}
          loadingMessage={
            state.loading ? "Getting Details..." : state.loadingMessage
          }
        />
      )}

      <OrgProfileCommonHeader textToShow="Manage Your Profile" />

      {state.responseData === null ? (
        <div className="ErrorDiv">
          <Error message={state.error} />
        </div>
      ) : (
        <StudentProfileEditSectionContainer
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      )}
    </div>
  );
};

export default StudentProfileEdit;
