import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { OrgProfileBuilderData } from "../types/OrganisationProfileBuilder";
import { StudentProfileBuilderData } from "../types/StudentProfileBuilder";

interface ProfileBuilderProviderReturns {
  postProfileCall: (
    entity: string,
    data: OrgProfileBuilderData | StudentProfileBuilderData
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

  function postProfileCall(
    entity: string,
    data: OrgProfileBuilderData | StudentProfileBuilderData
  ) {
    const token = document.cookie.split("=")[1];
    return instance.post(`/profile/${entity}`, {
      headers: { Authorization: `Bearer ${token}` },
      data,
    });
  }

  function getProfileCall(entity: string) {
    const token = document.cookie.split("=")[1];
    return instance.get(`/profile/${entity}`, {
      headers: { Authorization: `Bearer ${token}` },
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
