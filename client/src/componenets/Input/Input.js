import React, { Component } from 'react';
import './Input.scss';

class Input extends Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

  handleChange (event) {
    this.props.updateQueries(event.target.value, event.target.name);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.labelInputName}>{this.props.labelText}</label>
        <input type={this.props.inputType}
               name={this.props.labelInputName}
               value={this.props.inputValue}
               onChange={this.handleChange}></input>
      </div>
    );
  }
}

export default Input;
