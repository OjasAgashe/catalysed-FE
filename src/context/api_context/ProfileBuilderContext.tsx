import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { OrgProfileBuilderData } from "../../types/OrganisationProfileBuilder";
import { StudentProfileBuilderData } from "../../types/StudentProfileBuilder";
import { useCookie } from "../cookie_context/CookieContext";
// import { MentorProfileBuilderData } from "../types/MentorProfileBuilder";

interface ProfileBuilderProviderReturns {
  postProfileCall: (
    entity: string,
    data: OrgProfileBuilderData | StudentProfileBuilderData | any
  ) => Promise<AxiosResponse<any>>;
  getProfileCall: (entity: string) => Promise<AxiosResponse<any>>;
}

const ProfileBuilderContext =
  React.createContext<ProfileBuilderProviderReturns | null>(null);

export function useProfileBuilder() {
  return useContext(ProfileBuilderContext) as ProfileBuilderProviderReturns;
}

export const ProfileBuilderProvider: React.FC<React.ReactNode> = (props) => {
  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  const { getCatalysedTokenCookie } = useCookie();

  function postProfileCall(
    entity: string,
    data: OrgProfileBuilderData | StudentProfileBuilderData | any
  ) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.post(`/profile/${entity}`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  function getProfileCall(entity: string) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.get(`/profile/${entity}`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  const values = {
    getProfileCall,
    postProfileCall,
  };

  return (
    <ProfileBuilderContext.Provider value={values}>
      {props.children}
    </ProfileBuilderContext.Provider>
  );
};
