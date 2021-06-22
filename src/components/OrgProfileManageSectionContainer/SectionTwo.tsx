import React from "react";
import { Form } from "react-bootstrap";
import { OrgProfileManageFillIn } from "../../assets/Illustrations/Illustrations";

type SectionTwoProps = {
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

const SectionTwo = ({ fakeData }: SectionTwoProps) => {
  return (
    <section className="OrgProfileManageSectionTwo">
      <div className="SectionTwoFirstHalf">
        <Form>
          <Form.Text className="FormDetailsText">
            Organization Details
            <Form.Control
              className="SectionTwoFormControl"
              disabled
              value={fakeData.organisation.name}
            />
            <Form.Control
              as="textarea"
              rows={3}
              disabled
              className="SectionTwoFormControl SectionTwoTextArea"
              value={fakeData.organisation.description}
            />
            <Form.Group>
              <Form.Text className="SectionTwoFormTextLabel">
                social link
              </Form.Text>

              <Form.Control
                className="SectionTwoFormControl"
                disabled
                value={fakeData.organisation.social_link}
              />
            </Form.Group>
            <Form.Group>
              <Form.Text className="SectionTwoFormTextLabel">
                website link
              </Form.Text>

              <Form.Control
                className="SectionTwoFormControl"
                disabled
                value={fakeData.organisation.website_link}
              />
            </Form.Group>
          </Form.Text>
        </Form>
      </div>

      <div className="SectionTwoSecondHalf">
        <img src={OrgProfileManageFillIn} alt="fill in svg" />
      </div>
    </section>
  );
};

export default SectionTwo;
