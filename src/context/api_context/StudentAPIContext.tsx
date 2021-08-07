import React, { useContext } from "react";
import axios from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { StuSuggestedProgramApplicationData } from "../../types/StuSuggestedProgramApplication";
import { StudentProfileEditData } from "../../types/StudentProfileEdit";
import { StudentAPIProviderReturns } from "../../types/StudentAPI";

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

  const values = {
    postCreateApplication,
    getAllFilledApplicationsDetails,
    getSpecificFilledApplicationDetails,
    getStudentProfile,
    putStudentProfile,
    getSuggestedPrograms,
    getSuggestedProgramDetails,
  };

  return (
    <StudentAPIContext.Provider value={values}>
      {props.children}
    </StudentAPIContext.Provider>
  );
};
