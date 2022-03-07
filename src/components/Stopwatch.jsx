import React from "react";
import Clock from "./Clock";
import DigitalClock from "./DigitalClock";
import Input from "./Input";

class Stopwatch extends React.Component {

  constructor(){
    super();
    this.state = {
      seconds: 0,
      timerId: 0,
      inputHour: 0,
      inputMin: 0,
      inputSec: 0,
      running: false,
      finished: false,
    }
    this.startTimer = this.startTimer.bind(this);
    this.handleTimeInputChange = this.handleTimeInputChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset(){
    this.setState((last) => {
        const { inputHour, inputMin, inputSec } = last;
        return {
          seconds: inputHour *60 *60 + inputMin *60 + inputSec,
          running: false,
          finished: false,
        };
    });
  }

  startTimer(){
    if(this.state.seconds === 0 || this.state.running){
      clearInterval(this.state.timerId);
      this.reset();
    }
    const id = setInterval(() => {
      const secs = this.state.seconds-1;

      this.setState({
        seconds: secs < 0 ? 0 : secs,
      });

      if(this.state.seconds <= 0){
        clearInterval(id);
        this.setState({running: false, finished: true});
        return;
      }
    }, 1000)
    
    this.setState({timerId: id, running: true});
  }

  componentWillUnmount(){
    clearInterval(this.state.timerId);
  }

  handleTimeInputChange({target}){
    let { value } = target;
    value = parseInt(value);
    this.setState({
      [target.name]: isNaN(value) || value < 0 ? "" : value,
      finished: false
    }, () => {
      if(value !== "" && !this.state.running)
        this.setState((last) => {
          const { inputHour, inputMin, inputSec } = last;
          return {
            seconds: inputHour *60 *60 + inputMin *60 + inputSec,
          };
      });
    })
  }

  render(){

    let { inputHour, inputMin, inputSec, seconds, running, timerId, finished } = this.state;
    
    return (<div className="cronometer">
      <Input inputHour={inputHour} inputMin={inputMin} inputSec={inputSec} handleTimeInputChange={this.handleTimeInputChange}/>
      <DigitalClock finished={finished} seconds={seconds}/>
      <Clock seconds={seconds}/>
      <div className="stopwatch-buttons">
        <button type="button" onClick={this.startTimer}>{!running ? 'START' : 'RESTART'}</button>
        <button type="button" disabled={!running} onClick={() => {clearInterval(timerId); this.reset()}}>STOP</button>
      </div>
    </div>);
  }
}

export default Stopwatch;