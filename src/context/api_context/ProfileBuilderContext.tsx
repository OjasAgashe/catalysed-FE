/*
 * This file contains API functions related to creating Profile
 * of each entity
 */

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

/*
 * Creating ProfileBuilderContext that can have either null or
 * ProfileBuilderProviderReturns Interface property
 */
const ProfileBuilderContext =
  React.createContext<ProfileBuilderProviderReturns | null>(null);

/*
 * Creating useProfileBuilder custom hook, so that we did not write
 * useContext(ProfileBuilderContext) everywhere we need profile building
 * related API functions
 */
export function useProfileBuilder() {
  return useContext(ProfileBuilderContext) as ProfileBuilderProviderReturns;
}

export const ProfileBuilderProvider: React.FC<React.ReactNode> = (props) => {
  /*
   * Creating axios instance with baseURL of the app
   */
  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  /*
   * Destructing getCatalysedTokenCookie value from useCookie hook
   */
  const { getCatalysedTokenCookie } = useCookie();

  /*
   * Function to call Create Profile API
   */
  function postProfileCall(
    entity: string,
    data: OrgProfileBuilderData | StudentProfileBuilderData | any
  ) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.post(`/profile/${entity}`, data, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * Function to call API to get Created Profile, if we need
   */
  function getProfileCall(entity: string) {
    const catalysedToken = getCatalysedTokenCookie();

    return instance.get(`/profile/${entity}`, {
      headers: { Authorization: `Bearer ${catalysedToken}` },
    });
  }

  /*
   * ProfileBuilderContext consumer can consume all these values
   */
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
