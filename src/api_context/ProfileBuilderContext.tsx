import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { OrgProfileBuilderData } from "../types/OrganisationProfileBuilder";
import { StudentProfileBuilderData } from "../types/StudentProfileBuilder";
import { useAuth } from "./AuthContext";
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

  const { currentUser } = useAuth();

  function postProfileCall(
    entity: string,
    data: OrgProfileBuilderData | StudentProfileBuilderData | any
  ) {
    return instance.post(`/profile/${entity}`, data, {
      headers: { Authorization: `Bearer ${currentUser.catalysedToken}` },
    });
  }

  function getProfileCall(entity: string) {
    return instance.get(`/profile/${entity}`, {
      headers: { Authorization: `Bearer ${currentUser.catalysedToken}` },
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
