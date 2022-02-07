import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { handleFilter } from "../actions/index";

const Filter = (props) => {
  const { dispatch, state, filter, handleChange } = props;
  const { template } = state;

  useEffect(() => {
    dispatch(handleFilter(template, filter));
  }, [
    filter.search,
    filter.category,
    filter.order,
    filter.date,
    dispatch,
    filter,
  ]);

  return (
    <div className="grid-parent">
      <div>
        <div className="search-div">
          <input
            placeholder="Search Templates"
            value={filter.search}
            name="search"
            onChange={handleChange}
          />
          <div className="search">
            <FiSearch size={25} />
          </div>
        </div>
      </div>

      <div className="grid-container">
        <p>Sort By:</p>
        <div className="category-section">
          <p className="title">Category</p>
          <select
            value={filter.category}
            name="category"
            onChange={handleChange}
            data-testid="category"
          >
            <option value="All">All</option>
            <option value="Education">Education</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div className="category-section">
          <p className="title">Order</p>
          <select
            value={filter.order}
            name="order"
            onChange={handleChange}
            data-testid="order"
          >
            <option value="Default">Default</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
        <div className="category-section">
          <p className="title">Date</p>
          <select
            value={filter.date}
            name="date"
            onChange={handleChange}
            data-testid="date"
          >
            <option value="Default">Default</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, { handleChange, filter }) {
  return {
    state,
    handleChange,
    filter,
  };
}

export default connect(mapStateToProps)(Filter);
