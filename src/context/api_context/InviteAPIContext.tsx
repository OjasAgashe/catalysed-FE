/*
 * This file contains API functions related to Invite
 */

import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";

interface InviteAPIProviderReturns {
  getInvitationKey(emailId: string): Promise<AxiosResponse<any>>;
  getInviteValidation(invitationKey: string): Promise<AxiosResponse<any>>;
}

/*
 * Creating InviteAPIContext that can have either null or
 * InviteAPIProviderReturns Interface property
 */
const InviteAPIContext = React.createContext<InviteAPIProviderReturns | null>(
  null
);

/*
 * Creating useInviteAPI custom hook, so that we did not write
 * useContext(InviteAPIContext) everywhere we need API functions
 * related to a Invite
 */
export function useInviteAPI() {
  return useContext(InviteAPIContext) as InviteAPIProviderReturns;
}

export const InviteAPIProvider: React.FC<React.ReactNode> = (props) => {
  /*
   * Creating axios instance with baseURL of the app
   */
  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  /*
   * Function to call get Invitation Key API
   */
  function getInvitationKey(emailId: string) {
    return instance.get(`/invite/development/${emailId}`);
  }

  /*
   * Function to call Validate Invite API
   */
  function getInviteValidation(invitationKey: string) {
    return instance.get(`/invite/${invitationKey}`);
  }

  /*
   * InviteAPIContext consumer can consume all these values
   */
  const values = { getInvitationKey, getInviteValidation };

  return (
    <InviteAPIContext.Provider value={values}>
      {props.children}
    </InviteAPIContext.Provider>
  );
};
