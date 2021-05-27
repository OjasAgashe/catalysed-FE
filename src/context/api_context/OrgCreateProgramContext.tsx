import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useCookie } from "../cookie_context/CookieContext";

interface OrgCreateProgramProviderReturns {
  postCreateProgramCall: (data: any) => Promise<AxiosResponse<any>>;
  getProgramsMetaList: () => Promise<AxiosResponse<any>>;
}

const OrgCreateProgramContext =
  React.createContext<OrgCreateProgramProviderReturns | null>(null);

export function useOrgCreateProgram() {
  return useContext(OrgCreateProgramContext) as OrgCreateProgramProviderReturns;
}

export const OrgCreateProgramProvider: React.FC<React.ReactNode> = (props) => {
  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  const { getCatalysedTokenCookie, getCatalysedIdCookie } = useCookie();

  function postCreateProgramCall(data: any) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.post(`/program`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  function getProgramsMetaList() {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`/organization/${catalysedId}/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  const values = {
    postCreateProgramCall,
    getProgramsMetaList,
  };

  return (
    <OrgCreateProgramContext.Provider value={values}>
      {props.children}
    </OrgCreateProgramContext.Provider>
  );
};
