import React, { useCallback, useContext, useMemo } from "react";
import axios, { AxiosResponse } from "axios";
import { useCookie } from "../cookie_context/CookieContext";
import { CreateProgramData } from "../../types/CreateProgram";
import { GetProgramMetaListData } from "../../types/OrgViewSearchProgram";

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
  getProgramsStartingThisMonth: () => Promise<any[]>;
  getOngoingPrograms: () => Promise<any[]>;
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

  const todaysFullDate = useMemo(() => {
    const currDate = new Date(Date.now());
    return {
      todaysDay: currDate.getDate(),
      todaysMonth: currDate.getMonth(),
      todaysYear: currDate.getFullYear(),
    };
  }, []);

  const { getCatalysedTokenCookie, getCatalysedIdCookie } = useCookie();

  function postCreateProgramCall(data: CreateProgramData) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.post(`/program`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  const getProgramsMetaList = useCallback(() => {
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedId = getCatalysedIdCookie();

    return instance.get(`/organization/${catalysedId}/programs`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }, [getCatalysedIdCookie, getCatalysedTokenCookie, instance]);

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

  const getProgramsStartingThisMonth = useCallback(async () => {
    const response = await getProgramsMetaList();

    return [...response.data].filter((program: GetProgramMetaListData) => {
      const [progDay, progMonth, progYear] =
        program.tentativeStartDate.split("/");

      if (
        program.status === "PUBLISHED" &&
        parseInt(progMonth) - 1 === todaysFullDate.todaysMonth
      )
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
    getProgramsMetaList,
    todaysFullDate.todaysDay,
    todaysFullDate.todaysMonth,
    todaysFullDate.todaysYear,
  ]);

  const getOngoingPrograms = useCallback(async () => {
    const response = await getProgramsMetaList();

    return [...response.data].filter((program: GetProgramMetaListData) => {
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
    getProgramsMetaList,
    todaysFullDate.todaysDay,
    todaysFullDate.todaysMonth,
    todaysFullDate.todaysYear,
  ]);

  const values = {
    postCreateProgramCall,
    getProgramsMetaList,
    getProgramDetails,
    putUpdatedProgramDetails,
    putUpdatedProgramStatusToPublish,
    getProgramsStartingThisMonth,
    getOngoingPrograms,
  };

  return (
    <OrgCreateProgramContext.Provider value={values}>
      {props.children}
    </OrgCreateProgramContext.Provider>
  );
};
