import { useState, useEffect } from 'react';

const useTimer = (initialState = 0) => {
  const [elapsedTime, setElapsedTime] = useState(initialState);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(()=>{

    let interval : number;
    if(isRunning){
            const startTime = Date.now() - elapsedTime;
            interval = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);
    }
    
    return () => {
        clearInterval(interval);
    };

  } ,[isRunning])


  const handlePause = () => {
    setIsRunning(false);
  }

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  }

  const handleStart = () => {
    setIsRunning(true);
    setElapsedTime(0);
  }


  return { elapsedTime, isRunning, handleStart, handlePause, handleReset };
}

export default useTimer;