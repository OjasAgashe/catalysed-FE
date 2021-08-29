/*
 * This file contains Reducer Function of pages/StuUpdatesOrganisationDetails
 */

import {
  StudentUpdatesOrganisationDetailsActionType,
  StudentUpdatesOrganisationDetailsState,
} from "../types/StudentUpdates";

export const stuUpdatesOrganisationDetailsReducer = (
  state: StudentUpdatesOrganisationDetailsState,
  action: StudentUpdatesOrganisationDetailsActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
