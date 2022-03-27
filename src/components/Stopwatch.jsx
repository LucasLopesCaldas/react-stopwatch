import React from "react";
import { connect } from "react-redux";
import { updateStateCtion } from "../action";
import Clock from "./Clock";
import DigitalClock from "./DigitalClock";
import Input from "./Input";

const INTERVAL = 1000;

class Stopwatch extends React.Component {

  constructor(){
    super();
    this.startTimer = this.startTimer.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset(){
    const { inputHour, inputMin, inputSec } = this.props;
    this.props.updateState({
      seconds: inputHour *60 *60 + inputMin *60 + inputSec,
      running: false,
      finished: false,
    });
  }

  startTimer(){

    const { running, timerId, updateState} = this.props;

    if(this.props.seconds === 0 || running){
      clearInterval(timerId);
      this.reset();
    }

    const id = setInterval(() => {
      const {seconds} = this.props;
      const secs = seconds-1;
      
      updateState({
        seconds: secs < 0 ? 0 : secs,
      });

      if(secs <= 0){
        clearInterval(id);
        updateState({ seconds: 0, running: false, finished: true});
        return;
      }
    }, INTERVAL)
    
    updateState({timerId: id, running: true});
  }

  componentWillUnmount(){
    clearInterval(this.props.timerId);
  }

  render(){

    let { seconds, running, timerId, finished, showDigitalClock, showClock, updateState } = this.props;
    
    return (<div className="stopwatch">
      <header className="App-header">
        <br />
        <h1>Trybe Stopwatch</h1>
      </header>
      <Input />
      {showDigitalClock ? <DigitalClock finished={finished} seconds={seconds}/> : ''}
      {showClock ? <Clock seconds={seconds}/> : ''}
      <div className="show-clocks-constiner">
        <div style={{display: "inline"}}>
          <label htmlFor="digital-checkbox">
            Show digital
          </label>
          {' '}
          <input id="digital-checkbox" checked={showDigitalClock} disabled={!showClock} type='checkbox' onChange={({target: { checked }}) => { updateState({showDigitalClock: checked}) }}/>
        </div>
        <div style={{display: "inline"}}>
          <label htmlFor="analog-checkbox">
            Show analog
          </label>
          {' '}
          <input id="analog-checkbox" checked={showClock} disabled={!showDigitalClock}type='checkbox' onChange={({target: { checked }}) => { updateState({showClock: checked}) }}/>
        </div>
      </div>
      <div className="stopwatch-buttons">
        <button type="button" onClick={this.startTimer}>{!running ? 'START' : 'RESTART'}</button>
        <button type="button" disabled={!running} onClick={() => {clearInterval(timerId); this.reset()}}>STOP</button>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispach) => ({
  updateState: (state) => {dispach(updateStateCtion(state))}
});


export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);