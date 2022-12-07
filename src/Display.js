import React from "react";
import PropTypes from "prop-types";

import "./Display.css";

export default class Display extends React.Component {
  static propTypes = {
    value: PropTypes.object,
  };

  render() {
    return(
      <div className="component-display">
        <div style={{fontSize: "20px"}}>history: {this.props.value.history}</div>
        <div style={{fontSize: "20px"}}>operation: {this.props.value.operation}</div>
        <div>next: {this.props.value.next}</div>
        <div>result: {this.props.value.total}</div>
      </div>
    )
  }
}