import {
  OrgDirectoryDetailsCommonActionType,
  OrgDirectoryDetailsCommonState,
} from "../types/OrganisationDirectory";

export const orgDirectoryDetailsReducer = (
  state: OrgDirectoryDetailsCommonState,
  action: OrgDirectoryDetailsCommonActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
