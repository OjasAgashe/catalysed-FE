import React from "react";
import {
  OrgProfileEditActionType,
  OrgProfileEditData,
  OrgProfileEditState,
} from "../../types/OrgProfileEdit";
import SectionTwoFragment from "./SectionTwoFragment";

type SectionTwoProps = {
  editedData: OrgProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<OrgProfileEditData | null>
  >;
  state: OrgProfileEditState;
  dispatch: React.Dispatch<OrgProfileEditActionType>;
  possibleSocialBaseURL: string[];
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
  possibleSocialBaseURL,
}: SectionTwoProps) => {
  const handleOrgEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * Set the value of state.validated to false, if previously it is true.
       *
       * And do the same for state.phoneValueIsInvalid, state.socialLinkIsInvalid
       * , and state.websiteLinkIsInvalid
       */
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.phoneValueIsInvalid)
        dispatch({ type: "phoneValueIsInvalid", payload: false });

      if (state.socialLinkIsInvalid)
        dispatch({ type: "socialLinkIsInvalid", payload: false });
      if (state.websiteLinkIsInvalid)
        dispatch({ type: "websiteLinkIsInvalid", payload: false });

      if (
        event.target.name === "yearOfInception" &&
        event.target.value.length > 4
      ) {
        return;
      }

      setEditedData(
        (prevState): OrgProfileEditData =>
          ({
            ...prevState,
            organizationDetails: {
              ...prevState?.organizationDetails,
              [event.target.name]: event.target.value,
            },
          } as OrgProfileEditData)
      );

      /*
       * If the target name is socialMediaLink then extract the code of the
       * base URL of that link
       *
       * Same that we are doing in Organisation Registration
       */
      if (event.target.name === "socialMediaLink") {
        let code = "";

        for (let index = 0; index < possibleSocialBaseURL.length; index++) {
          let baseURL = possibleSocialBaseURL[index];

          if (event.target.value.includes(baseURL)) {
            switch (index) {
              case 0:
              case 4:
                code = "TWITTER";
                break;

              case 1:
              case 5:
                code = "LINKED_IN";
                break;

              case 2:
              case 6:
                code = "FACEBOOK";
                break;

              case 3:
              case 7:
                code = "INSTAGRAM";
                break;
            }
            break;
          }
        }

        setEditedData(
          (prevState): OrgProfileEditData =>
            ({
              ...prevState,
              organizationDetails: {
                ...prevState?.organizationDetails,
                socialMediaCode: code,
              },
            } as OrgProfileEditData)
        );
      }
    };

  // const handleOrgEditProfileContactChange: React.ChangeEventHandler<HTMLInputElement> =
  //   (event) => {
  //     if (state.validated) dispatch({ type: "validated", payload: false });

  //     setEditedData((prevState): OrgProfileEditData => ({
  //       ...prevState,
  //       organizationDetails: {
  //         ...prevState.organisation,
  //         contact: {
  //           ...prevState.organisation.contact,
  //           [event.target.name]: event.target.value,
  //         },
  //       },
  //     }));
  //   };

  /*
   * Function to handle changed done in Phone Input field
   */
  const handlePhoneInputChange = (
    value: string,
    country: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    /*
     * Set the value of state.validated to false, if previously it is true.
     *
     * And do the same for state.phoneValueIsInvalid, state.socialLinkIsInvalid
     * , and state.websiteLinkIsInvalid
     */
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.phoneValueIsInvalid)
      dispatch({ type: "phoneValueIsInvalid", payload: false });

    if (state.socialLinkIsInvalid)
      dispatch({ type: "socialLinkIsInvalid", payload: false });
    if (state.websiteLinkIsInvalid)
      dispatch({ type: "websiteLinkIsInvalid", payload: false });

    dispatch({ type: "phoneValue", payload: value });

    const countryInfo = country as CountryData;
    const phone = {
      countryName: countryInfo.name,
      countryCode: "+" + countryInfo.dialCode,
      number: value.replace(`${countryInfo.dialCode}`, ""),
    };

    setEditedData(
      (prevState): OrgProfileEditData =>
        ({
          ...prevState,
          organizationDetails: {
            ...prevState?.organizationDetails,
            phone,
          },
        } as OrgProfileEditData)
    );
  };

  /*
   * Function to handle changes done in address input fields
   */
  const handleOrgEditProfileAddressChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * Set the value of state.validated to false, if previously it is true.
       *
       * And do the same for state.phoneValueIsInvalid, state.socialLinkIsInvalid
       * , and state.websiteLinkIsInvalid
       */
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.phoneValueIsInvalid)
        dispatch({ type: "phoneValueIsInvalid", payload: false });

      if (state.socialLinkIsInvalid)
        dispatch({ type: "socialLinkIsInvalid", payload: false });
      if (state.websiteLinkIsInvalid)
        dispatch({ type: "websiteLinkIsInvalid", payload: false });

      setEditedData(
        (prevState): OrgProfileEditData =>
          ({
            ...prevState,
            organizationDetails: {
              ...prevState?.organizationDetails,
              address: {
                ...prevState?.organizationDetails.address,
                [event.target.name]: event.target.value,
              },
            },
          } as OrgProfileEditData)
      );
    };

  return (
    <section className="OrgProfileEditSectionTwo">
      {/* Show SectionTwoFragment component */}
      <SectionTwoFragment
        state={state}
        editedData={editedData}
        handleOrgEditProfileChange={handleOrgEditProfileChange}
        handlePhoneInputChange={handlePhoneInputChange}
        handleOrgEditProfileAddressChange={handleOrgEditProfileAddressChange}
      />
    </section>
  );
};

export default SectionTwo;
