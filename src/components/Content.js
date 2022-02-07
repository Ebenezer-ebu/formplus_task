import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Rings } from "react-loader-spinner";
import Cards from "./Cards";
import Filter from "./Filter";
import ReactPaginate from "react-paginate";
import { handleInitialData, handlePagination } from "../actions/index";

const Content = (props) => {
  const { dispatch, state } = props;
  const { template } = state;
  const [filter, setFilter] = useState({
    search: "",
    category: "All",
    order: "Default",
    date: "Default",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "category") {
      setFilter((prev) => ({
        ...prev,
        search: "",
        category: value,
        order: "Default",
        date: "Default",
      }));
    } else {
      setFilter({ ...filter, [name]: value });
    }
  };
  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * template.numberPerPage;
    dispatch(handlePagination({ ...template, offset }));
  };

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <div className="container">
      {template.loading ? (
        <div className="loading">
          <Rings
            color="#00BFFF"
            height="400"
            width="400"
            margin="auto"
            ariaLabel="loading"
          />
          <p>Please wait loading some data...</p>
        </div>
      ) : (
        <>
          <Filter handleChange={handleChange} filter={filter} />
          <Cards templates={template} />
          <ReactPaginate
            previousLabel={" Previous"}
            nextLabel={"Next  >"}
            breakLabel={"..."}
            pageCount={template.pageCount}
            marginPagesDisplayed={2}
            siblingCount={1}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Content);
