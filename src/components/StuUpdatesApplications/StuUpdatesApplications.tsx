import React, { useCallback, useMemo } from "react";
import {
  StudentUpdatesCommonActionType,
  StudentUpdatesCommonResponse,
  StudentUpdatesCommonState,
  StudentUpdatesCommonValues,
} from "../../types/StudentUpdates";
import Error from "../Error/Error";
import SearchBar from "./SearchBar";
import StuUpdatesApplicationsDataContainer from "./StuUpdatesApplicationsDataContainer";
import "./StuUpdatesApplications.css";

type StuUpdatesApplicationsProps = {
  state: StudentUpdatesCommonState;
  dispatch: React.Dispatch<StudentUpdatesCommonActionType>;
  entity: string;
};

const StuUpdatesApplications = ({
  state,
  dispatch,
  entity,
}: StuUpdatesApplicationsProps) => {
  const filterApprovedResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state?.responseData?.filter((data) => data.status === "APPROVED"),
    [state.responseData]
  );

  const filterApprovedTempFilteredData = useCallback(
    (tempFilteredData: StudentUpdatesCommonResponse[]) =>
      tempFilteredData.filter((data) => data.status === "APPROVED"),
    []
  );

  const filterPendingResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state?.responseData?.filter((data) => data.status === "PENDING"),
    [state.responseData]
  );

  const filterPendingTempFilteredData = useCallback(
    (tempFilteredData: StudentUpdatesCommonResponse[]) =>
      tempFilteredData.filter((data) => data.status === "PENDING"),
    []
  );

  const filterRejectedResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state?.responseData?.filter((data) => data.status === "REJECTED"),
    [state.responseData]
  );

  const filterRejectedTempFilteredData = useCallback(
    (tempFilteredData: StudentUpdatesCommonResponse[]) =>
      tempFilteredData.filter((data) => data.status === "REJECTED"),
    []
  );

  const sortDateByLatestUsing = useCallback(
    (
      obj1: StudentUpdatesCommonResponse,
      obj2: StudentUpdatesCommonResponse
    ) => {
      const DateOne = new Date(obj1.appliedOn);
      const DateTwo = new Date(obj2.appliedOn);

      const [day1, month1, year1] = [
        DateOne.getDate(),
        DateOne.getMonth(),
        DateOne.getFullYear(),
      ];
      const [day2, month2, year2] = [
        DateTwo.getDate(),
        DateTwo.getMonth(),
        DateOne.getFullYear(),
      ];

      return new Date(year1, month1, day1) > new Date(year2, month2, day2)
        ? 1
        : -1;
    },
    []
  );

  const sortDateByOldestUsing = useCallback(
    (
      obj1: StudentUpdatesCommonResponse,
      obj2: StudentUpdatesCommonResponse
    ) => {
      const DateOne = new Date(obj1.appliedOn);
      const DateTwo = new Date(obj2.appliedOn);

      const [day1, month1, year1] = [
        DateOne.getDate(),
        DateOne.getMonth(),
        DateOne.getFullYear(),
      ];
      const [day2, month2, year2] = [
        DateTwo.getDate(),
        DateTwo.getMonth(),
        DateOne.getFullYear(),
      ];

      return new Date(year1, month1, day1) > new Date(year2, month2, day2)
        ? -1
        : 1;
    },
    []
  );

  const values: StudentUpdatesCommonValues = {
    filterApprovedResponseData,
    filterPendingResponseData,
    filterRejectedResponseData,
    filterApprovedTempFilteredData,
    filterPendingTempFilteredData,
    filterRejectedTempFilteredData,
    sortDateByLatestUsing,
    sortDateByOldestUsing,
  };

  return (
    <div className="StuUpdatesApplicationsDetails">
      <div className="StuUpdatesApplicationsDetailsContainer">
        {state.responseData && state.responseData.length ? (
          <>
            <SearchBar state={state} dispatch={dispatch} values={values} />

            <StuUpdatesApplicationsDataContainer
              state={state}
              dispatch={dispatch}
              values={values}
              entity={entity}
            />
          </>
        ) : (
          <div className="ErrorCompContainer">
            <Error message="Sorry !!! No Data Found" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StuUpdatesApplications;
