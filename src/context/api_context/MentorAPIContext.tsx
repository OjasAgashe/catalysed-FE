import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { StuSuggestedProgramApplicationData } from "../../types/StuSuggestedProgramApplication";

interface MentorAPIProviderReturns {
  postCreateApplication: (
    data: StuSuggestedProgramApplicationData,
    programId: number
  ) => Promise<AxiosResponse<any>>;
}

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

  const values = {
    postCreateApplication,
  };

  return (
    <MentorAPIContext.Provider value={values}>
      {props.children}
    </MentorAPIContext.Provider>
  );
};
