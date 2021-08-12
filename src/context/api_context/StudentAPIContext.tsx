import React, { useCallback, useContext, useMemo } from "react";
import axios from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { StuSuggestedProgramApplicationData } from "../../types/StuSuggestedProgramApplication";
import { StudentProfileEditData } from "../../types/StudentProfileEdit";
import { StudentAPIProviderReturns } from "../../types/StudentAPI";
import { StudentConnectedProgramData } from "../../types/StudentUpdates";

const StudentAPIContext = React.createContext<StudentAPIProviderReturns | null>(
  null
);

export function useStudentAPI() {
  return useContext(StudentAPIContext) as StudentAPIProviderReturns;
}

export const StudentAPIProvider: React.FC<React.ReactNode> = (props) => {
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

  const postCreateApplication = (
    data: StuSuggestedProgramApplicationData,
    programId: number
  ) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.post(
      `/students/${catalysedId}/programs/${programId}/applications`,
      {
        ...data,
        userId: catalysedId,
      },
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  };

  const getAllFilledApplicationsDetails = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`/students/${catalysedId}/applications`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const getSpecificFilledApplicationDetails = (applicationId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `students/${catalysedId}/applications/${applicationId}`,
      { headers: { Authorization: `Bearer ${catalysedToken}` } }
    );
  };

  const getStudentProfile = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`students/${catalysedId}/profile`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const putStudentProfile = (data: StudentProfileEditData) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.put(`students/${catalysedId}/profile`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const getSuggestedPrograms = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`students/${catalysedId}/suggested/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const getSuggestedProgramDetails = (programId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `students/${catalysedId}/suggested/programs/${programId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  };

  const getConnectedOrganisations = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`/user/${catalysedId}/connected/organizations`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const getConnectedOrganisationDetails = (organisationId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `/user/${catalysedId}/connected/organizations/${organisationId}`,
      { headers: { Authorization: `Bearer ${catalysedToken}` } }
    );
  };

  const getConnectedPrograms = useCallback(() => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`/students/${catalysedId}/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }, [getCatalysedIdCookie, getCatalysedTokenCookie, instance]);

  const getConnectedProgramDetails = (programId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`students/${catalysedId}/programs/${programId}`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const getConnectedProgramParticipants = (programId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `/students/${catalysedId}/programs/${programId}/participants`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  };

  const getConnectedAboutToStartPrograms = useCallback(async () => {
    const response = await getConnectedPrograms();

    return [...response.data].filter((program: StudentConnectedProgramData) => {
      const [progDay, progMonth, progYear] =
        program.tentativeStartDate.split("/");

      if (program.status === "PUBLISHED")
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
    getConnectedPrograms,
    todaysFullDate.todaysDay,
    todaysFullDate.todaysMonth,
    todaysFullDate.todaysYear,
  ]);

  const getConnectedRunningPrograms = useCallback(async () => {
    const response = await getConnectedPrograms();

    return [...response.data].filter((program: StudentConnectedProgramData) => {
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
    getConnectedPrograms,
    todaysFullDate.todaysDay,
    todaysFullDate.todaysMonth,
    todaysFullDate.todaysYear,
  ]);

  const values = {
    postCreateApplication,
    getAllFilledApplicationsDetails,
    getSpecificFilledApplicationDetails,
    getStudentProfile,
    putStudentProfile,
    getSuggestedPrograms,
    getSuggestedProgramDetails,
    getConnectedOrganisations,
    getConnectedOrganisationDetails,
    getConnectedPrograms,
    getConnectedProgramDetails,
    getConnectedProgramParticipants,
    getConnectedAboutToStartPrograms,
    getConnectedRunningPrograms,
  };

  return (
    <StudentAPIContext.Provider value={values}>
      {props.children}
    </StudentAPIContext.Provider>
  );
};
