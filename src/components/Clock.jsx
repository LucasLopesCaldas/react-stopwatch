import React from "react";

class Clock extends React.Component {
  render(){

    let { seconds } = this.props;

    const hour = Math.floor(seconds / (60 * 60));
    seconds = seconds - hour*(60*60)
    const min = Math.floor(seconds / 60);
    seconds = seconds - min*60;
    const sec = Math.floor(seconds);
    
  const secPointerStyle = {
    width: '4px',
    height: '100px',
    transformOrigin: '200px 243.6px',
    backgroundColor: 'red',
    position: 'absolute',
    transform: `rotate(${sec/60*360}deg) translateX(198.3px) translateY(145px)`,
  }

  console.log((min+(sec/60))/12*360);

  const minPointerStyle = {
    width: '8px',
    height: '80px',
    transformOrigin: '200px 243.6px',
    backgroundColor: 'red',
    position: 'absolute',
    //transform: `rotate(${min/60*360}deg) translateX(196px) translateY(145px)`,
    transform: `rotate(${(min+(sec/60))/60*360}deg) translateX(196px) translateY(168.5px)`,
  }

  const hourPointerStyle = {
    width: '8px',
    height: '60px',
    transformOrigin: '200px 243.6px',
    backgroundColor: 'red',
    position: 'absolute',
    //transform: `rotate(${min/60*360}deg) translateX(196px) translateY(145px)`,
    transform: `rotate(${(hour+(min/60))/12*360}deg) translateX(196px) translateY(183.5px)`,
  }

  return (
    <div className="clock">
     <div style={hourPointerStyle} />
      <div style={minPointerStyle} />
      <div style={secPointerStyle} />
      <div className="clock-center"/>
    </div>);
  }
}

export default Clock;