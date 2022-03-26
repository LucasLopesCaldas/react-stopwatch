import { UPDATE_STATE } from "./action";

const INITIAL_STATE = {
  seconds: 0,
  timerId: 0,
  inputHour: 0,
  inputMin: 0,
  inputSec: 0,
  running: false,
  finished: false,
  showDigitalClock: true,
  showClock: true,
}

export const reducer = (state = INITIAL_STATE, action) => {
 
  switch(action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}