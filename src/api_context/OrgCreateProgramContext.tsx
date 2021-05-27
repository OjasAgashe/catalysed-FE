import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "./AuthContext";

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

  const { currentUser } = useAuth();

  function postCreateProgramCall(data: any) {
    return instance.post(`/program`, data, {
      headers: { Authorization: `Bearer ${currentUser.catalysedToken}` },
    });
  }

  function getProgramsMetaList() {
    return instance.get(`/organization/${currentUser.catalysedId}/programs`, {
      headers: { Authorization: `Bearer ${currentUser.catalysedToken}` },
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
