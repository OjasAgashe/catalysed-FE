import React from "react";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";

import "./OrgDirectoryDetailsConnectedToPrograms.css";
import Section from "./Section";
import Error from "../Error/Error";
import { OrgSpecificApplicantDetailsState } from "../../types/OrgSpecificApplicantDetails";

/*
 * This component has been used in OrgDirectoryMentorDetailsPage,
 * OrgDirectoryStudentDetailsPage, OrgSpecificMentorApplicantDetailsPage, and in
 * OrgSpecificStudentApplicantDetailsPage
 */

type OrgDirectoryDetailsConnectedToProgramsProps = {
  state?: OrgDirectoryDetailsCommonState | null;
  applicantState?: OrgSpecificApplicantDetailsState | null;
};

/*
 * OrgDirectoryDetailsConnectedToPrograms : component accepts two props,
 * 1) state : of OrgDirectoryMentorDetailsPage and OrgDirectoryStudentDetailsPage
 * 2) applicantState : of OrgSpecificMentorApplicantDetailsPage and
 * OrgSpecificStudentApplicantDetailsPage
 *
 * And both are optional, as we will send only one at a time
 * (state from Directory Pages and applicantState from Specific Details Pages)
 */

const OrgDirectoryDetailsConnectedToPrograms = ({
  state,
  applicantState,
}: OrgDirectoryDetailsConnectedToProgramsProps) => {
  return (
    <div className="OrgDirectoryDetailsConnectedProgramsContainer">
      <div className="OrgProgramInvitationDetails">
        <div className="OrgProgramInvitationDetailsContainer">
          <div className="FormDetailsText">Connected to Programs</div>

          {/*
           * When we have value of state (means applicantState is not given),
           * Show Section based on its value.
           *
           * But If we do not have any thing to show (means an empty array), then
           * show the error message.
           */}
          {state?.responseData ? (
            state?.responseData?.connectPrograms.length ? (
              <Section state={state} />
            ) : (
              <div className="ErrorContainer">
                <Error message="Sorry !! Not Connected To Programs Yet" />
              </div>
            )
          ) : (
            ""
          )}

          {/*
           * When we have value of applicantState (means state is not given),
           * Show Section based on its value.
           *
           * In its value, if we are showing data for Mentor Applicant Type then show
           * the connected programs of mentor, but if we are showing data for Student
           * Applicant Type then show the connected programs of student
           *
           * But If we do not have any thing to show (means an empty array), then
           * show the error message.
           */}
          {applicantState?.responseData?.applicationDetails.applicantType ===
          "MENTOR" ? (
            // Mentor Applicant Type
            applicantState?.responseData?.mentorDetails?.connectPrograms
              .length ? (
              <Section applicantState={applicantState} />
            ) : (
              /*
               * Show error message, when connected programs array is empty
               */
              <div className="ErrorContainer">
                <Error message="Sorry !! Not Connected To Programs Yet" />
              </div>
            )
          ) : applicantState?.responseData?.applicationDetails.applicantType ===
            "STUDENT" ? (
            // Student Applicant Type
            applicantState?.responseData?.studentDetails?.connectPrograms
              .length ? (
              <Section applicantState={applicantState} />
            ) : (
              /*
               * Show error message, when connected programs array is empty
               */
              <div className="ErrorContainer">
                <Error message="Sorry !! Not Connected To Programs Yet" />
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>

      {/*
       * Show "Go Back to Directory" button, only when we have value in state,
       * means applicantState does not contain anything
       */}
      {state && <OrgDirectoryDetailsBackBtn />}
    </div>
  );
};

export default OrgDirectoryDetailsConnectedToPrograms;
