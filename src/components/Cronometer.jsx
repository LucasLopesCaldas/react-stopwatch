import React from "react";
import Clock from "./Clock";
import Input from "./Input";

class Cronometer extends React.Component {

  constructor(){
    super();
    this.state = {
      seconds: 0,
      timerId: 0,
      inputHour: 0,
      inputMin: 0,
      inputSec: 0,
      running: false,
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
          running: false
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
        this.setState({running: false});
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

    let { inputHour, inputMin, inputSec, seconds, running, timerId } = this.state;
    
    return (<div className="cronometer">
      <Input inputHour={inputHour} inputMin={inputMin} inputSec={inputSec} handleTimeInputChange={this.handleTimeInputChange}/>
      <Clock seconds={seconds}/>
      <button type="button" onClick={this.startTimer}>{!running ? 'Start' : 'Restart'}</button>
      <button type="button" disabled={!running} onClick={() => {clearInterval(timerId); this.reset()}}>Stop</button>
    </div>);
  }
}

export default Cronometer;