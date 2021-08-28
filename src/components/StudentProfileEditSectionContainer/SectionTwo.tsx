import React from "react";
import {
  StudentProfileEditActionType,
  StudentProfileEditData,
  StudentProfileEditState,
} from "../../types/StudentProfileEdit";
import SectionTwoFragment from "./SectionTwoFragment";

type SectionTwoProps = {
  editedData: StudentProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<StudentProfileEditData | null>
  >;
  state: StudentProfileEditState;
  dispatch: React.Dispatch<StudentProfileEditActionType>;
};

type CountryData = {
  name: string;
  countryCode: string;
  dialCode: string;
  format: string;
};

const SectionTwo = ({
  editedData,
  setEditedData,
  state,
  dispatch,
}: SectionTwoProps) => {
  const handleStudentEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * Set the value of state.validated to false, if it was true
       *
       * And do same for state.phoneValueIsInvalid
       */
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.phoneValueIsInvalid)
        dispatch({ type: "phoneValueIsInvalid", payload: false });

      switch (event.target.name) {
        case "gender":
          let gender =
            event.target.value === "Male"
              ? "MALE"
              : event.target.value === "Female"
              ? "FEMALE"
              : event.target.value === "Other"
              ? "OTHER"
              : "";
          setEditedData(
            (prevState): StudentProfileEditData =>
              ({ ...prevState, gender } as StudentProfileEditData)
          );
          break;

        case "previouslyMentored":
          let previouslyMentored = event.target.value === "Yes" ? true : false;
          setEditedData(
            (prevState): StudentProfileEditData =>
              ({ ...prevState, previouslyMentored } as StudentProfileEditData)
          );
          break;

        case "stableConnection":
          let stableConnection = event.target.value === "Yes" ? true : false;
          setEditedData(
            (prevState): StudentProfileEditData =>
              ({
                ...prevState,
                stableConnection,
              } as StudentProfileEditData)
          );
          break;

        case "primaryDevice":
          let primaryDevice =
            event.target.value === "Mobile"
              ? "MOBILE"
              : event.target.value === "Computer"
              ? "COMPUTER"
              : "";
          setEditedData(
            (prevState): StudentProfileEditData =>
              ({
                ...prevState,
                primaryDevice,
              } as StudentProfileEditData)
          );
          break;

        case "age":
          // if (event.target.value.length > 2) {
          //   return;
          // }

          setEditedData(
            (prevState): StudentProfileEditData =>
              ({
                ...prevState,
                birthYear: (
                  new Date().getFullYear() - parseInt(event.target.value)
                ).toString(),
              } as StudentProfileEditData)
          );
          break;

        default:
          const onlyAlphabets = /^[a-zA-Z][a-zA-z ]*$/;

          if (
            event.target.value !== "" &&
            onlyAlphabets.test(event.target.value) === false
          ) {
            return;
          }

          setEditedData(
            (prevState): StudentProfileEditData =>
              ({
                ...prevState,
                [event.target.name]: event.target.value,
              } as StudentProfileEditData)
          );
      }
    };

  /*
   * Much same like of SectionTwo of OrgProfileEditSectionContainer component
   */
  const handlePhoneInputChange = (
    value: string,
    country: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.phoneValueIsInvalid)
      dispatch({ type: "phoneValueIsInvalid", payload: false });

    dispatch({ type: "phoneValue", payload: value });

    const countryInfo = country as CountryData;
    const phone = {
      countryName: countryInfo.name,
      countryCode: "+" + countryInfo.dialCode,
      number: value.replace(`${countryInfo.dialCode}`, ""),
    };

    setEditedData(
      (prevState): StudentProfileEditData =>
        ({ ...prevState, phone } as StudentProfileEditData)
    );
  };

  /*
   * Much same like SectionTwo of OrgProfileEditSectionContainer component
   */
  const handleStudentEditProfileAddressChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.phoneValueIsInvalid)
        dispatch({ type: "phoneValueIsInvalid", payload: false });

      setEditedData(
        (prevState): StudentProfileEditData =>
          ({
            ...prevState,
            location: {
              ...prevState?.location,
              [event.target.name]: event.target.value,
            },
          } as StudentProfileEditData)
      );
    };

  return (
    <section className="OrgProfileEditSectionTwo">
      <SectionTwoFragment
        state={state}
        editedData={editedData}
        handleStudentEditProfileChange={handleStudentEditProfileChange}
        handlePhoneInputChange={handlePhoneInputChange}
        handleStudentEditProfileAddressChange={
          handleStudentEditProfileAddressChange
        }
      />
    </section>
  );
};

export default SectionTwo;
