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

  socialLinkIsInvalid: boolean;
  setSocialLinkIsInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  websiteLinkIsInvalid: boolean;
  setWebsiteLinkIsInvalid: React.Dispatch<React.SetStateAction<boolean>>;
};

const SectionTwo = ({
  fakeData,
  setFakeData,
  validated,
  setValidated,
  socialLinkIsInvalid,
  setSocialLinkIsInvalid,
  websiteLinkIsInvalid,
  setWebsiteLinkIsInvalid
}: SectionTwoProps) => {
  const handleOrgEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);
      if (socialLinkIsInvalid) setSocialLinkIsInvalid(false);
      if (websiteLinkIsInvalid) setWebsiteLinkIsInvalid(false);

      setFakeData((prevState) => ({
        ...prevState,
        organisation: {
          ...prevState.organisation,
          [event.target.name]: event.target.value,
        },
      }));
    };

  return (
    <section className="OrgProfileManageSectionTwo">
      <div className="SectionTwoFirstHalf">
        <Form noValidate validated={validated}>
          <Form.Text className="FormDetailsText">
            Organization Details
            <Form.Control
              className="SectionTwoFormControl EditOrgProfileDetailsDisabledField"
              disabled
              value={fakeData.organisation.name}
            />
            <Form.Group>
              <Form.Control
                required
                name="description"
                as="textarea"
                rows={3}
                minLength={10}
                placeholder="Write About Your Organisation"
                className="SectionTwoFormControl SectionTwoTextArea"
                value={fakeData.organisation.description}
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
                name="social_link"
                type="url"
                placeholder="Enter URL..."
                className="SectionTwoFormControl"
                value={fakeData.organisation.social_link}
                onChange={handleOrgEditProfileChange}
                isInvalid={socialLinkIsInvalid}
              />
              <Form.Control.Feedback type="invalid" className="InvalidFeedback">
                Required field, enter Valid Link.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Text className="SectionTwoFormTextLabel">
                website link
              </Form.Text>

              <Form.Control
                required
                name="website_link"
                type="url"
                placeholder="Enter URL..."
                className="SectionTwoFormControl"
                value={fakeData.organisation.website_link}
                onChange={handleOrgEditProfileChange}
                isInvalid={websiteLinkIsInvalid}
              />
              <Form.Control.Feedback type="invalid" className="InvalidFeedback">
                Required field, enter Valid Link.
              </Form.Control.Feedback>
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
