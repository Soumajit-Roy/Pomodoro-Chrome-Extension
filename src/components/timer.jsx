import React from 'react'
import { useState, useEffect } from 'react'

const Timer = () => {
    const [minutes, setminutes] = useState(25);
    const [seconds, setseconds] = useState(0);
    const [sessionType, setsessionType] = useState("work");
    const [isRunning, setisRunning] = useState(false);
    const [workTime, setWorkTime] = useState(30);

    const handleInputChange = (event) => {
        setWorkTime(event.target.value);
    };
    const incrementValue = () => {
        setWorkTime((prevValue) => {
          const newValue = (parseInt(prevValue) || 0) + 5;
          return newValue > 60 ? 60 : newValue;
        });
      };
    
      const decrementValue = () => {
        setWorkTime((prevValue) => {
          const newValue = (parseInt(prevValue) || 0) - 5;
          return newValue < 5 ? 5 : newValue;
        });
      };

    function starttimer() {
        setisRunning(true);
    }

    const feedbackalert = () => {
        alert("The timer is already Running!!")
    }
  return (
    <>
    <input 
        type="range" 
        id="work-time" 
        min="5" 
        max="60" 
        step="5"
        value={workTime} 
        onChange={handleInputChange} 
      />
      <p id="value">{workTime}</p>
      <button onClick={incrementValue}>Increment</button>
      <button onClick={decrementValue}>Decrement</button>
    <button onClick={isRunning ? feedbackalert : starttimer}>Start</button>
    </>
  )
}

export default Timer