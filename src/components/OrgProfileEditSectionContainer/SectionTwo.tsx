import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  OrgProfileEditActionType,
  OrgProfileEditData,
  OrgProfileEditState,
} from "../../types/OrgProfileEdit";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

type SectionTwoProps = {
  editedData: OrgProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<OrgProfileEditData | null>
  >;
  state: OrgProfileEditState;
  dispatch: React.Dispatch<OrgProfileEditActionType>;
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
  const handleOrgEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
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

  const handlePhoneInputChange = (
    value: string,
    country: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
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

  const handleOrgEditProfileAddressChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });

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
      <div className="SectionTwoFirstHalf">
        <Form noValidate validated={state.validated}>
          <Form.Text className="FormDetailsText">
            Organization Details
          </Form.Text>
          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel EditOrgProfileDetailsDisabledField">
              name
            </Form.Text>

            <Form.Control
              className="SectionTwoFormControl EditOrgProfileDetailsDisabledField"
              disabled
              value={editedData?.organizationDetails.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              description
            </Form.Text>

            <Form.Control
              required
              name="description"
              as="textarea"
              rows={3}
              minLength={10}
              placeholder="Write About Your Organisation"
              className="SectionTwoFormControl SectionTwoTextArea"
              value={editedData?.organizationDetails.description}
              onChange={handleOrgEditProfileChange}
            />
            <Form.Control.Feedback type="invalid" className="InvalidFeedback">
              Organisation description is required (and must have atleast 10
              characters).
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              social link
            </Form.Text>

            <Form.Control
              required
              name="socialMediaLink"
              type="url"
              placeholder="Enter URL..."
              className="SectionTwoFormControl"
              value={editedData?.organizationDetails.socialMediaLink}
              onChange={handleOrgEditProfileChange}
              isInvalid={state.socialLinkIsInvalid}
            />
            <Form.Control.Feedback type="invalid" className="InvalidFeedback">
              Required field, enter Valid Link (only Twitter, LinkedIn,
              Facebook, Instagram).
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              website link
            </Form.Text>

            <Form.Control
              required
              name="website"
              type="url"
              placeholder="Enter URL..."
              className="SectionTwoFormControl"
              value={editedData?.organizationDetails.website}
              onChange={handleOrgEditProfileChange}
              isInvalid={state.websiteLinkIsInvalid}
            />
            <Form.Control.Feedback type="invalid" className="InvalidFeedback">
              Required field, enter Valid Link.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </div>

      <div className="SectionTwoSecondHalf">
        <Form noValidate validated={state.validated}>
          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel EditOrgProfileDetailsDisabledField">
              area of work
            </Form.Text>

            <Form.Control
              disabled
              className="SectionTwoFormControl EditOrgProfileDetailsDisabledField"
              value={editedData?.organizationDetails.workDescription}
            />
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel ContactLabel">
              contact&nbsp;:&nbsp;
            </Form.Text>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionTwoFormTextLabel PhoneLabel">
                    phone
                  </Form.Text>
                  <Form.Control
                    className="PhoneInputControl"
                    isInvalid={state.phoneValueIsInvalid}
                  />
                  <PhoneInput
                    country={"in"}
                    placeholder=""
                    value={state.phoneValue}
                    onChange={(value, country, event, formattedValue) =>
                      handlePhoneInputChange(
                        value,
                        country,
                        event,
                        formattedValue
                      )
                    }
                    inputProps={{
                      name: "phone",
                      required: true,
                      className: "form-control",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, please Enter Correct Value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionTwoFormTextLabel EmailLabel">
                    email
                  </Form.Text>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder="Type.."
                    className="SectionTwoFormControl"
                    value={editedData?.email}
                    // onChange={handleOrgEditProfileContactChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, please Enter Correct Value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              year of Inception
            </Form.Text>
            <Form.Control
              required
              type="number"
              placeholder="YYYY"
              pattern="[0-9]{4}"
              min={1800}
              name="yearOfInception"
              className="SectionTwoFormControl"
              value={editedData?.organizationDetails.yearOfInception}
              onChange={handleOrgEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, please Enter Correct Value (&gt;1800).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel AddressLabel">
              location&nbsp;:&nbsp;
            </Form.Text>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionTwoFormTextLabel CountryLabel">
                    country
                  </Form.Text>
                  <Form.Control
                    required
                    name="country"
                    type="text"
                    placeholder="Type..."
                    className="SectionTwoFormControl"
                    value={editedData?.organizationDetails.address.country}
                    onChange={handleOrgEditProfileAddressChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, please Enter.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionTwoFormTextLabel RegionLabel">
                    region
                  </Form.Text>
                  <Form.Control
                    required
                    name="region"
                    type="text"
                    placeholder="Type..."
                    className="SectionTwoFormControl"
                    value={editedData?.organizationDetails.address.region}
                    onChange={handleOrgEditProfileAddressChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, please Enter.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              primary language
            </Form.Text>
            <Form.Control
              required
              name="primaryLanguage"
              type="text"
              placeholder="Type..."
              className="SectionTwoFormControl"
              value={editedData?.organizationDetails.primaryLanguage}
              onChange={handleOrgEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, please Enter.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

export default SectionTwo;
