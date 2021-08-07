import { AxiosResponse } from "axios";
import { MentorProfileEditData } from "./MentorProfileEdit";
import { StuSuggestedProgramApplicationData } from "./StuSuggestedProgramApplication";

export interface MentorAPIProviderReturns {
  postCreateApplication: (
    data: StuSuggestedProgramApplicationData,
    programId: number
  ) => Promise<AxiosResponse<any>>;
  getAllFilledApplicationsDetails: () => Promise<AxiosResponse<any>>;
  getSpecificFilledApplicationDetails: (
    applicationId: number
  ) => Promise<AxiosResponse<any>>;
  getMentorProfile: () => Promise<AxiosResponse<any>>;
  putMentorProfile: (
    data: MentorProfileEditData
  ) => Promise<AxiosResponse<any>>;
  getSuggestedPrograms: () => Promise<AxiosResponse<any>>;
  getSuggestedProgramDetails: (
    programId: number
  ) => Promise<AxiosResponse<any>>;
}
