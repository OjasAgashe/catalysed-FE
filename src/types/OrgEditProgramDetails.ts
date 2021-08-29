/*
 * This file contains Types related to Org Edit Program Details
 */

import {
  CreateProgramActionType,
  CreateProgramData,
  CreateProgramState,
} from "./CreateProgram";

export interface OrgEditProgramDetailsState extends CreateProgramState {
  loading: boolean;
  validationError: string;
  originalData: CreateProgramData | null;
  showModal: boolean;
  leave: boolean;
  stay: boolean;
  navigateToPath: string;
  dataHasChanged: boolean;
}

type OrgEditDetailsActionType =
  | { type: "loading"; payload: boolean }
  | { type: "validationError"; payload: string }
  | { type: "originalData"; payload: CreateProgramData | null }
  | { type: "showModal"; payload: boolean }
  | { type: "leave"; payload: boolean }
  | { type: "stay"; payload: boolean }
  | { type: "navigateToPath"; payload: string }
  | { type: "dataHasChanged"; payload: boolean };

export type OrgEditProgramDetailsActionType =
  | CreateProgramActionType
  | OrgEditDetailsActionType;
