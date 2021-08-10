import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import {
  StudentProfileEditData,
  StudentProfileEditState,
} from "../../types/StudentProfileEdit";
type CountryData = {
  name: string;
  countryCode: string;
  dialCode: string;
  format: string;
};

type SectionTwoFragmentProps = {
  state: StudentProfileEditState;
  editedData: StudentProfileEditData | null;
  handleStudentEditProfileChange: React.ChangeEventHandler<HTMLInputElement>;
  handlePhoneInputChange: (
    value: string,
    country: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;
  handleStudentEditProfileAddressChange: React.ChangeEventHandler<HTMLInputElement>;
};

const SectionTwoFragment = ({
  state,
  editedData,
  handleStudentEditProfileChange,
  handlePhoneInputChange,
  handleStudentEditProfileAddressChange,
}: SectionTwoFragmentProps) => {
  return (
    <>
      <div className="SectionTwoFirstHalf">
        <Form validated={state.validated} noValidate>
          <Form.Text className="FormDetailsText">
            Profile Builder Details
          </Form.Text>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">age</Form.Text>

            <Form.Control
              required
              name="age"
              type="number"
              // pattern="[0-9]{2}"
              // min={18}
              // placeholder="YY"
              className="SectionTwoFormControl"
              value={new Date().getFullYear() - Number(editedData?.birthYear)}
              onChange={handleStudentEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field
              {/* , only valid YY (&gt;= 18). */}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              school / organisation
            </Form.Text>

            <Form.Control
              required
              name="organization"
              type="text"
              placeholder="Type your organisation/school..."
              className="SectionTwoFormControl"
              value={editedData?.organization}
              onChange={handleStudentEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, only Alphabets.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="GenderFormGroup">
            <Form.Text className="SectionTwoFormTextLabel">gender</Form.Text>

            <Form.Check
              inline
              label="Male"
              type="radio"
              name="gender"
              value="Male"
              checked={editedData?.gender === "MALE"}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="Female"
              type="radio"
              name="gender"
              value="Female"
              checked={editedData?.gender === "FEMALE"}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="Other"
              type="radio"
              name="gender"
              value="Other"
              checked={editedData?.gender === "OTHER"}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
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
              value={editedData?.primaryLanguage}
              onChange={handleStudentEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, only Alphabets
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </div>

      <div className="SectionTwoSecondHalf">
        <Form validated={state.validated} noValidate>
          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              ever been professionally mentored before?
            </Form.Text>

            <Form.Check
              inline
              label="Yes"
              type="radio"
              name="previouslyMentored"
              value="Yes"
              checked={editedData?.previouslyMentored}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="No"
              type="radio"
              name="previouslyMentored"
              value="No"
              checked={editedData?.previouslyMentored === false ? true : false}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">phone</Form.Text>
            <Form.Control
              className="PhoneInputControl"
              isInvalid={state.phoneValueIsInvalid}
            />
            <PhoneInput
              country={"in"}
              placeholder=""
              value={state.phoneValue}
              onChange={(value, country, event, formattedValue) =>
                handlePhoneInputChange(value, country, event, formattedValue)
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

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              have a stable connection?
            </Form.Text>

            <Form.Check
              inline
              label="Yes"
              type="radio"
              name="stableConnection"
              value="Yes"
              checked={editedData?.stableConnection}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="No"
              type="radio"
              name="stableConnection"
              value="No"
              checked={editedData?.stableConnection === false ? true : false}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
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
                    value={editedData?.location.country}
                    onChange={handleStudentEditProfileAddressChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, only Alphabets.
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
                    value={editedData?.location.region}
                    onChange={handleStudentEditProfileAddressChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, only Alphabets.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              device you frequently use
            </Form.Text>

            <Form.Check
              inline
              label="Mobile"
              type="radio"
              name="primaryDevice"
              value="Mobile"
              checked={editedData?.primaryDevice === "MOBILE"}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="Computer"
              type="radio"
              name="primaryDevice"
              value="Computer"
              checked={editedData?.primaryDevice === "COMPUTER"}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default SectionTwoFragment;
