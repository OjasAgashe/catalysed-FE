import React, { useContext } from "react";

interface CookieProviderReturns {
  setAllCookies: (
    catalysedCreated: boolean,
    catalysedId: number | null,
    catalysedToken: string,
    catalysedType: string
  ) => void;

  getAllCookies: () => {
    catalysedCreated: boolean;
    catalysedId: number | null;
    catalysedToken: string;
    catalysedType: string;
  };

  setCatalysedCreatedCookie: (catalysedCreated: boolean) => void;
  getCatalysedCreatedCookie: () => boolean;

  setCatalysedIdCookie: (catalysedId: number | null) => void;
  getCatalysedIdCookie: () => number | null;

  setCatalysedTokenCookie: (catalysedToken: string) => void;
  getCatalysedTokenCookie: () => string;

  setCatalysedTypeCookie: (catalysedType: string) => void;
  getCatalysedTypeCookie: () => string;
}

const CookieContext = React.createContext<CookieProviderReturns | null>(null);

export function useCookie() {
  return useContext(CookieContext) as CookieProviderReturns;
}

export const CookieProvider: React.FC<React.ReactNode> = (props) => {
  const setAllCookies = (
    catalysedCreated: boolean,
    catalysedId: number | null,
    catalysedToken: string,
    catalysedType: string
  ): void => {
    document.cookie = `catalysedCreated=${catalysedCreated};path=/;secure`;
    document.cookie = `catalysedId=${catalysedId};path=/;secure`;
    document.cookie = `catalysedToken=${catalysedToken};path=/;secure`;
    document.cookie = `catalysedType=${catalysedType};path=/;secure`;
  };

  const getAllCookies = (): {
    catalysedCreated: boolean;
    catalysedId: number | null;
    catalysedToken: string;
    catalysedType: string;
  } => {
    const catalysedCreated = getCatalysedCreatedCookie();
    const catalysedId = getCatalysedIdCookie();
    const catalysedToken = getCatalysedTokenCookie();
    const catalysedType = getCatalysedTypeCookie();

    return { catalysedCreated, catalysedId, catalysedToken, catalysedType };
  };

  const setCatalysedCreatedCookie = (catalysedCreated: boolean): void => {
    document.cookie = `catalysedCreated=${catalysedCreated};path=/;secure`;
  };

  const getCatalysedCreatedCookie = (): boolean => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedCreated")
          return value === "true" ? true : false;
      }
    }

    return false;
  };

  const setCatalysedIdCookie = (catalysedId: number | null): void => {
    document.cookie = `catalysedId=${catalysedId};path=/;secure`;
  };

  const getCatalysedIdCookie = (): number | null => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedId") return parseInt(value);
      }
    }

    return null;
  };

  const setCatalysedTokenCookie = (catalysedToken: string): void => {
    document.cookie = `catalysedToken=${catalysedToken};path=/;secure`;
  };

  const getCatalysedTokenCookie = (): string => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedToken") return value;
      }
    }

    return "";
  };

  const setCatalysedTypeCookie = (catalysedType: string): void => {
    document.cookie = `catalysedType=${catalysedType};path=/;secure`;
  };

  const getCatalysedTypeCookie = (): string => {
    if (document.cookie) {
      const allCookies = [...document.cookie.split(";")].reverse();

      for (let i = 0; i < allCookies.length; i++) {
        let [name, value] = allCookies[i].split("=");

        if (name.trim() === "catalysedType") return value;
      }
    }

    return "";
  };

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
  };

  return (
    <CookieContext.Provider value={values}>
      {props.children}
    </CookieContext.Provider>
  );
};
