import React from "react";
import { useState, useEffect } from "react";

const Timer = () => {
  const [isRunning, setisRunning] = useState(false);
  const [workTime, setWorkTime] = useState(30);
  const [timeRemaining, settimeRemaining] = useState(workTime * 60);
  const [alertMessage, setAlertMessage] = useState(''); // State for alert messages

  //Slider Change Update
  const handleInputChange = (e) => {
    setWorkTime(e.target.value);
    setWorkTime(newWorkTime);
    if (!isRunning) {
      settimeRemaining(newWorkTime * 60); // Update timeRemaining if timer isn't running
    }
  };
  // Increment Decrement work time by 5 minutes
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

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      settimeRemaining(workTime * 60); // Set timeRemaining when starting the timer
      setisRunning(true);
      setAlertMessage("")
    } else {
      setAlertMessage("The timer is already running!!")
    }
  };

  const feedbackalert = () => {
    alert("The timer is already Running!!");
  };

  //Timer logic
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      const countdown = setInterval(() => {
        settimeRemaining((prevValue) => prevValue - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if(timeRemaining === 0){
      setAlertMessage('Timer Finished')
      setisRunning(false);
    }
  }, [isRunning, timeRemaining]);

  //Time formatting
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2,"0")}`;
  };
  //reset function
  const reset = () => {
    settimeRemaining(workTime * 60);
    setisRunning(false);
    setAlertMessage("Timer Reset")
  };
  //Start countdown function

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
      <p id="value">{workTime} Minutes</p>
      <button onClick={incrementValue} disabled={isRunning}>
        Increment
      </button>
      <button onClick={decrementValue} disabled={isRunning}>
        Decrement
      </button>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={reset}>Reset</button>

      <p>{formatTime(timeRemaining)}</p>
      {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
    </>
  );
};

export default Timer;
