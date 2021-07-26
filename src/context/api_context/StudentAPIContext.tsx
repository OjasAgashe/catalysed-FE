import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { StuSuggestedProgramApplicationData } from "../../types/StuSuggestedProgramApplication";

interface StudentAPIProviderReturns {
  postCreateApplication: (
    data: StuSuggestedProgramApplicationData,
    programId: number
  ) => Promise<AxiosResponse<any>>;
}

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

  const values = {
    postCreateApplication,
  };

  return (
    <StudentAPIContext.Provider value={values}>
      {props.children}
    </StudentAPIContext.Provider>
  );
};
