import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { LoginData } from "../types/Login";

export interface AuthProviderReturns {
  postLoginCall: (data: LoginData) => Promise<AxiosResponse<any>>;
}

const AuthContext = React.createContext<AuthProviderReturns | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthProviderReturns;
}

export const AuthProvider: React.FC<React.ReactNode> = (props) => {
  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  function postLoginCall(data: LoginData) {
    return instance.post(`/authenticate`, data);
  }

  const values = {
    postLoginCall,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
