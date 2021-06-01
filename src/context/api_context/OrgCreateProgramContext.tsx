import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { CreateProgramData } from "../../types/CreateProgram";

interface OrgCreateProgramProviderReturns {
  postCreateProgramCall: (
    data: CreateProgramData
  ) => Promise<AxiosResponse<any>>;
  getProgramsMetaList: () => Promise<AxiosResponse<any>>;
  getProgramDetails: (programId: number) => Promise<AxiosResponse<any>>;
  putUpdatedProgramDetails: (
    programId: number,
    data: CreateProgramData
  ) => Promise<AxiosResponse<any>>;
  putUpdatedProgramStatusToPublish: (
    programId: number,
    data: CreateProgramData
  ) => Promise<AxiosResponse<any>>;
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

  function postCreateProgramCall(data: CreateProgramData) {
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

  const values = {
    postCreateProgramCall,
    getProgramsMetaList,
    getProgramDetails,
    putUpdatedProgramDetails,
    putUpdatedProgramStatusToPublish,
  };

  return (
    <OrgCreateProgramContext.Provider value={values}>
      {props.children}
    </OrgCreateProgramContext.Provider>
  );
};
