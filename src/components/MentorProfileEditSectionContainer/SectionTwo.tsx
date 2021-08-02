import React from "react";
import {
  MentorProfileEditActionType,
  MentorProfileEditData,
  MentorProfileEditState,
} from "../../types/MentorProfileEdit";
import SectionTwoFragment from "./SectionTwoFragment";

type SectionTwoProps = {
  editedData: MentorProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<MentorProfileEditData | null>
  >;
  state: MentorProfileEditState;
  dispatch: React.Dispatch<MentorProfileEditActionType>;
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
  const handleMentorEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
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
            (prevState): MentorProfileEditData =>
              ({ ...prevState, gender } as MentorProfileEditData)
          );
          break;

        case "previouslyMentored":
          let previouslyMentored = event.target.value === "Yes" ? true : false;
          setEditedData(
            (prevState): MentorProfileEditData =>
              ({ ...prevState, previouslyMentored } as MentorProfileEditData)
          );

          if (previouslyMentored === false) {
            setEditedData(
              (prevState): MentorProfileEditData =>
                ({
                  ...prevState,
                  experience: 0,
                } as MentorProfileEditData)
            );
          }
          break;

        case "experience":
          if (parseInt(event.target.value) < 0) return;

          let experience: number | string = event.target.value;
          if (event.target.value === "") {
            experience = "";
          } else {
            experience = Number(experience);
          }

          setEditedData(
            (prevState): MentorProfileEditData =>
              ({
                ...prevState,
                experience,
              } as MentorProfileEditData)
          );
          break;

        case "stableConnection":
          let stableConnection = event.target.value === "Yes" ? true : false;
          setEditedData(
            (prevState): MentorProfileEditData =>
              ({
                ...prevState,
                stableConnection,
              } as MentorProfileEditData)
          );
          break;

        case "age":
          if (event.target.value.length > 2) {
            return;
          }

          setEditedData(
            (prevState): MentorProfileEditData =>
              ({
                ...prevState,
                birthYear: (
                  new Date().getFullYear() - parseInt(event.target.value)
                ).toString(),
              } as MentorProfileEditData)
          );
          break;

        default:
          const onlyAlphabets = /^[a-zA-Z]*$/;

          if (onlyAlphabets.test(event.target.value) === false) {
            return;
          }

          setEditedData(
            (prevState): MentorProfileEditData =>
              ({
                ...prevState,
                [event.target.name]: event.target.value,
              } as MentorProfileEditData)
          );
      }
    };

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
      (prevState): MentorProfileEditData =>
        ({ ...prevState, phone } as MentorProfileEditData)
    );
  };

  const handleMentorEditProfileAddressChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.phoneValueIsInvalid)
        dispatch({ type: "phoneValueIsInvalid", payload: false });

      setEditedData(
        (prevState): MentorProfileEditData =>
          ({
            ...prevState,
            address: {
              ...prevState?.address,
              [event.target.name]: event.target.name,
            },
          } as MentorProfileEditData)
      );
    };

  return (
    <section className="OrgProfileEditSectionTwo">
      <SectionTwoFragment
        state={state}
        editedData={editedData}
        handleMentorEditProfileChange={handleMentorEditProfileChange}
        handlePhoneInputChange={handlePhoneInputChange}
        handleMentorEditProfileAddressChange={
          handleMentorEditProfileAddressChange
        }
      />
    </section>
  );
};

export default SectionTwo;
