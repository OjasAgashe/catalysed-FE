import {
  OrgDirectoryDetailsCTPSectionActionType,
  OrgDirectoryDetailsCTPSectionState,
} from "../types/OrganisationDirectory";

export const orgDirectoryDetailsCTPSectionReducer = (
  state: OrgDirectoryDetailsCTPSectionState,
  action: OrgDirectoryDetailsCTPSectionActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
