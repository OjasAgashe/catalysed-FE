import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { OrgProfileManageContactUs } from "../../assets/Illustrations/Illustrations";

type SectionThreeProps = {
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

const SectionThree = ({ fakeData }: SectionThreeProps) => {
  return (
    <section className="OrgProfileManageSectionThree">
      <div className="SectionThreeFirstHalf">
        <img src={OrgProfileManageContactUs} alt="contact us svg" />
      </div>

      <div className="SectionThreeSecondHalf">
        <Form>
          <Form.Control
            disabled
            className="SectionThreeFormControl"
            value={fakeData.organisation.area_of_work}
          />

          <Form.Group>
            <Form.Text className="SectionThreeFormTextLabel">
              contact&nbsp;:&nbsp;
            </Form.Text>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionThreeFormTextLabel">
                    phone
                  </Form.Text>
                  <Form.Control
                    disabled
                    className="SectionThreeFormControl"
                    value={fakeData.organisation.contact.phone}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionThreeFormTextLabel">
                    email
                  </Form.Text>
                  <Form.Control
                    disabled
                    className="SectionThreeFormControl"
                    value={fakeData.organisation.contact.email}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionThreeFormTextLabel">
              year of Inception
            </Form.Text>
            <Form.Control
              disabled
              className="SectionThreeFormControl"
              value={fakeData.organisation.year_of_inception}
            />
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionThreeFormTextLabel">
              address&nbsp;:&nbsp;
            </Form.Text>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionThreeFormTextLabel">
                    country
                  </Form.Text>
                  <Form.Control
                    disabled
                    className="SectionThreeFormControl"
                    value={fakeData.organisation.address.country}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionThreeFormTextLabel">
                    region
                  </Form.Text>
                  <Form.Control
                    disabled
                    className="SectionThreeFormControl"
                    value={fakeData.organisation.address.region}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionThreeFormTextLabel">
              primary language
            </Form.Text>
            <Form.Control
              disabled
              className="SectionThreeFormControl"
              value={fakeData.organisation.primary_language}
            />
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

export default SectionThree;
