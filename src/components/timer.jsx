import React from "react";
import { useState, useEffect } from "react";
import audioFile from "../assets/alert.mp3";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Timer = () => {
  const [isRunning, setisRunning] = useState(false);
  const [workTime, setWorkTime] = useState(30);
  const [timeRemaining, settimeRemaining] = useState(workTime * 60);
  const [alertMessage, setAlertMessage] = useState(""); // State for alert messages
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
      setisPaused(false);
      Startnotify();
    } else {
      StartnotifyON();
    }
  };
  //Pause function
  const pauseResumeTimer = () => {
    setisPaused(!isPaused);
    !isPaused ? Pausenotify() : dismissNoti();
  };

  //Timer logic
  useEffect(() => {
    if (isRunning && !isPaused && timeRemaining > 0) {
      const countdown = setInterval(() => {
        settimeRemaining((prevValue) => prevValue - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timeRemaining === 0) {
      timerSound.play();
      Completenotify();
      setAlertMessage("🎉Congrats You Completed Your Work Time!🤩");
      setisRunning(false);
    }
  }, [isRunning, timeRemaining, isPaused]);

  //Time formatting
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };
  //reset function
  const reset = () => {
    settimeRemaining(workTime * 60);
    setisRunning(false);
    Resetnotify();
    setisPaused(false);
  };
  //alert tone
  const timerSound = new Audio(audioFile);
  //function for progress bar
  const percentageCalc = () => {
    if (isRunning) {
      const value = (timeRemaining / (workTime * 60)) * 100;
      return value;
    } else {
      return 100;
    }
  };

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
      transition: Bounce,
    });
  };
  const Pausenotify = () => {
    toast("The timer is Paused🫸, You can Resume the Timer⏱️ Anytime"),
      {
        position: "bottom-right",
        hideProgressBar: true,
        autoClose: false,
        closeOnClick: true,
        theme: "dark",
        transition: Bounce,
        toastId: "pauseID",
      };
  };
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
      transition: Bounce,
    });
  };
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
      transition: Bounce,
    });
  };
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
      transition: Bounce,
    });
  };
  const dismissNoti = () => toast.dismiss();

  //function for theme toggle
  const [isDark, setisDark] = useState(true); //State for theme toggle function

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    setisDark(!isDark);
  };

  return (
    <>
    <div className="toggle-button">
    <label class="switch">
    <span class="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
    <span class="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
    <input type="checkbox" class="input" onChange={toggleTheme}/>
    <span class="slider"></span>
    </label>
    </div>
    
    <div className="timer-wrapper">
      <div className="progress-bar"
        style={{
          width: `${percentageCalc()}%`, // Set the width dynamically
        }}
      ></div>
      
      <p className="txt">{formatTime(timeRemaining)} Minutes</p>
      <div className="timer-btn-wrapper">
      <button
      className="start-btn"
        onClick={() => {
          startTimer();
        }}
        disabled={isRunning && !isPaused}
      >
        Start
      </button>
      <button
      className="reset-btn"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>

      <button className="pause-btn" onClick={pauseResumeTimer} disabled={!isRunning}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      </div>

      <p id="value" className="txt">{workTime} Minutes</p>
      <div className="slider-range">
      <button className="plus-minus-btn" onClick={incrementValue} disabled={isRunning && !isPaused}>
      <img width="32" height="32" src="https://img.icons8.com/skeuomorphism/32/minus.png" alt="minus"/>
      </button>
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
      <button className="plus-minus-btn" onClick={decrementValue} disabled={isRunning && !isPaused}>
      <img src="https://img.icons8.com/skeuomorphism/32/add.png" alt="add"/>
      </button>
      </div>
      </div>

      
      <ToastContainer autoClose={false} />
    </>
  );
};

export default Timer;
