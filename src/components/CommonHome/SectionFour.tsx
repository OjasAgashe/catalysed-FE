import React from "react";
import { CommonHomeSearch } from "../../assets/Illustrations/Illustrations";

const SectionFour = () => {
  return (
    <section className="CommonHomeSectionFour">
      <div className="TextContainer">
        <h3>Search and Recommendation</h3>
        <p>
          The student can search for mentors and show intent to connect. The
          search is made seamless assisted by Elasticsearch. The recommendation
          system powered by a hybrid of collaborative and content based
          filtering uses the profile questions to match similar students and
          mentors.
        </p>
      </div>
      <div className="SearchImgContainer">
        <img
          className="SearchImg"
          src={CommonHomeSearch}
          alt="common home search illustration"
        />
      </div>
    </section>
  );
};

export default SectionFour;
