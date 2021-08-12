import React, { useCallback, useContext, useMemo } from "react";
import axios from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { StuSuggestedProgramApplicationData } from "../../types/StuSuggestedProgramApplication";
import { MentorProfileEditData } from "../../types/MentorProfileEdit";
import { MentorAPIProviderReturns } from "../../types/MentorAPI";
import { StudentConnectedProgramData } from "../../types/StudentUpdates";

const MentorAPIContext = React.createContext<MentorAPIProviderReturns | null>(
  null
);

export function useMentorAPI() {
  return useContext(MentorAPIContext) as MentorAPIProviderReturns;
}

export const MentorAPIProvider: React.FC<React.ReactNode> = (props) => {
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
      `mentors/${catalysedId}/programs/${programId}/applications`,
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

    return instance.get(`mentors/${catalysedId}/applications`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const getSpecificFilledApplicationDetails = (applicationId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `mentors/${catalysedId}/applications/${applicationId}`,
      {
        headers: { Authorization: `Bearer ${catalysedToken}` },
      }
    );
  };

  const getMentorProfile = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`mentors/${catalysedId}/profile`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const putMentorProfile = (data: MentorProfileEditData) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.put(`mentors/${catalysedId}/profile`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const getSuggestedPrograms = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`mentors/${catalysedId}/suggested/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const getSuggestedProgramDetails = (programId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `mentors/${catalysedId}/suggested/programs/${programId}`,
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

    return instance.get(`/mentors/${catalysedId}/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }, [getCatalysedIdCookie, getCatalysedTokenCookie, instance]);

  const getConnectedProgramDetails = (programId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`mentors/${catalysedId}/programs/${programId}`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  const getConnectedProgramParticipants = (programId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `/mentors/${catalysedId}/programs/${programId}/participants`,
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
    getMentorProfile,
    putMentorProfile,
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
    <MentorAPIContext.Provider value={values}>
      {props.children}
    </MentorAPIContext.Provider>
  );
};
