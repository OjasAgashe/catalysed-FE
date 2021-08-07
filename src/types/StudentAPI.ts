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
}
