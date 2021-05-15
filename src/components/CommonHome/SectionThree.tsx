import React from "react";
import { CommonHomeMouse } from "../../assets/Illustrations/Illustrations";

const SectionThree = () => {
  return (
    <section className="CommonHomeSectionThree">
      <div className="MouseImgContainer">
        <img
          className="MouseImg"
          src={CommonHomeMouse}
          alt="common home mouse illustration"
        />
      </div>
      <div className="TextContainer">
        <h3>Personalized Profile Builder</h3>
        <p>
          Our personalized profile builder is filled with amusing questions and
          queries to gauge your interests and hobbies. Helping us in this is our
          fine-tuned NLP engine to identify and decode features that don't meet
          the eye. Privacy of data is one of our main concerns and we tackle
          that through homomorphic encryption, eliminating the scenario of
          unsecured data.
        </p>
      </div>
    </section>
  );
};

export default SectionThree;
