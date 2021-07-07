import { AxiosResponse } from "axios";
import { CreateProgramData } from "./CreateProgram";
import { OrgInvitationPostData } from "./OrgProgramDetails";

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
    studentId: number
  ): Promise<AxiosResponse<any>>;
  getSpecificMentorApplicantDetails(
    programId: number,
    mentorId: number
  ): Promise<AxiosResponse<any>>;
}
