/*
 * This file contains Reducer Function of components/OrgDirectoryDetailsConnectedToPrograms
 */

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
