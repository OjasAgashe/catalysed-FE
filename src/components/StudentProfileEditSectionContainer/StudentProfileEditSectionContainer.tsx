import React, { useCallback, useEffect } from "react";
import "../OrgProfileEditSectionContainer/OrgProfileEditSectionContainer.css";
import "./StudentProfileEditSectionContainer.css";

import { useHistory, useLocation } from "react-router-dom";
import {
  StudentProfileEditActionType,
  StudentProfileEditData,
  StudentProfileEditState,
} from "../../types/StudentProfileEdit";
import StudentProfileEditSectionContainerFragment from "./StudentProfileEditSectionContainerFragment";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";

type StudentProfileEditSectionContainerProps = {
  state: StudentProfileEditState;
  dispatch: React.Dispatch<StudentProfileEditActionType>;
  editedData: StudentProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<StudentProfileEditData | null>
  >;
};

const StudentProfileEditSectionContainer = ({
  state,
  dispatch,
  editedData,
  setEditedData,
}: StudentProfileEditSectionContainerProps) => {
  const { putStudentProfile } = useStudentAPI();
  const history = useHistory();
  const location = useLocation();

  const hasDataChange = useCallback(() => {
    const responseDataTemp = {
      ...state.responseData,
    } as StudentProfileEditData;
    const editedDataTemp = { ...editedData } as StudentProfileEditData;

    if (
      editedDataTemp?.birthYear !== responseDataTemp?.birthYear ||
      editedDataTemp?.organization !== responseDataTemp?.organization ||
      editedDataTemp?.gender !== responseDataTemp?.gender ||
      editedDataTemp?.primaryLanguage !== responseDataTemp?.primaryLanguage ||
      editedDataTemp?.previouslyMentored !==
        responseDataTemp?.previouslyMentored ||
      editedDataTemp?.stableConnection !== responseDataTemp?.stableConnection ||
      editedDataTemp?.primaryDevice !== responseDataTemp?.primaryDevice ||
      editedDataTemp?.address.country !== responseDataTemp?.address.country ||
      editedDataTemp?.address.region !== responseDataTemp?.address.region ||
      editedDataTemp?.phone.number !== responseDataTemp?.phone.number ||
      editedDataTemp?.phone.countryCode !== responseDataTemp?.phone.countryCode
    ) {
      return true;
    }

    return false;
  }, [editedData, state.responseData]);

  useEffect(() => {
    dispatch({ type: "dataHasChanged", payload: hasDataChange() });

    // @ts-ignore
    const unblock = history.block((tx) => {
      if (state.dataHasChanged === false) return true;

      if (state.leave) return true;

      dispatch({ type: "navigateToPath", payload: tx.pathname });

      if (state.dataHasChanged) dispatch({ type: "showModal", payload: true });
      return false;
    });

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (state.dataHasChanged) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      unblock();
    };
  }, [
    dispatch,
    hasDataChange,
    history,
    location.pathname,
    state.dataHasChanged,
    state.leave,
  ]);

  const canMakeAPICall = () => {
    return (
      [
        editedData?.address?.country ?? "",
        editedData?.address?.region ?? "",
        editedData?.birthYear ?? "",
        editedData?.phone.number ?? "",
        editedData?.primaryDevice ?? "",
        editedData?.gender ?? "",
        editedData?.organization ?? "",
        editedData?.primaryLanguage ?? "",
        editedData?.previouslyMentored ?? "",
        editedData?.stableConnection ?? "",
      ].includes("") === false
    );
  };

  const makeAPICall = async (data: StudentProfileEditData) => {
    try {
      document.documentElement.scrollTop = 0;

      dispatch({ type: "loadingMessage", payload: "Saving Changes Done..." });
      dispatch({ type: "putCallError", payload: "" });

      await putStudentProfile(data);

      dispatch({ type: "loadingMessage", payload: "" });
      dispatch({ type: "dataHasChanged", payload: false });
      dispatch({ type: "responseData", payload: editedData });
      document.documentElement.scrollTop = 200;
    } catch (error) {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;

      dispatch({ type: "loadingMessage", payload: "" });
      dispatch({
        type: "putCallError",
        payload: error.response?.data?.message ?? "",
      });
    }
  };

  const handleStudentProfileEditSaveBtn = () => {
    if (state.validated === false)
      dispatch({ type: "validated", payload: true });

    if ((editedData?.phone?.number ?? "").length <= 4) {
      dispatch({ type: "phoneValueIsInvalid", payload: true });
      return;
    }

    if (new Date().getFullYear() - Number(editedData?.birthYear) < 18) {
      document.documentElement.scrollTop = 100;
      return;
    }

    if (canMakeAPICall()) {
      makeAPICall(editedData as StudentProfileEditData);
    } else {
      document.documentElement.scrollTop = 100;
    }
  };

  const handleStudentProfileEditDiscardChangesBtn = () => {
    setEditedData(state.responseData);
  };

  const handleLeavePageModalLeaveBtn = () => {
    dispatch({ type: "leave", payload: true });
    history.push(state.navigateToPath);
  };

  const handleLeavePageModalStayBtn = () => {
    dispatch({ type: "stay", payload: true });
    dispatch({ type: "leave", payload: false });
    dispatch({ type: "showModal", payload: false });
    dispatch({ type: "navigateToPath", payload: "" });
  };

  return (
    <div className="OrgProfileEditSectionContainer">
      <StudentProfileEditSectionContainerFragment
        handleStudentProfileEditSaveBtn={handleStudentProfileEditSaveBtn}
        handleStudentProfileEditDiscardChangesBtn={
          handleStudentProfileEditDiscardChangesBtn
        }
        handleLeavePageModalLeaveBtn={handleLeavePageModalLeaveBtn}
        handleLeavePageModalStayBtn={handleLeavePageModalStayBtn}
        state={state}
        dispatch={dispatch}
        editedData={editedData}
        setEditedData={setEditedData}
      />
    </div>
  );
};

export default StudentProfileEditSectionContainer;
