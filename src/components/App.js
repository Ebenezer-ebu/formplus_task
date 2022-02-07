import React from "react";
import { connect } from "react-redux";
import Content from "./Content";
import Error from "./Error";

function App(props) {
  const { state } = props;
  return (
    <div className="App">
      {state.template.error.length > 0 ? <Error /> : <Content />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(App);
