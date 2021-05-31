import {
  CreateProgramActionType,
  CreateProgramData,
  CreateProgramState,
} from "./CreateProgram";

export interface OrgEditProgramDetailsState extends CreateProgramState {
  loading: boolean;
  validationError: string;
  originalData: CreateProgramData | null;
}

type OrgEditDetailsActionType =
  | { type: "loading"; payload: boolean }
  | { type: "validationError"; payload: string }
  | { type: "originalData"; payload: CreateProgramData | null };

export type OrgEditProgramDetailsActionType =
  | CreateProgramActionType
  | OrgEditDetailsActionType;
