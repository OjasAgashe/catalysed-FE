/*
 * This file contains Types of context/api_context
 */

import { AxiosResponse } from "axios";
import { StudentProfileEditData } from "./StudentProfileEdit";
import { StuSuggestedProgramApplicationData } from "./StuSuggestedProgramApplication";

export interface StudentAPIProviderReturns {
  postCreateApplication: (
    data: StuSuggestedProgramApplicationData,
    programId: number
  ) => Promise<AxiosResponse<any>>;
  getAllFilledApplicationsDetails: () => Promise<AxiosResponse<any>>;
  getSpecificFilledApplicationDetails: (
    applicationId: number
  ) => Promise<AxiosResponse<any>>;
  getStudentProfile: () => Promise<AxiosResponse<any>>;
  putStudentProfile: (
    data: StudentProfileEditData
  ) => Promise<AxiosResponse<any>>;
  getSuggestedPrograms: () => Promise<AxiosResponse<any>>;
  getSuggestedProgramDetails: (
    programId: number
  ) => Promise<AxiosResponse<any>>;
  getConnectedOrganisations: () => Promise<AxiosResponse<any>>;
  getConnectedOrganisationDetails: (
    organisationId: number
  ) => Promise<AxiosResponse<any>>;
  getConnectedPrograms: () => Promise<AxiosResponse<any>>;
  getConnectedProgramDetails: (
    programId: number
  ) => Promise<AxiosResponse<any>>;
  getConnectedProgramParticipants: (
    programId: number
  ) => Promise<AxiosResponse<any>>;
  getConnectedAboutToStartPrograms: () => Promise<any[]>;
  getConnectedRunningPrograms: () => Promise<any[]>;
}
