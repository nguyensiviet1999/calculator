import React from 'react';
import Display from './Display';
import './App.css';
import ButtonPanel from './ButtonPanel';
import calculate from './logic/calculate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null,
      history: null,
    };
  }
  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName))
  }
  
  render() {
    return (
      <div className="component-app">
        <Display value={this.state}/>
        <ButtonPanel clickHandler={this.handleClick}/>
      </div>
    );
  }
}
