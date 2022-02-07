import React from "react";
import { connect } from "react-redux";
import { BsInfoCircle } from "react-icons/bs";

const Cards = (props) => {
  const { templates } = props;
  const displayData =
    templates.currentData.length > 0 ? templates.currentData : [];
  return (
    <div>
      <div className="tada" data-testid="tada">
        <BsInfoCircle className="info" />
        <p>
          Tada! Get started with a free template. Can't find what you are
          looking for? Search from the 1000+ available templates
        </p>
      </div>
      <div className="head">
        <p>{templates.category} Templates</p>
        <p>{templates.filterData.length} templates</p>
      </div>
      <div className="card-container">
        {displayData.map((template, index) => (
          <div className="card" key={index}>
            <h2 className="details">{template.name}</h2>
            <p className="details">{template.description}</p>
            <a href={template.link} rel="noopener" className="tag details">
              <h5>Use Template</h5>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect()(Cards);
