import React, { useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { LoginData } from "../types/Login";

interface CurrentUserType {
  accountVerified: boolean;
  active: boolean;
  email: string;
  id: number;
  profileCreated: boolean;
  userName: string;
  userType: string;
}

interface AuthProviderReturns {
  currentUser: CurrentUserType;
  postLoginCall: (data: LoginData) => Promise<AxiosResponse<any>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType>>;
}

const AuthContext = React.createContext<AuthProviderReturns | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthProviderReturns;
}

export const AuthProvider: React.FC<React.ReactNode> = (props) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>({
    accountVerified: false,
    active: false,
    email: "",
    id: 0,
    profileCreated: false,
    userName: "",
    userType: "",
  });

  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  function postLoginCall(data: LoginData) {
    return instance.post(`/authenticate`, data);
  }

  const values = {
    currentUser,
    postLoginCall,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
