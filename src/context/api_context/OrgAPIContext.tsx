/*
 * This file contains all the API functions related to
 * an Organisation
 */

import React, { useCallback, useContext, useMemo } from "react";
import axios from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { CreateProgramData } from "../../types/CreateProgram";
import { GetProgramMetaListData } from "../../types/OrgViewSearchProgram";
import { OrgInvitationPostData } from "../../types/OrgProgramDetails";
import { OrgAPIProviderReturns } from "../../types/OrgAPI";
import { OrgSpecificApplicantDetailsResponse } from "../../types/OrgSpecificApplicantDetails";
import { OrgProfileEditData } from "../../types/OrgProfileEdit";

/*
 * Creating OrgAPIContext that can have either null or OrgAPIProviderReturns
 * Interface property
 */
const OrgAPIContext = React.createContext<OrgAPIProviderReturns | null>(null);

/*
 * Creating useOrgAPI custom hook, so that we did not write
 * useContext(OrgAPIContext) everywhere we need API functions
 * related to an Organisation
 */
export function useOrgAPI() {
  return useContext(OrgAPIContext) as OrgAPIProviderReturns;
}

export const OrgAPIProvider: React.FC<React.ReactNode> = (props) => {
  /*
   * Creating axios instance with baseURL of the app
   */
  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  /*
   * Storing value of todays Date,
   *
   * We need this to filter program starting this month, and
   * ongoing programs
   */
  const todaysFullDate = useMemo(() => {
    const currDate = new Date(Date.now());
    return {
      todaysDay: currDate.getDate(),
      todaysMonth: currDate.getMonth(),
      todaysYear: currDate.getFullYear(),
    };
  }, []);

  /*
   * Destructing getCatalysedTokenCookie and getCatalysedOrgIdCookie
   * value from useCookie hook
   */
  const { getCatalysedTokenCookie, getCatalysedOrgIdCookie } = useCookie();

  /*
   * Function to call Create Program API
   */
  function postCreateProgramCall(data: CreateProgramData) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.post(`/program`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * Function to call get API, to get Program Meta List
   */
  const getProgramsMetaList = useCallback(() => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(`/organization/${catalysedOrgId}/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }, [getCatalysedOrgIdCookie, getCatalysedTokenCookie, instance]);

  /*
   * Function to call get API, to get specific Program Details
   */
  function getProgramDetails(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.get(`/program/${programId}`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * Function to call put API, to put changes done after
   * editing Program Details
   */
  function putUpdatedProgramDetails(
    programId: number,
    data: CreateProgramData
  ) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.put(`/program/${programId}`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * Function to call put API, to put the status of a Program
   * from Draft to Publish
   */
  function putUpdatedProgramStatusToPublish(
    programId: number,
    data: CreateProgramData
  ) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.put(`/program/${programId}/publish`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * Function to get Meta List of the Programs starting this month
   */
  const getProgramsStartingThisMonth = useCallback(async () => {
    const response = await getProgramsMetaList();

    return [...response.data].filter((program: GetProgramMetaListData) => {
      const [progDay, progMonth, progYear] =
        program.tentativeStartDate.split("/");

      if (
        program.status === "PUBLISHED" &&
        parseInt(progMonth) - 1 === todaysFullDate.todaysMonth
      )
        return (
          new Date(
            parseInt(progYear),
            parseInt(progMonth) - 1,
            parseInt(progDay)
          ) >
          new Date(
            todaysFullDate.todaysYear,
            todaysFullDate.todaysMonth,
            todaysFullDate.todaysDay
          )
        );

      return false;
    });
  }, [
    getProgramsMetaList,
    todaysFullDate.todaysDay,
    todaysFullDate.todaysMonth,
    todaysFullDate.todaysYear,
  ]);

  /*
   * Function to get Meta List of the ongoing Programs
   */
  const getOngoingPrograms = useCallback(async () => {
    const response = await getProgramsMetaList();

    return [...response.data].filter((program: GetProgramMetaListData) => {
      const [progDay, progMonth, progYear] =
        program.tentativeStartDate.split("/");

      if (program.status === "PUBLISHED")
        return (
          new Date(
            parseInt(progYear),
            parseInt(progMonth) - 1,
            parseInt(progDay)
          ) <
          new Date(
            todaysFullDate.todaysYear,
            todaysFullDate.todaysMonth,
            todaysFullDate.todaysDay
          )
        );

      return false;
    });
  }, [
    getProgramsMetaList,
    todaysFullDate.todaysDay,
    todaysFullDate.todaysMonth,
    todaysFullDate.todaysYear,
  ]);

  /*
   * Function to call get API, to get all the Invitations of a
   * specific Program
   */
  function getProgramInvitations(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.get(`/organization/programs/${programId}/invitations`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * Function to call Create Invitation API for a specific Program
   */
  function postProgramInvitations(
    programId: number,
    data: OrgInvitationPostData
  ) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.post(
      `/organization/programs/${programId}/invitations`,
      data,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call get API, to get all the Participants of a
   * specific Program
   */
  function getProgramParticipants(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.get(`/organization/programs/${programId}/participants`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * Function to call get API, to get all the Connected Mentors of
   * a specific Program
   */
  function getConnectedMentors() {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(
      `organization/${catalysedOrgId}/connections?type=MENTOR`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call get API, to get all the Connected Students of a
   * specific Program
   */
  function getConnectedStudents() {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(
      `organization/${catalysedOrgId}/connections?type=STUDENT`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call get API, to get details of a specific Connected Mentor
   * with the Organisation
   */
  function getSpecificConnectedMentor(mentorId: number) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(
      `organization/${catalysedOrgId}/connections/mentors/${mentorId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call get API, to get details of a specific Connected Student
   * with the Organisation
   */
  function getSpecificConnectedStudent(studentId: number) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(
      `organization/${catalysedOrgId}/connections/students/${studentId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call get API, to get all the Student Applications
   * for a Program
   */
  function getStudentApplicationForProgram(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(
      `organizations/${catalysedOrgId}/programs/${programId}/applications?applicantType=STUDENT`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call get API, to get all the Mentor Applications
   * for a Program
   */
  function getMentorApplicationForProgram(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(
      `organizations/${catalysedOrgId}/programs/${programId}/applications?applicantType=MENTOR`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call get API, to get the details of a specific Student
   * Application Details
   */
  function getSpecificStudentApplicantDetails(
    programId: number,
    applicationId: number
  ) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(
      `organizations/${catalysedOrgId}/programs/${programId}/student/applications/${applicationId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call get API, to get the details of a specific Student
   * Application Details
   */
  function getSpecificMentorApplicantDetails(
    programId: number,
    applicationId: number
  ) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(
      `organizations/${catalysedOrgId}/programs/${programId}/mentor/applications/${applicationId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call put API, to put that the Organisation has viewed
   * the Applicant Application
   */
  function putSpecificApplicantDetailsAsViewed(
    programId: number,
    applicationId: number,
    data: OrgSpecificApplicantDetailsResponse
  ) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.put(
      `organizations/${catalysedOrgId}/programs/${programId}/applications/${applicationId}/viewed`,
      data,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call put API, to put that the Organisation has Accepted or
   * Rejected the applicant application
   */
  function putStatusOfSpecificApplicantDetails(
    programId: number,
    applicationId: number,
    data: OrgSpecificApplicantDetailsResponse,
    status: string
  ) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.put(
      `organizations/${catalysedOrgId}/programs/${programId}/applications/${applicationId}/update?status=${status}`,
      data,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  /*
   * Function to call get API, to get the Organisation Profile Details
   */
  function getOrganisationProfile() {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(`organizations/${catalysedOrgId}/profile`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * Function to call put API, to put the edited Organisation Profile
   * Details
   */
  function putOrganisationProfile(data: OrgProfileEditData) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.put(`organizations/${catalysedOrgId}/profile`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * Function to call get API, to get the Organisation HomePage Details
   */
  function getOrgHomePageData() {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedOrgId = getCatalysedOrgIdCookie();

    return instance.get(`organizations/${catalysedOrgId}/homepage`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * OrgAPIContext consumer can consume all these values
   */
  const values = {
    postCreateProgramCall,
    getProgramsMetaList,
    getProgramDetails,
    putUpdatedProgramDetails,
    putUpdatedProgramStatusToPublish,
    getProgramsStartingThisMonth,
    getOngoingPrograms,
    getProgramInvitations,
    postProgramInvitations,
    getProgramParticipants,
    getConnectedMentors,
    getConnectedStudents,
    getSpecificConnectedMentor,
    getSpecificConnectedStudent,
    getStudentApplicationForProgram,
    getMentorApplicationForProgram,
    getSpecificStudentApplicantDetails,
    getSpecificMentorApplicantDetails,
    putSpecificApplicantDetailsAsViewed,
    putStatusOfSpecificApplicantDetails,
    getOrganisationProfile,
    putOrganisationProfile,
    getOrgHomePageData,
  };

  return (
    <OrgAPIContext.Provider value={values}>
      {props.children}
    </OrgAPIContext.Provider>
  );
};
