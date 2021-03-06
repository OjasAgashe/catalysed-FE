/*
 * This file contains Reducer function of pages/Login
 */

import { LoginActionType, LoginState } from "../types/Login";

export const loginReducer = (state: LoginState, action: LoginActionType) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
