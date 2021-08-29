/*
 * This file contains Reducer Function of pages/OrgProgramDetails
 */

import {
  OrgProgramInvitationActionType,
  OrgProgramInvitationState,
} from "../types/OrgProgramDetails";

export const orgProgramInvitationReducer = (
  state: OrgProgramInvitationState,
  action: OrgProgramInvitationActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
