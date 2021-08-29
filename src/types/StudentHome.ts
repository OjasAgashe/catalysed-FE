/*
 * This file contains Types related to Student Home
 */

import { StudentConnectedProgramData } from "./StudentUpdates";

export interface StudentHomeState {
  loading: boolean;
  runningPrograms: StudentConnectedProgramData[];
  aboutToStartPrograms: StudentConnectedProgramData[];
  suggestedPrograms: StudentConnectedProgramData[];
  entity: string;
}

export type StudentHomeActionType =
  | { type: "loading"; payload: boolean }
  | { type: "runningPrograms"; payload: StudentConnectedProgramData[] }
  | {
      type: "aboutToStartPrograms";
      payload: StudentConnectedProgramData[];
    }
  | { type: "suggestedPrograms"; payload: StudentConnectedProgramData[] }
  | { type: "entity"; payload: string };
