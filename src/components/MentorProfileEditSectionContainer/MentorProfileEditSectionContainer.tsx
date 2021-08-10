import React, { useCallback, useEffect } from "react";
import "../OrgProfileEditSectionContainer/OrgProfileEditSectionContainer.css";
import "../StudentProfileEditSectionContainer/StudentProfileEditSectionContainer.css";

import { useHistory, useLocation } from "react-router-dom";
import {
  MentorProfileEditActionType,
  MentorProfileEditData,
  MentorProfileEditState,
} from "../../types/MentorProfileEdit";
import MentorProfileEditSectionContainerFragment from "./MentorProfileEditSectionContainerFragment";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";

import "./MentorProfileEditSectionContainer.css";

type MentorProfileEditSectionContainerProps = {
  state: MentorProfileEditState;
  dispatch: React.Dispatch<MentorProfileEditActionType>;
  editedData: MentorProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<MentorProfileEditData | null>
  >;
};

const MentorProfileEditSectionContainer = ({
  state,
  dispatch,
  editedData,
  setEditedData,
}: MentorProfileEditSectionContainerProps) => {
  const { putMentorProfile } = useMentorAPI();
  const history = useHistory();
  const location = useLocation();

  const hasDataChange = useCallback(() => {
    const responseDataTemp = { ...state.responseData } as MentorProfileEditData;
    const editedDataTemp = { ...editedData } as MentorProfileEditData;

    if (
      editedDataTemp?.birthYear !== responseDataTemp?.birthYear ||
      editedDataTemp?.organization !== responseDataTemp?.organization ||
      editedDataTemp?.gender !== responseDataTemp?.gender ||
      editedDataTemp?.qualification !== responseDataTemp?.qualification ||
      editedDataTemp?.profession !== responseDataTemp?.profession ||
      editedDataTemp?.primaryLanguage !== responseDataTemp?.primaryLanguage ||
      editedDataTemp?.previouslyMentored !==
        responseDataTemp?.previouslyMentored ||
      editedDataTemp?.stableConnection !== responseDataTemp?.stableConnection ||
      editedDataTemp?.experience !== responseDataTemp?.experience ||
      editedDataTemp?.location.country !== responseDataTemp?.location.country ||
      editedDataTemp?.location.region !== responseDataTemp?.location.region ||
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
        editedData?.birthYear ?? "",
        editedData?.organization ?? "",
        editedData?.gender ?? "",
        editedData?.qualification ?? "",
        editedData?.profession ?? "",
        editedData?.stableConnection ?? "",
        editedData?.previouslyMentored ?? "",
        editedData?.experience ?? "",
        editedData?.primaryLanguage ?? "",
        editedData?.phone.number ?? "",
        editedData?.location.country ?? "",
        editedData?.location.region ?? "",
      ].includes("") === false
    );
  };

  const makeAPICall = async (data: MentorProfileEditData) => {
    try {
      document.documentElement.scrollTop = 0;

      dispatch({
        type: "loadingMessage",
        payload: "Saving Changes Done...",
      });
      dispatch({ type: "putCallError", payload: "" });

      await putMentorProfile(data);

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

  const handleMentorProfileEditSaveBtn = () => {
    if (state.validated === false)
      dispatch({ type: "validated", payload: true });

    if ((editedData?.phone?.number ?? "").length <= 4) {
      dispatch({ type: "phoneValueIsInvalid", payload: true });
      return;
    }

    if (editedData?.birthYear === "NaN") {
      document.documentElement.scrollTop = 100;
      return;
    }

    // if (new Date().getFullYear() - Number(editedData?.birthYear) < 18) {
    //   document.documentElement.scrollTop = 100;
    //   return;
    // }

    if (canMakeAPICall()) {
      makeAPICall(editedData as MentorProfileEditData);
    } else {
      document.documentElement.scrollTop = 100;
    }
  };

  const handleMentorProfileEditDiscardChangesBtn = () => {
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
      <MentorProfileEditSectionContainerFragment
        handleMentorProfileEditSaveBtn={handleMentorProfileEditSaveBtn}
        handleMentorProfileEditDiscardChangesBtn={
          handleMentorProfileEditDiscardChangesBtn
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

export default MentorProfileEditSectionContainer;
