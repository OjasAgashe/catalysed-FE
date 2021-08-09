import { AxiosResponse } from "axios";
import { CreateProgramData } from "./CreateProgram";
import { OrgProfileEditData } from "./OrgProfileEdit";
import { OrgInvitationPostData } from "./OrgProgramDetails";
import { OrgSpecificApplicantDetailsResponse } from "./OrgSpecificApplicantDetails";

export interface OrgAPIProviderReturns {
  postCreateProgramCall: (
    data: CreateProgramData
  ) => Promise<AxiosResponse<any>>;
  getProgramsMetaList: () => Promise<AxiosResponse<any>>;
  getProgramDetails: (programId: number) => Promise<AxiosResponse<any>>;
  putUpdatedProgramDetails: (
    programId: number,
    data: CreateProgramData
  ) => Promise<AxiosResponse<any>>;
  putUpdatedProgramStatusToPublish: (
    programId: number,
    data: CreateProgramData
  ) => Promise<AxiosResponse<any>>;
  getProgramsStartingThisMonth: () => Promise<any[]>;
  getOngoingPrograms: () => Promise<any[]>;
  getProgramInvitations: (programId: number) => Promise<AxiosResponse<any>>;
  postProgramInvitations: (
    programId: number,
    data: OrgInvitationPostData
  ) => Promise<AxiosResponse<any>>;
  getProgramParticipants: (programId: number) => Promise<AxiosResponse<any>>;
  getConnectedMentors: () => Promise<AxiosResponse<any>>;
  getConnectedStudents: () => Promise<AxiosResponse<any>>;
  getSpecificConnectedMentor(mentorId: number): Promise<AxiosResponse<any>>;
  getSpecificConnectedStudent(studentId: number): Promise<AxiosResponse<any>>;
  getStudentApplicationForProgram: (
    programId: number
  ) => Promise<AxiosResponse<any>>;
  getMentorApplicationForProgram: (
    programId: number
  ) => Promise<AxiosResponse<any>>;
  getSpecificStudentApplicantDetails(
    programId: number,
    applicationId: number
  ): Promise<AxiosResponse<any>>;
  getSpecificMentorApplicantDetails(
    programId: number,
    applicationId: number
  ): Promise<AxiosResponse<any>>;
  putSpecificApplicantDetailsAsViewed(
    programId: number,
    applicationId: number,
    data: OrgSpecificApplicantDetailsResponse
  ): Promise<AxiosResponse<any>>;
  putStatusOfSpecificApplicantDetails(
    programId: number,
    applicationId: number,
    data: OrgSpecificApplicantDetailsResponse,
    status: string
  ): Promise<AxiosResponse<any>>;
  getOrganisationProfile(): Promise<AxiosResponse<any>>;
  putOrganisationProfile(data: OrgProfileEditData): Promise<AxiosResponse<any>>;
  getOrgHomePageData(): Promise<AxiosResponse<any>>;
}
