import styles from "./timer.module.scss";
import { useState } from "react";
import { useEffect } from "react"
import { getFormatedDate, milisecondsFormated, secondsFormated } from "../../lib/FormatterFunctions"
import { api } from "../../services/api";


type ExampleProps = {
  scramble: string;
  timerType: "NormalSolver" | "BLDSolver" | "TimerSolver"
}

export function Timer(props: ExampleProps) {

  const [miliseconds, setMiliseconds] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [timingSolve, setTimingSolve] = useState(0);
  const [startCounter, setStartCounter] = useState(false);
  const [startTimingPoint, setStartTimingPoint] = useState((new Date()).getTime());
  

  
  function runTiming() {
    if(startCounter){
      const timer = (new Date()).getTime();
      const timerCount = timer - startTimingPoint;
      setTimingSolve(timerCount);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      if(startCounter){
        runTiming();
      }
    }, 50);

    setSeconds(secondsFormated(timingSolve));
    setMiliseconds(milisecondsFormated(timingSolve));
  }, [timingSolve, startCounter]);




  function handleStopTiming() {
    setStartCounter(false);
  }
  function HandleStartTiming() {
    if(timingSolve > 0) {
      setTimingSolve(0);
    }
    setStartTimingPoint((new Date()).getTime());
    setStartCounter(true);
    runTiming()
    // setTimingSolve(0);
  }
  function handleCancelTimer() {
    setTimingSolve(0);
    setStartCounter(false);
  }
  

  async function handleRecordTime(isDNF = false){
    const params = {
      timer: timingSolve + (isDNF?2000:0),
      isDNF: isDNF,
      scramble: props.scramble,
      date: getFormatedDate()
    }

    const config = {
      headers: {
        "SolverType": props.timerType
      }
    }

    const req = await api.post("/setRecordTime",params,config);
    handleCancelTimer();
    console.log(req)
  }


  return (
    <div className={styles.main}>
      
      <p className={styles.timer}>{seconds}<span>.{miliseconds}</span></p>
      {timingSolve > 0 && !startCounter && (
        <div>
          <button onClick={() => handleRecordTime()}>Record Timer</button>
          <button onClick={() => handleRecordTime(true)}>Record Timer +DNF</button>
          <button onClick={() => handleCancelTimer()}>Cancel Timer</button>
        </div>
      )}
      {startCounter ? (
        <button className={styles.stopTimer} onClick={() => handleStopTiming()}>Stop Timing</button>
        ): timingSolve == 0 && (
            <button className={styles.startTimer} onClick={() => HandleStartTiming()}>Start Timing</button>
        )
      } 
    </div>
  )
}