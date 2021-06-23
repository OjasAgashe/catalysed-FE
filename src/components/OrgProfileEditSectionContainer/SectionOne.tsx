import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { OrgProfileManagePersonalInfo } from "../../assets/Illustrations/Illustrations";

type SectionOneProps = {
  fakeData: {
    firstName: string;
    lastName: string;
    email: string;
    organisation: {
      name: string;
      description: string;
      social_link: string;
      website_link: string;
      area_of_work: string;
      contact: {
        phone: string;
        email: string;
      };
      year_of_inception: string;
      address: {
        country: string;
        region: string;
      };
      primary_language: string;
    };
  };

  setFakeData: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      organisation: {
        name: string;
        description: string;
        social_link: string;
        website_link: string;
        area_of_work: string;
        contact: {
          phone: string;
          email: string;
        };
        year_of_inception: string;
        address: {
          country: string;
          region: string;
        };
        primary_language: string;
      };
    }>
  >;

  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

const SectionOne = ({
  fakeData,
  setFakeData,
  validated,
  setValidated,
}: SectionOneProps) => {
  const handleOrgEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);

      setFakeData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    };

  return (
    <section className="OrgProfileManageSectionOne">
      <div className="SectionOneFirstHalf">
        <img src={OrgProfileManagePersonalInfo} alt="personal info svg" />
      </div>

      <div className="SectionOneSecondHalf">
        <Form noValidate validated={validated}>
          <Form.Text className="FormDetailsText">User Details</Form.Text>

          <Row className="SectionOneRow">
            <Col>
              <Form.Text className="SectionOneFormTextLabel">
                first name
              </Form.Text>
              <Form.Control
                required
                name="firstName"
                type="text"
                placeholder="Type..."
                className="SectionOneFormControl"
                value={fakeData.firstName}
                onChange={handleOrgEditProfileChange}
              />
              <Form.Control.Feedback type="invalid">
                Required field, please Enter.
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Text className="SectionOneFormTextLabel">
                last name
              </Form.Text>
              <Form.Control
                required
                name="lastName"
                type="text"
                placeholder="Type..."
                className="SectionOneFormControl"
                value={fakeData.lastName}
                onChange={handleOrgEditProfileChange}
              />
              <Form.Control.Feedback type="invalid">
                Required field, please Enter.
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Control
            className="SectionOneFormControl EditOrgProfileDetailsDisabledField"
            disabled
            value={fakeData.email}
          />
        </Form>
      </div>
    </section>
  );
};

export default SectionOne;
