import React, { useState } from "react";
// @ts-ignore
import TypeForm from "react-typeform";
import QuestionFive from "./QuestionFive";
import QuestionFour from "./QuestionFour";
import QuestionOne from "./QuestionOne";
import QuestionThree from "./QuestionThree";
import QuestionTwo from "./QuestionTwo";
import "./OrgProfileBuilderTypeform.css";
import { OrgProfileBuilderData } from "../../types/OrganisationProfileBuilder";
import { Form } from "react-bootstrap";

const OrgProfileBuilderTypeform = () => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  const [answer, setAnswer] = useState<OrgProfileBuilderData>({
    QuestionOne: "",
    QuestionTwo: { email: "", phone: "" },
    QuestionThree: "",
    QuestionFour: "",
    QuestionFive: "",
  });

  const handleOrgProfileTypeformSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();
      setValidated(true);

      if (answer.QuestionTwo.phone.length <= 4) {
        setIsInvalid(true);
        return;
      }

      if (
        answer.QuestionOne !== "" &&
        answer.QuestionTwo.email !== "" &&
        answer.QuestionTwo.phone !== "" &&
        answer.QuestionThree !== "" &&
        answer.QuestionFour !== "" &&
        answer.QuestionFive !== ""
      )
        console.log(answer);
    };

  return (
    <div className="OrgProfileQuestionContainer">
      <Form
        noValidate
        validated={validated}
        className="OrgProfileBuilderForm"
        onSubmit={(event) => event.preventDefault()}
      >
        <TypeForm
          nextBtnClass="TypeFormNextBtn"
          backBtnClass="TypeFormBackBtn"
          submitBtnClass="TypeFormSubmitBtn"
          submitBtnText="Submit"
          backBtnText="Previous"
          onSubmit={handleOrgProfileTypeformSubmit}
        >
          <QuestionOne
            key="QuestionOne"
            answer={answer}
            setAnswer={setAnswer}
            validated={validated}
            setValidated={setValidated}
          />
          <QuestionTwo
            key="QuestionTwo"
            answer={answer}
            setAnswer={setAnswer}
            validated={validated}
            setValidated={setValidated}
            isInvalid={isInvalid}
            setIsInvalid={setIsInvalid}
          />
          <QuestionThree
            key="QuestionThree"
            answer={answer}
            setAnswer={setAnswer}
            validated={validated}
            setValidated={setValidated}
          />
          <QuestionFour
            key="QusetionFour"
            answer={answer}
            setAnswer={setAnswer}
            validated={validated}
            setValidated={setValidated}
          />
          <QuestionFive
            key="QuestionFive"
            answer={answer}
            setAnswer={setAnswer}
            validated={validated}
            setValidated={setValidated}
          />
        </TypeForm>
      </Form>
    </div>
  );
};

export default OrgProfileBuilderTypeform;
