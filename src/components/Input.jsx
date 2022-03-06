import React from "react";

class Input extends React.Component {

  render(){

    const { inputHour, inputMin, inputSec, handleTimeInputChange} = this.props;

    return (
      <div className="input">
        
        <input 
          name="inputHour"
          className="time-input"
          type={'number'}
          value={inputHour}
          min={0}
          max={59}
          onChange={handleTimeInputChange}/>
        <input 
          name="inputMin" 
          className="time-input" 
          type={'number'} 
          value={inputMin} 
          min={0} 
          max={59} 
          onChange={handleTimeInputChange}/>
        <input
          name="inputSec"
          className="time-input"
          type={'number'}
          value={inputSec}
          min={0}
          max={59}
          onChange={handleTimeInputChange}/>
      </div>);
  }
}

export default Input;