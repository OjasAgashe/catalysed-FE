import React from "react";
import { CommonHomeCalendar } from "../../assets/Illustrations/Illustrations";

const SectionSix = () => {
  return (
    <section className="CommonHomeSectionSix">
      <div className="TextContainer">
        <h3>Plan, Schedule and Document</h3>
        <p>
          Our stack behind the platform makes it effortless for all users
          involved to carry on with their communication without worrying about
          the nitty-gritty of it. We offer a range of built in tools to plan and
          keep track of the valued interactions taking place on the platform, as
          well as the option to continue them on third-party services outside
          the platform. Special nudges designed using behavioural architecture
          principles are blended into the interface assisting every student at
          each step to achieve his/her goals.
        </p>
      </div>
      <div className="CalendarImgContainer">
        <img
          className="CalendarImg"
          src={CommonHomeCalendar}
          alt="common home calendar illustration"
        />
      </div>
    </section>
  );
};

export default SectionSix;
