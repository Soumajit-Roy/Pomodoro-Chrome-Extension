import React from "react";
import { useState, useEffect } from "react";
import audioFile from '../assets/alert.mp3'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Timer = () => {
  const [isRunning, setisRunning] = useState(false);
  const [workTime, setWorkTime] = useState(0.1);
  const [timeRemaining, settimeRemaining] = useState(workTime * 60);
  const [alertMessage, setAlertMessage] = useState(''); // State for alert messages
  const [isPaused, setisPaused] = useState(false); //State for pause function
  
  //Slider Change Update
  const handleInputChange = (e) => {
    const newWorkTime = e.target.value;
    setWorkTime(newWorkTime);
    if (!isRunning) {
      settimeRemaining(newWorkTime * 60); // Update timeRemaining if timer isn't running
    }
  };
  // Increment Decrement work time by 5 minutes
   const incrementValue = () => {
    setWorkTime((prevValue) => Math.min(prevValue + 5, 60));
  };

  const decrementValue = () => {
    setWorkTime((prevValue) => Math.max(prevValue - 5, 5));
  };


    // Updating timeRemaining whenever workTime changes
    useEffect(() => {
      if (!isRunning) {
        settimeRemaining(workTime * 60); // Reset timeRemaining whenever the workTime is changed
      }
    }, [workTime]);

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      settimeRemaining(workTime * 60); // Set timeRemaining when starting the timer
      setisRunning(true);
      setisPaused(false)
      Startnotify()
    } else {
      StartnotifyON()
    }
  };
  //Pause function
  const pauseResumeTimer = () => {
    setisPaused(!isPaused)
    !isPaused ? Pausenotify() : dismissNoti();
  }
  
  
  //Timer logic
  useEffect(() => {
    if (isRunning && !isPaused && timeRemaining > 0) {
      const countdown = setInterval(() => {
        settimeRemaining((prevValue) => prevValue - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if(timeRemaining === 0){
      timerSound.play(); 
      Completenotify();
      setAlertMessage('🎉Congrats You Completed Your Work Time!🤩');
      setisRunning(false);
    }
  }, [isRunning, timeRemaining, isPaused]);

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
    Resetnotify()
    setisPaused(false)
  };
  //alert tone
  const timerSound = new Audio(audioFile)
  //function for progress bar
  const percentageCalc = () =>{
    if (isRunning){
    const value = (timeRemaining / (workTime*60)) * 100;
    return value; 
    } else {
      return 100;
    }
  }

  //Toast notification config
  const Startnotify = () => {
    toast("⏱️Timer Started!", {
      position: "bottom-right",
      hideProgressBar: false,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce
      })
  }
  const Pausenotify = () => {
    toast("The timer is Paused🫸, You can Resume the Timer⏱️ Anytime"), {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: false,
      closeOnClick: true,
      theme: "dark",
      transition: Bounce,
      toastId: "pauseID"
      }
  }
  const StartnotifyON = () => {
    toast.error("Oh No!! The timer is already running!!😥", {
      position: "bottom-right",
      icon: false,
      hideProgressBar: false,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce
      })
  }
  const Resetnotify = () => {
    toast.info("Timer Reset🤐", {
      position: "bottom-right",
      icon: false,
      hideProgressBar: false,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce
      })
  }
  const Completenotify = () => {
    toast.success("🎉Congrats You Completed Your Work Time!🤩", {
      position: "bottom-right",
      icon: false,
      hideProgressBar: false,
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce
      })
  }
  const dismissNoti = () => toast.dismiss();
  


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
        disabled={isRunning && !isPaused}
      />
      <p id="value">{workTime} Minutes</p>
      <button onClick={incrementValue} disabled={isRunning && !isPaused}>
        Increment
      </button>
      <button onClick={decrementValue} disabled={isRunning && !isPaused}>
        Decrement
      </button>
      <button onClick={ () => {startTimer()}} disabled={isRunning && !isPaused}>
        Start
      </button>
      <button onClick={() =>{reset()}}>Reset</button>

      <p>{formatTime(timeRemaining)}</p>

      <button onClick={pauseResumeTimer} disabled={!isRunning}>{isPaused ? "Resume" : "Pause"}</button>
      {alertMessage && <p>{alertMessage}</p>}

      <div
      style={{
        width: `${percentageCalc()}%`,  // Set the width dynamically
        height: '20px',                 
        backgroundColor: 'green',        
        transition: 'width 0.5s ease'  
      }}>

      </div>
      <ToastContainer 
      autoClose={false}/>
    </>
  );
};

export default Timer;
