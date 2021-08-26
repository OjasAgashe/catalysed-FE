/*
 * This file contains all the API functions related to a Student
 */

import React, { useCallback, useContext, useMemo } from "react";
import axios from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { StuSuggestedProgramApplicationData } from "../../types/StuSuggestedProgramApplication";
import { StudentProfileEditData } from "../../types/StudentProfileEdit";
import { StudentAPIProviderReturns } from "../../types/StudentAPI";
import { StudentConnectedProgramData } from "../../types/StudentUpdates";

/*
 * Creating StudentAPIContext that can have either null or
 * StudentAPIProviderReturns Interface property
 */
const StudentAPIContext = React.createContext<StudentAPIProviderReturns | null>(
  null
);

/*
 * Creating useStudentAPI custom hook, so that we did not write
 * useContext(StudentAPIContext) everywhere we need API functions
 * related to a Student
 */
export function useStudentAPI() {
  return useContext(StudentAPIContext) as StudentAPIProviderReturns;
}

export const StudentAPIProvider: React.FC<React.ReactNode> = (props) => {
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

  /*
   * Function to call get API, to get all the filled Applications
   * (a kind of meta list)
   */
  const getAllFilledApplicationsDetails = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`/students/${catalysedId}/applications`, {
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
      `students/${catalysedId}/applications/${applicationId}`,
      { headers: { Authorization: `Bearer ${catalysedToken}` } }
    );
  };

  /*
   * Function to call get API, to get the Student Profile Details
   */
  const getStudentProfile = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`students/${catalysedId}/profile`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  /*
   * Function to call put API, to put the edited Student Profile
   * Details
   */
  const putStudentProfile = (data: StudentProfileEditData) => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.put(`students/${catalysedId}/profile`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  };

  /*
   * Function to call get API, to get the meta list of Suggested Programs
   */
  const getSuggestedPrograms = () => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`students/${catalysedId}/suggested/programs`, {
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
      `students/${catalysedId}/suggested/programs/${programId}`,
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

    return instance.get(`/students/${catalysedId}/programs`, {
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

    return instance.get(`students/${catalysedId}/programs/${programId}`, {
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
      `/students/${catalysedId}/programs/${programId}/participants`,
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
   * StudentAPIContext consumer can consume all these values
   */
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
