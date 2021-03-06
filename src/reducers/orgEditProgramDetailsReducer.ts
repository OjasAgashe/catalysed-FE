/*
 * This file contains Reducer Function of pages/OrgEditProgramDetailsPage
 */

import {
  OrgEditProgramDetailsActionType,
  OrgEditProgramDetailsState,
} from "../types/OrgEditProgramDetails";

export const orgEditProgramDetailsReducer = (
  state: OrgEditProgramDetailsState,
  action: OrgEditProgramDetailsActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
