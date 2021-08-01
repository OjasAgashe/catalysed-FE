import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { OrgProfileManagePersonalInfo } from "../../assets/Illustrations/Illustrations";
import { StudentProfileEditState } from "../../types/StudentProfileEdit";

type SectionOneProps = {
  state: StudentProfileEditState;
};

const SectionOne = ({ state }: SectionOneProps) => {
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
                value={state?.responseData?.firstName}
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
                value={state?.responseData?.lastName}
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
              value={state?.responseData?.email}
            />
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

export default SectionOne;
