import React, { useEffect } from "react";
import {
  OrgSpecificApplicantDetailsActionType,
  OrgSpecificApplicantDetailsResponse,
  OrgSpecificApplicantDetailsState,
} from "../../types/OrgSpecificApplicantDetails";
import "./OrgSpecificApplicantApplicationDetails.css";

import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import {
  OrgApplicationStatusApproved,
  OrgApplicationStatusPending,
  OrgApplicationStatusRejected,
} from "../../assets/Illustrations/Illustrations";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { useHistory, useParams } from "react-router-dom";

type OrgSpecificApplicantApplicationDetailsProps = {
  state: OrgSpecificApplicantDetailsState;
  dispatch: React.Dispatch<OrgSpecificApplicantDetailsActionType>;
};

const OrgSpecificApplicantApplicationDetails = ({
  state,
  dispatch,
}: OrgSpecificApplicantApplicationDetailsProps) => {
  const { applicationId, programId } =
    useParams<{ applicationId: string; programId: string }>();
  const history = useHistory();
  const {
    putSpecificApplicantDetailsAsViewed,
    putStatusOfSpecificApplicantDetails,
  } = useOrgAPI();

  useEffect(() => {
    /*
     * After 3 seconds of render, of this component, call the API
     * to change its view Status to true from false
     */
    const timer = setTimeout(async () => {
      if (
        state.responseData &&
        state.responseData.applicationDetails.viewedByOrg === false
      ) {
        await putSpecificApplicantDetailsAsViewed(
          parseInt(programId),
          parseInt(applicationId),
          {
            ...state.responseData,
            applicationDetails: {
              ...state.responseData.applicationDetails,
              viewedByOrg: true,
            },
          }
        );
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [
    applicationId,
    programId,
    putSpecificApplicantDetailsAsViewed,
    state.responseData,
  ]);

  /*
   * Function to handle click of Accept button or Reject button
   *
   * In statusTxt, we will send "Accept" or "Reject" string
   */
  const handleBtnClick = async (statusTxt: string) => {
    // we will do all validation, only if we have some data
    if (state.responseData) {
      // scroll on Top of the page
      document.documentElement.scrollTop = 0;

      try {
        // Show LoadingProgress Component with loadingMessage
        dispatch({ type: "loadingMessage", payload: "Working On It..." });
        dispatch({ type: "loading", payload: true });

        /*
         * If previously, we have shown any error then hide it
         */
        dispatch({ type: "error", payload: "" });

        /*
         * Create data in acceptable format by API
         */
        const data = {
          ...state.responseData,
          applicationDetails: {
            ...state.responseData.applicationDetails,
            status: statusTxt,
          },
        } as OrgSpecificApplicantDetailsResponse;

        // Call API
        await putStatusOfSpecificApplicantDetails(
          parseInt(programId),
          parseInt(applicationId),
          data,
          statusTxt
        );

        // On Successful call of the API hide LoadingProgress component
        dispatch({ type: "loading", payload: false });

        /*
         * Rerender Page, to update the UI based on the current Status
         */
        dispatch({ type: "reRenderComponent", payload: true });
      } catch (error) {
        /*
         * If we got 404 error, while calling the API, then
         * push the Org to PageNotFound
         */
        if (error.response.status === 404) {
          history.push("*");
        } else {
          /*
           * If we got any other error, then 404, then first hide the
           * LoadingProgress component and show that error
           */
          dispatch({ type: "loading", payload: false });
          dispatch({
            type: "error",
            payload: "Sorry !! Some Error Occurs, Try Later.",
          });
        }
      }
    }
  };

  return (
    <div className="OrgSpecificApplicantApplicationDetailsContainer">
      <div className="OrgSpecificApplicantApplicationDetailsCard">
        <div className="TextNStatusContainer">
          <div className="AppliedOnNApplicationTextContainer">
            <div className="FormDetailsText">Application Details</div>
            <div className="AppliedOnTextContainer">
              <span className="AppliedOnText">Applied On: </span>
              <span className="AppliedOnDate">{`${new Date(
                state?.responseData?.applicationDetails.appliedOn ?? ""
              ).getDate()}/${
                new Date(
                  state?.responseData?.applicationDetails.appliedOn ?? ""
                ).getMonth() + 1
              }/${new Date(
                state?.responseData?.applicationDetails.appliedOn ?? ""
              ).getFullYear()}`}</span>
            </div>
          </div>
          <div className="StatusContainer">
            <div className="Status">
              {state?.responseData?.applicationDetails.status === "PENDING" ? (
                <img src={OrgApplicationStatusPending} alt="Pending PNG" />
              ) : state?.responseData?.applicationDetails.status ===
                "APPROVED" ? (
                <img src={OrgApplicationStatusApproved} alt="Approved PNG" />
              ) : state?.responseData?.applicationDetails.status ===
                "REJECTED" ? (
                <img src={OrgApplicationStatusRejected} alt="Rejected PNG" />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div
          className={`${
            state?.responseData?.applicationDetails.status !== "PENDING"
              ? "MarginBottom"
              : ""
          }`}
        >
          {state?.responseData?.applicationDetails.applicationResponses.map(
            (response) => (
              <section key={response.responseNumber}>
                <div className="AppliedOnText ResponseQuestion">
                  {response.question}
                </div>
                <div className="AppliedOnDate ResponseAnswer">
                  {response.answer}
                </div>
              </section>
            )
          )}
        </div>

        {state?.responseData?.applicationDetails?.status === "PENDING" && (
          <div className="ButtonContainer">
            <button
              className="ApproveBtn Btn"
              type="button"
              onClick={() => handleBtnClick("APPROVED")}
            >
              <TiTick className="ApproveBtnIcon" /> Approve
            </button>
            <button
              className="RejectBtn Btn"
              type="button"
              onClick={() => handleBtnClick("REJECTED")}
            >
              <ImCross className="RejectBtnIcon" /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgSpecificApplicantApplicationDetails;
