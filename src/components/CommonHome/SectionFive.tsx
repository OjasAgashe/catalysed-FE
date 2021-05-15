import React from "react";
import { CommonHomeBuilding } from "../../assets/Illustrations/Illustrations";

const SectionFive = () => {
  return (
    <section className="CommonHomeSectionFive">
      <div className="BuildingImgContainer">
        <img
          className="BuildingImg"
          src={CommonHomeBuilding}
          alt="common home building illustration"
        />
      </div>
      <div className="TextContainer">
        <h3>Programs and Interest Groups</h3>
        <p>
          The platform quickly learns your interests and preference and
          introduces to you to programs and interest groups best for you. Our
          collaboration with multiple not-for-profit organizations and
          accomplished mentors enable us to pioneer fellowships that provide
          students with leadership development, cross-cultural experience and
          the opportunity to make a progressive social impact not only on
          themselves but the world at large.
        </p>
      </div>
    </section>
  );
};

export default SectionFive;
