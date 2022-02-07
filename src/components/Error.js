import React from "react";
import { connect } from "react-redux";

const Error = (props) => {
  const { state } = props;
  return (
    <div className="error">
      {state.template.error}
      <p>Please try reloading the browser</p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(Error);
