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

const CookieContext = React.createContext<CookieProviderReturns | null>(null);

export function useCookie() {
  return useContext(CookieContext) as CookieProviderReturns;
}

export const CookieProvider: React.FC<React.ReactNode> = (props) => {
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

  const setCatalysedCreatedCookie = (catalysedCreated: boolean): void => {
    document.cookie = `catalysedCreated=${encodeURIComponent(
      catalysedCreated
    )}; path=/`;
    // secure`;
  };

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

  const setCatalysedIdCookie = (catalysedId: number | null): void => {
    document.cookie = `catalysedId=${encodeURIComponent(
      catalysedId === null ? "" : catalysedId
    )}; path=/`;
    // secure`;
  };

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

  const setCatalysedTokenCookie = (catalysedToken: string): void => {
    document.cookie = `catalysedToken=${encodeURIComponent(
      catalysedToken
    )}; path=/`;
    // secure`;
  };

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

  const setCatalysedTypeCookie = (catalysedType: string): void => {
    document.cookie = `catalysedType=${encodeURIComponent(
      catalysedType
    )}; path=/`;
    // secure`;
  };

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

  const setCatalysedUserNameCookie = (catalysedUserName: string): void => {
    document.cookie = `catalysedUserName=${encodeURIComponent(
      catalysedUserName
    )}; path=/`;
    // secure`;
  };

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

  const setCatalysedOrgNameCookie = (catalysedOrgName: string): void => {
    document.cookie = `catalysedOrgName=${encodeURIComponent(
      catalysedOrgName
    )}; path=/`;
    // secure`;
  };

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
