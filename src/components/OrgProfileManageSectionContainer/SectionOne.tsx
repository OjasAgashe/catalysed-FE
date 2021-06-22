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
};

const SectionOne = ({ fakeData }: SectionOneProps) => {
  return (
    <section className="OrgProfileManageSectionOne">
      <div className="SectionOneFirstHalf">
        <img src={OrgProfileManagePersonalInfo} alt="personal info svg" />
      </div>

      <div className="SectionOneSecondHalf">
        <Form>
          <Form.Text className="FormDetailsText">User Details</Form.Text>

          <Row className="SectionOneRow">
            <Col>
              <Form.Text className="SectionOneFormTextLabel">
                first name
              </Form.Text>
              <Form.Control
                className="SectionOneFormControl"
                disabled
                value={fakeData.firstName}
              />
            </Col>
            <Col>
              <Form.Text className="SectionOneFormTextLabel">
                last name
              </Form.Text>
              <Form.Control
                className="SectionOneFormControl"
                disabled
                value={fakeData.lastName}
              />
            </Col>
          </Row>

          <Form.Control
            className="SectionOneFormControl"
            disabled
            value={fakeData.email}
          />
        </Form>
      </div>
    </section>
  );
};

export default SectionOne;
