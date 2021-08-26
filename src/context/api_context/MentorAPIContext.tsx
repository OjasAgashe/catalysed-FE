/*
 * This file contains all the API functions related to a Mentor
 */

import React, { useCallback, useContext, useMemo } from "react";
import axios from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { StuSuggestedProgramApplicationData } from "../../types/StuSuggestedProgramApplication";
import { MentorProfileEditData } from "../../types/MentorProfileEdit";
import { MentorAPIProviderReturns } from "../../types/MentorAPI";
import { StudentConnectedProgramData } from "../../types/StudentUpdates";

/*
 * Creating MentorAPIContext that can have either null or
 * MentorAPIProviderReturns Interface property
 */
const MentorAPIContext = React.createContext<MentorAPIProviderReturns | null>(
  null
);

/*
 * Creating useMentorAPI custom hook, so that we did not write
 * useContext(MentorAPIContext) everywhere we need API functions
 * related to a Mentor
 */
export function useMentorAPI() {
  return useContext(MentorAPIContext) as MentorAPIProviderReturns;
}

export const MentorAPIProvider: React.FC<React.ReactNode> = (props) => {
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
   * We need this to filter about to start programs, and
   * running programs
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
   * Destructing getCatalysedTokenCookie and getCatalysedIdCookie value
   * from useCookie hook
   */
  const { getCatalysedTokenCookie, getCatalysedIdCookie } = useCookie();

  /*
   * Function to call Create Application API
   */
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

  /*
   * Function to call get API, to get all the filled Applications
   * (a kind of meta list)
   */
  const getAllFilledApplicationsDetails = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`mentors/${catalysedId}/applications`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  /*
   * Function to call get API, to get details of a specific filled
   * Application
   */
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

  /*
   * Function to call get API, to get the Mentor Profile Details
   */
  const getMentorProfile = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`mentors/${catalysedId}/profile`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  /*
   * Function to call put API, to put the edited Mentor Profile
   * Details
   */
  const putMentorProfile = (data: MentorProfileEditData) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.put(`mentors/${catalysedId}/profile`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  /*
   * Function to call get API, to get the meta list of Suggested Programs
   */
  const getSuggestedPrograms = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`mentors/${catalysedId}/suggested/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  /*
   * Function to call get API, to get the details of a specific Suggested
   * Program
   */
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

  /*
   * Function to call get API, to get the meta list of Connected
   * Organisations
   */
  const getConnectedOrganisations = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`/user/${catalysedId}/connected/organizations`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  /*
   * Function to call get API, to get details of a specific Connected
   * Organisation
   */
  const getConnectedOrganisationDetails = (organisationId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(
      `/user/${catalysedId}/connected/organizations/${organisationId}`,
      { headers: { Authorization: `Bearer ${catalysedToken}` } }
    );
  };

  /*
   * Function to call get API, to get meta list of Connected Programs
   */
  const getConnectedPrograms = useCallback(() => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`/mentors/${catalysedId}/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }, [getCatalysedIdCookie, getCatalysedTokenCookie, instance]);

  /*
   * Function to call get API, to get details of a specific Connected
   * Program
   */
  const getConnectedProgramDetails = (programId: number) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`mentors/${catalysedId}/programs/${programId}`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  /*
   * Function to call get API, to get details of Participants of a
   * specific Connected Program
   */
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

  /*
   * Function to get Meta List of the About To Start Programs
   */
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

  /*
   * Function to get Meta List of the Running Programs
   */
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

  /*
   * MentorAPIContext consumer can consume all these values
   */
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
