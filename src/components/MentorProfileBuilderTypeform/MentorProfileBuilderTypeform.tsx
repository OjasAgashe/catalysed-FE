import React from "react";
// @ts-ignore
import TypeForm from "react-typeform";
import QuestionOne from "./QuestionOne";
// import { MentorProfileBuilderData } from "../../types/MentorProfileBuilder";
import { Form } from "react-bootstrap";
import QuestionTwo from "./QuestionTwo";
import QuestionThree from "./QuestionThree";
import QuestionFour from "./QuestionFour";
import QuestionFive from "./QuestionFive";
import QuestionSix from "./QuestionSix";
import QuestionSeven from "./QuestionSeven";
import QuestionEight from "./QuestionEight";
import QuestionNine from "./QuestionEight";
import QuestionTen from "./QuestionNine";
import "./MentorProfileBuilderTypeform.css";

const MentorProfileBuilderTypeform = () => {
  //   const [answer, setAnswer] = useState<MentorProfileBuilderData>({
  //     QuestionOne: "",
  //     QuestionTwo: "",
  //     QuestionThree: { country: "", city: "" },
  //     QuestionFour: "",
  //     QuestionFive: "",
  //     QuestionSix: { yes_no: "", yoe: "None" },
  //     QuestionSeven: "",
  //     QuestionEight: "",
  //     QuestionNine: "",
  //     QuestionTen: "",
  //     QuestionEleven: "",
  //   });

  return (
    <div className="MentorProfileQuestionContainer">
      <Form
        noValidate
        className="MentorProfileBuilderForm"
        onSubmit={(event) => event.preventDefault()}
      >
        <TypeForm
          nextBtnClass="TypeFormNextBtn"
          backBtnClass="TypeFormBackBtn"
          submitBtnClass="TypeFormSubmitBtn"
          submitBtnText="Submit"
          backBtnText="Previous"
        >
          <QuestionOne key="QuestionOne" />
          <QuestionTwo key="QuestionTwo" />
          <QuestionThree key="QuestionThree" />
          <QuestionFour key="QuestionFour" />
          <QuestionFive key="QuestionFive" />
          <QuestionSix key="QuestionSix" />
          <QuestionSeven key="QuestionSeven" />
          <QuestionEight key="QuestionEight" />
          <QuestionNine key="QuestionNine" />
          <QuestionTen key="QuestionTen" />
        </TypeForm>
      </Form>
    </div>
  );
};

export default MentorProfileBuilderTypeform;
