import React from "react";
import {
  OrgApplicationStatusApproved,
  OrgApplicationStatusPending,
  OrgApplicationStatusRejected,
} from "../../assets/Illustrations/Illustrations";
import { StudentUpdatesApplicationDetailsState } from "../../types/StudentUpdates";
import "../OrgSpecificApplicantApplicationDetails/OrgSpecificApplicantApplicationDetails.css";

type StuUpdatesApplicationStatusInfoProps = {
  state: StudentUpdatesApplicationDetailsState;
};

const StuUpdatesApplicationStatusInfo = ({
  state,
}: StuUpdatesApplicationStatusInfoProps) => {
  return (
    <div className="OrgSpecificApplicantApplicationDetailsContainer">
      <div className="OrgSpecificApplicantApplicationDetailsCard">
        <div className="TextNStatusContainer">
          <div className="AppliedOnNApplicationTextContainer">
            <div className="FormDetailsText">Application Details</div>
            <div className="AppliedOnTextContainer">
              <span className="AppliedOnText">Applied On: </span>
              <span className="AppliedOnDate">{`${new Date(
                state?.responseData?.appliedOn ?? ""
              ).getDate()}/${
                new Date(state?.responseData?.appliedOn ?? "").getMonth() + 1
              }/${new Date(
                state?.responseData?.appliedOn ?? ""
              ).getFullYear()}`}</span>
            </div>
          </div>
          <div className="StatusContainer">
            <div className="Status">
              {state?.responseData?.status === "PENDING" ? (
                <img src={OrgApplicationStatusPending} alt="Pending PNG" />
              ) : state?.responseData?.status === "APPROVED" ? (
                <img src={OrgApplicationStatusApproved} alt="Approved PNG" />
              ) : state?.responseData?.status === "REJECTED" ? (
                <img src={OrgApplicationStatusRejected} alt="Rejected PNG" />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div
          className={`${
            state?.responseData?.status !== "PENDING" ? "MarginBottom" : ""
          }`}
        >
          {state?.responseData &&
            state?.responseData?.applicationResponses &&
            state?.responseData?.applicationResponses.map((response) => (
              <section key={response.responseNumber}>
                <div className="AppliedOnText ResponseQuestion">
                  {response.question}
                </div>
                <div className="AppliedOnDate ResponseAnswer">
                  {response.answer}
                </div>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StuUpdatesApplicationStatusInfo;
