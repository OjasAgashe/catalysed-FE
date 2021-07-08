import React, { useCallback, useContext, useMemo } from "react";
import axios from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { CreateProgramData } from "../../types/CreateProgram";
import { GetProgramMetaListData } from "../../types/OrgViewSearchProgram";
import { OrgInvitationPostData } from "../../types/OrgProgramDetails";
import { OrgAPIProviderReturns } from "../../types/OrgAPI";
import { OrgSpecificApplicantDetailsResponse } from "../../types/OrgSpecificApplicantDetails";

const OrgAPIContext = React.createContext<OrgAPIProviderReturns | null>(null);

export function useOrgAPI() {
  return useContext(OrgAPIContext) as OrgAPIProviderReturns;
}

export const OrgAPIProvider: React.FC<React.ReactNode> = (props) => {
  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  const todaysFullDate = useMemo(() => {
    const currDate = new Date(Date.now());
    return {
      todaysDay: currDate.getDate(),
      todaysMonth: currDate.getMonth(),
      todaysYear: currDate.getFullYear(),
    };
  }, []);

  const { getCatalysedTokenCookie, getCatalysedIdCookie } = useCookie();

  function postCreateProgramCall(data: CreateProgramData) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.post(`/program`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  const getProgramsMetaList = useCallback(() => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`/organization/${catalysedId}/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }, [getCatalysedIdCookie, getCatalysedTokenCookie, instance]);

  function getProgramDetails(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.get(`/program/${programId}`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  function putUpdatedProgramDetails(
    programId: number,
    data: CreateProgramData
  ) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.put(`/program/${programId}`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  function putUpdatedProgramStatusToPublish(
    programId: number,
    data: CreateProgramData
  ) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.put(`/program/${programId}/publish`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

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

  function getProgramInvitations(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.get(`/organization/programs/${programId}/invitations`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

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

  function getProgramParticipants(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.get(`/organization/programs/${programId}/participants`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  function getConnectedMentors() {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`organization/${catalysedId}/connections?type=MENTOR`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  function getConnectedStudents() {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `organization/${catalysedId}/connections?type=STUDENT`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  function getSpecificConnectedMentor(mentorId: number) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `organization/${catalysedId}/connections/mentors/${mentorId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  function getSpecificConnectedStudent(studentId: number) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `organization/${catalysedId}/connections/students/${studentId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  function getStudentApplicationForProgram(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `organizations/${catalysedId}/programs/${programId}/applications?applicantType=STUDENT`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  function getMentorApplicationForProgram(programId: number) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `organizations/${catalysedId}/programs/${programId}/applications?applicantType=MENTOR`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  function getSpecificStudentApplicantDetails(
    programId: number,
    applicationId: number
  ) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `organizations/${catalysedId}/programs/${programId}/student/applications/${applicationId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  function getSpecificMentorApplicantDetails(
    programId: number,
    applicationId: number
  ) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `organizations/${catalysedId}/programs/${programId}/mentor/applications/${applicationId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  function putSpecificApplicantDetailsAsViewed(
    programId: number,
    applicationId: number,
    data: OrgSpecificApplicantDetailsResponse
  ) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.put(
      `organizations/${catalysedId}/programs/${programId}/applications/${applicationId}/viewed`,
      data,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

  function putStatusOfSpecificApplicantDetails(
    programId: number,
    applicationId: number,
    data: OrgSpecificApplicantDetailsResponse,
    status: string
  ) {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.put(
      `organizations/${catalysedId}/programs/${programId}/applications/${applicationId}/update?status=${status}`,
      data,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  }

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
  };

  return (
    <OrgAPIContext.Provider value={values}>
      {props.children}
    </OrgAPIContext.Provider>
  );
};
