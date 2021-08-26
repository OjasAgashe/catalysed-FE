/*
 * This file contains all the functions related to cookies,
 * that we have used in our project
 */

import React, { useContext } from "react";

interface CookieProviderReturns {
  setAllCookies: (
    catalysedCreated: boolean,
    catalysedId: number | null,
    catalysedToken: string,
    catalysedType: string,
    catalysedUserName: string,
    catalysedOrgName: string
  ) => void;

  getAllCookies: () => {
    catalysedCreated: boolean;
    catalysedId: number | null;
    catalysedToken: string;
    catalysedType: string;
    catalysedUserName: string;
    catalysedOrgName: string;
  };

  setCatalysedCreatedCookie: (catalysedCreated: boolean) => void;
  getCatalysedCreatedCookie: () => boolean;

  setCatalysedIdCookie: (catalysedId: number | null) => void;
  getCatalysedIdCookie: () => number | null;

  setCatalysedTokenCookie: (catalysedToken: string) => void;
  getCatalysedTokenCookie: () => string;

  setCatalysedTypeCookie: (catalysedType: string) => void;
  getCatalysedTypeCookie: () => string;

  setCatalysedUserNameCookie: (catalysedUserName: string) => void;
  getCatalysedUserNameCookie: () => string;

  setCatalysedOrgNameCookie: (catalysedOrgName: string) => void;
  getCatalysedOrgNameCookie: () => string;
}

/*
 * Creating CookieContext that can have either null or
 * CookieProviderReturns Interface property
 */
const CookieContext = React.createContext<CookieProviderReturns | null>(null);

/*
 * Creating useCookie custom hook, so that we did not write
 * the useContext(CookieContext) everywhere we need cookie
 */
export function useCookie() {
  return useContext(CookieContext) as CookieProviderReturns;
}

export const CookieProvider: React.FC<React.ReactNode> = (props) => {
  /*
   * Function to set all the Cookies at Once
   */
  const setAllCookies = (
    catalysedCreated: boolean,
    catalysedId: number | null,
    catalysedToken: string,
    catalysedType: string,
    catalysedUserName: string,
    catalysedOrgName: string
  ): void => {
    document.cookie = `catalysedCreated=${encodeURIComponent(
      catalysedCreated
    )}; path=/`;
    // secure`;

    document.cookie = `catalysedId=${encodeURIComponent(
      catalysedId === null ? "" : catalysedId
    )}; path=/`;
    // secure`;

    document.cookie = `catalysedToken=${encodeURIComponent(
      catalysedToken
    )}; path=/`;
    // secure`;

    document.cookie = `catalysedType=${encodeURIComponent(
      catalysedType
    )}; path=/`;
    // secure`;

    document.cookie = `catalysedUserName=${encodeURIComponent(
      catalysedUserName
    )}; path=/`;
    // secure`;

    document.cookie = `catalysedOrgName=${encodeURIComponent(
      catalysedOrgName
    )}; path=/`;
    // secure`;
  };

  /*
   * Function to get all the Cookies at Once
   */
  const getAllCookies = (): {
    catalysedCreated: boolean;
    catalysedId: number | null;
    catalysedToken: string;
    catalysedType: string;
    catalysedUserName: string;
    catalysedOrgName: string;
  } => {
    const catalysedCreated = getCatalysedCreatedCookie();
    const catalysedId = getCatalysedIdCookie();
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedType = getCatalysedTypeCookie();
    const catalysedUserName = getCatalysedUserNameCookie();
    const catalysedOrgName = getCatalysedOrgNameCookie();

    return {
      catalysedCreated,
      catalysedId,
      catalysedToken,
      catalysedType,
      catalysedUserName,
      catalysedOrgName,
    };
  };

  /*
   * Function to set CatalysedCreated cookie
   */
  const setCatalysedCreatedCookie = (catalysedCreated: boolean): void => {
    document.cookie = `catalysedCreated=${encodeURIComponent(
      catalysedCreated
    )}; path=/`;
    // secure`;
  };

  /*
   * Function to get CatalysedCreated cookie
   */
  const getCatalysedCreatedCookie = (): boolean => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedCreated")
          return decodeURIComponent(value) === "true" ? true : false;
      }
    }

    return false;
  };

  /*
   * Function to set CatalysedId cookie
   */
  const setCatalysedIdCookie = (catalysedId: number | null): void => {
    document.cookie = `catalysedId=${encodeURIComponent(
      catalysedId === null ? "" : catalysedId
    )}; path=/`;
    // secure`;
  };

  /*
   * Function to get CatalysedId cookie
   */
  const getCatalysedIdCookie = (): number | null => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedId")
          return parseInt(decodeURIComponent(value));
      }
    }

    return null;
  };

  /*
   * Function to set CatalysedToken cookie
   */
  const setCatalysedTokenCookie = (catalysedToken: string): void => {
    document.cookie = `catalysedToken=${encodeURIComponent(
      catalysedToken
    )}; path=/`;
    // secure`;
  };

  /*
   * Function to get CatalysedToken cookie
   */
  const getCatalysedTokenCookie = (): string => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedToken") return decodeURIComponent(value);
      }
    }

    return "";
  };

  /*
   * Function to set CatalysedType cookie
   */
  const setCatalysedTypeCookie = (catalysedType: string): void => {
    document.cookie = `catalysedType=${encodeURIComponent(
      catalysedType
    )}; path=/`;
    // secure`;
  };

  /*
   * Function to get CatalysedType cookie
   */
  const getCatalysedTypeCookie = (): string => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedType") return decodeURIComponent(value);
      }
    }

    return "";
  };

  /*
   * Function to set CatalysedUserName cookie
   */
  const setCatalysedUserNameCookie = (catalysedUserName: string): void => {
    document.cookie = `catalysedUserName=${encodeURIComponent(
      catalysedUserName
    )}; path=/`;
    // secure`;
  };

  /*
   * Function to get CatalysedUserName cookie
   */
  const getCatalysedUserNameCookie = (): string => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedUserName")
          return decodeURIComponent(value);
      }
    }

    return "";
  };

  /*
   * Function to set CatalysedOrgName cookie
   */
  const setCatalysedOrgNameCookie = (catalysedOrgName: string): void => {
    document.cookie = `catalysedOrgName=${encodeURIComponent(
      catalysedOrgName
    )}; path=/`;
    // secure`;
  };

  /*
   * Function to get CatalysedOrgName cookie
   */
  const getCatalysedOrgNameCookie = (): string => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedOrgName")
          return decodeURIComponent(value);
      }
    }

    return "";
  };

  /*
   * CookieContext consumer can consume all these values
   */
  const values = {
    setAllCookies,
    getAllCookies,

    setCatalysedCreatedCookie,
    getCatalysedCreatedCookie,

    setCatalysedIdCookie,
    getCatalysedIdCookie,

    setCatalysedTokenCookie,
    getCatalysedTokenCookie,

    setCatalysedTypeCookie,
    getCatalysedTypeCookie,

    setCatalysedUserNameCookie,
    getCatalysedUserNameCookie,

    setCatalysedOrgNameCookie,
    getCatalysedOrgNameCookie,
  };

  return (
    <CookieContext.Provider value={values}>
      {props.children}
    </CookieContext.Provider>
  );
};
