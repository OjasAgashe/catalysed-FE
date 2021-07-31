import React from "react";
import { Col, Form, Row } from "react-bootstrap";

type SectionTwoProps = {
  fakeData: {
    firstName: string;
    lastName: string;
    email: string;
    profileBuilderDetails: {
      age: string;
      organisation: string;
      address: {
        country: string;
        region: string;
      };
      gender: string;
      primary_language: string;
      professional_mentored: string;
      stable_connection: string;
      contact: {
        phone: string;
        email: string;
      };
      device: string;
    };
  };

  setFakeData: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      profileBuilderDetails: {
        age: string;
        organisation: string;
        address: {
          country: string;
          region: string;
        };
        gender: string;
        primary_language: string;
        professional_mentored: string;
        stable_connection: string;
        contact: {
          phone: string;
          email: string;
        };
        device: string;
      };
    }>
  >;

  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

const SectionTwo = ({
  fakeData,
  setFakeData,
  validated,
  setValidated,
}: SectionTwoProps) => {
  const handleStudentEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);
    };

  const handleStudentEditProfileContactChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (validated) setValidated(false);
  }
  
  return (
    <section className="OrgProfileEditSectionTwo">
      <div className="SectionTwoFirstHalf">
        <Form validated={validated} noValidate>
          <Form.Text className="FormDetailsText">
            Profile Builder Details
          </Form.Text>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">age</Form.Text>

            <Form.Control
              required
              name="age"
              type="number"
              pattern="[0-9]{2}"
              min={18}
              placeholder="YY"
              className="SectionTwoFormControl"
              value={fakeData.profileBuilderDetails.age}
              onChange={handleStudentEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, only valid YY (&gt;= 18).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              school / organisation
            </Form.Text>

            <Form.Control
              required
              name="organisation"
              type="text"
              placeholder="Type your organisation/school..."
              className="SectionTwoFormControl"
              value={fakeData.profileBuilderDetails.organisation}
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
              checked={fakeData.profileBuilderDetails.gender === "Male"}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="Female"
              type="radio"
              name="gender"
              value="Female"
              checked={fakeData.profileBuilderDetails.gender === "Female"}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="Other"
              type="radio"
              name="gender"
              value="Other"
              checked={fakeData.profileBuilderDetails.gender === "Other"}
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
              name="primary_language"
              type="text"
              placeholder="Type..."
              className="SectionTwoFormControl"
              value={fakeData.profileBuilderDetails.primary_language}
              onChange={handleStudentEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, only Alphabets
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </div>

      <div className="SectionTwoSecondHalf">
        <Form validated={validated} noValidate>
          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              ever been professionally mentored before?
            </Form.Text>

            <Form.Check
              inline
              label="Yes"
              type="radio"
              name="professional_mentored"
              value="Yes"
              checked={
                fakeData.profileBuilderDetails.professional_mentored === "Yes"
              }
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="No"
              type="radio"
              name="professional_mentored"
              value="No"
              checked={
                fakeData.profileBuilderDetails.professional_mentored === "No"
              }
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
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
                    required
                    type="tel"
                    name="phone"
                    placeholder="Type..."
                    className="SectionTwoFormControl"
                    value={fakeData.profileBuilderDetails.contact.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, please Enter Correct Value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionTwoFormTextLabel EmailLabel EditOrgProfileDetailsDisabledField">
                    email
                  </Form.Text>
                  <Form.Control
                    className="SectionTwoFormControl EditOrgProfileDetailsDisabledField"
                    disabled
                    value={fakeData.profileBuilderDetails.contact.email}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              have a stable connection?
            </Form.Text>

            <Form.Check
              inline
              label="Yes"
              type="radio"
              name="stable_connection"
              value="Yes"
              checked={
                fakeData.profileBuilderDetails.stable_connection === "Yes"
              }
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="No"
              type="radio"
              name="stable_connection"
              value="No"
              checked={
                fakeData.profileBuilderDetails.stable_connection === "No"
              }
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
                    value={fakeData.profileBuilderDetails.address.country}
                    onChange={handleStudentEditProfileChange}
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
                    value={fakeData.profileBuilderDetails.address.region}
                    onChange={handleStudentEditProfileChange}
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
              name="device"
              value="Mobile"
              checked={fakeData.profileBuilderDetails.device === "Mobile"}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
            <Form.Check
              inline
              label="Computer"
              type="radio"
              name="device"
              value="Computer"
              checked={fakeData.profileBuilderDetails.device === "Computer"}
              className="SectionTwoFormCheck"
              onChange={handleStudentEditProfileChange}
            />
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

export default SectionTwo;
