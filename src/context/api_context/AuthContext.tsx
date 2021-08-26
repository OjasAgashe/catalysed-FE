/*
 * This file contains API functions related to authorization
 */

import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { LoginData } from "../../types/Login";
import { OrgRegisterData } from "../../types/OrganisationRegister";

interface AuthProviderReturns {
  postLoginCall: (data: LoginData) => Promise<AxiosResponse<any>>;
  postRegisterCall: (data: OrgRegisterData) => Promise<AxiosResponse<any>>;
}

/*
 * Creating AuthContext that can have either null or AuthProviderReturns
 * Interface property
 */
const AuthContext = React.createContext<AuthProviderReturns | null>(null);

/*
 * Creating useAuth custom hook, so that we did not write
 * useContext(AuthContext) everywhere we need authorization API functions
 */
export function useAuth() {
  return useContext(AuthContext) as AuthProviderReturns;
}

export const AuthProvider: React.FC<React.ReactNode> = (props) => {
  /*
   * Creating axios instance with baseURL of the app
   */
  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  /*
   * Function to call Login API
   */
  function postLoginCall(data: LoginData) {
    return instance.post(`/authenticate`, data);
  }

  /*
   * Function to call Registration API of Organisation
   */
  function postRegisterCall(data: OrgRegisterData) {
    return instance.post("/register/organization", data);
  }

  /*
   * AuthContext consumer can consume all these values
   */
  const values = {
    postLoginCall,
    postRegisterCall,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
