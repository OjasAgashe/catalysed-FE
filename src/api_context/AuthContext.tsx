import React, { useContext, useEffect, useReducer } from "react";
import axios, { AxiosResponse } from "axios";
import { LoginData } from "../types/Login";
import { OrgRegisterData } from "../types/OrganisationRegister";

type CurrentUserType = {
  catalysedCreated: boolean;
  catalysedId: number | null;
  catalysedToken: string;
  catalysedType: string;
};

type CurrentUserActionType =
  | { type: "catalysedCreated"; payload: boolean }
  | { type: "catalysedId"; payload: number | null }
  | { type: "catalysedToken"; payload: string }
  | { type: "catalysedType"; payload: string };

interface AuthProviderReturns {
  currentUser: CurrentUserType;
  postLoginCall: (data: LoginData) => Promise<AxiosResponse<any>>;
  postRegisterCall: (data: OrgRegisterData) => Promise<AxiosResponse<any>>;
  dispatchCurrentUser: React.Dispatch<CurrentUserActionType>;
}

const authReducer = (state: CurrentUserType, action: CurrentUserActionType) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};

const AuthContext = React.createContext<AuthProviderReturns | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthProviderReturns;
}

export const AuthProvider: React.FC<React.ReactNode> = (props) => {
  const [currentUser, dispatchCurrentUser] = useReducer(authReducer, {
    catalysedCreated: false,
    catalysedId: null,
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
        let value: string | boolean | number | null = "";

        [name, value] = cookie.split("=");
        name = name.trim();

        if (name === "catalysedCreated") {
          value === "true" ? (value = true) : (value = false);
        } else if (name === "catalysedId") {
          value = parseInt(value);
        } else {
          value = value.trim();
        }

        switch (name) {
          case "catalysedCreated":
            dispatchCurrentUser({
              type: "catalysedCreated",
              payload: value as boolean,
            });
            break;
          case "catalysedId":
            dispatchCurrentUser({
              type: "catalysedId",
              payload: value as number | null,
            });
            break;
          case "catalysedToken":
            dispatchCurrentUser({
              type: "catalysedToken",
              payload: value as string,
            });
            break;
          case "catalysedType":
            dispatchCurrentUser({
              type: "catalysedType",
              payload: value as string,
            });
            break;
        }
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
    dispatchCurrentUser,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
