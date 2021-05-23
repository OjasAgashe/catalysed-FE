import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { LoginData } from "../types/Login";
import { OrgRegisterData } from "../types/OrganisationRegister";

type CurrentUserType = {
  catalysedCreated: boolean;
  catalysedToken: string;
  catalysedType: string;
};

interface AuthProviderReturns {
  currentUser: CurrentUserType;
  postLoginCall: (data: LoginData) => Promise<AxiosResponse<any>>;
  postRegisterCall: (data: OrgRegisterData) => Promise<AxiosResponse<any>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType>>;
}

const AuthContext = React.createContext<AuthProviderReturns | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthProviderReturns;
}

export const AuthProvider: React.FC<React.ReactNode> = (props) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>({
    catalysedCreated: false,
    catalysedToken: "",
    catalysedType: "",
  });

  const instance = axios.create({
    baseURL:
      "http://catalyseddev-env.eba-qewmmmrf.us-east-1.elasticbeanstalk.com/",
  });

  useEffect(() => {
    if (document.cookie) {
      document.cookie.split(";").forEach((cookie) => {
        let name: string = "";
        let value: string | boolean = "";

        [name, value] = cookie.split("=");

        if (name.trim() === "catalysedCreated") {
          value === "true" ? (value = true) : (value = false);
        } else {
          value = value.trim();
        }
        setCurrentUser((prevState) => ({
          ...prevState,
          [name.trim()]: value,
        }));
      });
    }
  }, []);

  function postLoginCall(data: LoginData) {
    return instance.post(`/authenticate`, data);
  }

  function postRegisterCall(data: OrgRegisterData) {
    return instance.post("/register/organization", data);
  }

  const values = {
    currentUser,
    postLoginCall,
    postRegisterCall,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
