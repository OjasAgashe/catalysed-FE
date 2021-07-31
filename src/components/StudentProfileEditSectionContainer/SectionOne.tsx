import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { OrgProfileManagePersonalInfo } from "../../assets/Illustrations/Illustrations";

type SectionOneProps = {
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
};

const SectionOne = ({ fakeData }: SectionOneProps) => {
  return (
    <section className="OrgProfileEditSectionOne">
      <div className="SectionOneFirstHalf">
        <img src={OrgProfileManagePersonalInfo} alt="personal info svg" />
      </div>

      <div className="SectionOneSecondHalf">
        <Form noValidate>
          <Form.Text className="FormDetailsText">Register Details</Form.Text>

          <Row className="SectionOneRow">
            <Col>
              <Form.Text className="SectionOneFormTextLabel EditOrgProfileDetailsDisabledField">
                first name
              </Form.Text>
              <Form.Control
                className="SectionOneFormControl EditOrgProfileDetailsDisabledField"
                value={fakeData.firstName}
                disabled
              />
            </Col>
            <Col>
              <Form.Text className="SectionOneFormTextLabel EditOrgProfileDetailsDisabledField">
                last name
              </Form.Text>
              <Form.Control
                className="SectionOneFormControl EditOrgProfileDetailsDisabledField"
                disabled
                value={fakeData.lastName}
              />
            </Col>
          </Row>

          <Form.Group>
            <Form.Text className="SectionOneFormTextLabel EditOrgProfileDetailsDisabledField">
              email-id
            </Form.Text>

            <Form.Control
              className="SectionOneFormControl EditOrgProfileDetailsDisabledField"
              disabled
              value={fakeData.email}
            />
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

export default SectionOne;
