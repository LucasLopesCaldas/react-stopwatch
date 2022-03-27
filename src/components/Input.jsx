import React from "react";
import { connect } from "react-redux";
import { updateStateCtion as updateStateAction } from "../action";

class Input extends React.Component {
  constructor() {
    super()
    this.handleTimeInputChange = this.handleTimeInputChange.bind(this);
  }

  handleTimeInputChange({target}){
    const { updateState } = this.props;

    let { value } = target;
    value = parseInt(value);

    const newState = {
      ...this.props,
      [target.name]: isNaN(value) || value < 0 ? "" : value,
      finished: false
    }

    if(!this.props.running){
      newState.seconds = newState.inputHour *60 *60 + newState.inputMin *60 + newState.inputSec;
    }

    updateState(newState)
  }

  render(){

    const { inputHour, inputMin, inputSec} = this.props;

    return (
      <div className="input">
        
        <input 
          name="inputHour"
          className="time-input"
          type={'number'}
          value={inputHour}
          min={0}
          onChange={this.handleTimeInputChange}/>
        <input 
          name="inputMin" 
          className="time-input" 
          type={'number'} 
          value={inputMin} 
          min={0} 
          max={59} 
          onChange={this.handleTimeInputChange}/>
        <input
          name="inputSec"
          className="time-input"
          type={'number'}
          value={inputSec}
          min={0}
          max={59}
          onChange={this.handleTimeInputChange}/>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispach) => ({
  updateState: (state) => {dispach(updateStateAction(state))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);