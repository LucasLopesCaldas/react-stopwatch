import React from "react";

class DigitalClock extends React.Component {
  render(){

    let { seconds } = this.props;

    const hour = Math.floor(seconds / (60 * 60));
    seconds = seconds - hour*(60*60)
    const min = Math.floor(seconds / 60);
    seconds = seconds - min*60;
    const sec = Math.floor(seconds);
    
    return (
      <div className="digital-clock">
        <div className="digital-clock-in">
          {
            hour > 0 ? 
            (
            <>
              <span className="clock-number">{String(hour).padStart(2, '0')}</span>
              <span className="clock-number">:</span>
            </>
            ) : <></>
          }
          <span className="clock-number">{String(min).padStart(2, '0')}</span>
          <span className="clock-number">:</span>
          <span className="clock-number">{String(sec).padStart(2, '0')}</span>
        </div>
      </div>);
  }
}

export default DigitalClock;