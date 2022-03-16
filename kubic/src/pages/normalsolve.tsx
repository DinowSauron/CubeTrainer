import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react"
import { SetDisplayVars } from "../lib/GlobalFunctions"
import styles  from "../styles/page-styles/normal-solve.module.scss"



export default function NormalSolve() {

  useEffect(() => {
    SetDisplayVars();
    window.addEventListener('resize', SetDisplayVars);
  }, [])

  const scramble = "U' L2 D' U R2 B' D' U' L2 B2 R' U' B' F' L U2 F R2 U'"

  // const [date, setDate] = useState((new Date()).getTime());
  const [miliseconds, setMiliseconds] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [timingSolve, setTimingSolve] = useState(0);
  const [startCounter, setStartCounter] = useState(false);
  
  const [startTimingPoint, setStartTimingPoint] = useState((new Date()).getTime());
  function runTiming(reset=false) {
    if(startCounter){
      const timer = (new Date()).getTime();
      const timerCount = reset ? 0 : (timer - startTimingPoint)
      setTimingSolve(timerCount);
    }
  }
  function TimerSteps() {
    setSeconds(secondsFormated(timingSolve));
    setMiliseconds(milisecondsFormated(timingSolve))
  }
  useEffect(() => {
    setTimeout(() => {
      if(startCounter){
        runTiming();
      }
    }, 50);

    TimerSteps();
  }, [timingSolve,startCounter]);

  function handleStopTiming() {
    setTimingSolve(timingSolve)
    setStartCounter(false);

  }
  function HandleStartTiming() {
    setStartTimingPoint((new Date()).getTime());
    setStartCounter(true);
    runTiming(true)
    // setTimingSolve(0);
  }
  function FormatDoubleNumbers(num: string | number) {
    return (num<100 ? (num<10 ? '0'+num : num) : '00').toString();
  }

  function milisecondsFormated(ms: number) {
    const dtStr = ms.toString();
    const dtLg = dtStr.length;
    const msCount = Number((
    (Number(dtStr[dtLg-1]) + 
    (Number(dtStr[dtLg-2])*10) + 
    (Number(dtStr[dtLg-3])*100 )) / 10
    ).toFixed())

    return FormatDoubleNumbers(msCount)
  }
  function handleAddSeconds(seconds: number) {
    setTimingSolve(timingSolve + (seconds * 1000))
  }
  function secondsFormated(ms: number) {
    if(ms < 1000){
      return '00';
    }
    const seconds = Number(Math.floor(ms / 1000).toFixed(0));
    const rest = Number(Math.floor(seconds / 100).toFixed(0)) * 100;
    const secondsCalculated = rest < seconds ? seconds-rest:-(rest-seconds) + 100;
    const secondsClamp = secondsCalculated >= 60? secondsCalculated-60:secondsCalculated
    return FormatDoubleNumbers(secondsClamp);
  }

  const { data } = useSession()
  const accessToken  = data?data.accessToken:"aaa"


  return (
    <section className={styles.page}>

      <div className={styles.pageContent} id="ContainerWidth">

        <div className={styles.solveContainer}>
          <h2>Normal Solver</h2>

          <p className={styles.scramble}>Scramble: <span>{scramble}</span></p>

          <div className={styles.separator}>
            <section>

            </section>
            <div> 
              
              <p className={styles.timer}>{seconds}<span>.{miliseconds}</span></p>
              {/* <p>{timer[0] +':'+ timer[1]}</p> */}
              {/* <p>{date - startTimingPoint.getTime()}</p> */}
              {/* {/*<p>{secondsFormated(8042)}</p> */}
              {/* <p>{FormatDoubleNumbers(2)}</p> */}
              <p>{accessToken}</p>
              <p>{data&&data.type}</p>
              {timingSolve > 0 && !startCounter && (
                <>
                  <button>Record Timer</button>
                  <button onClick={() => handleAddSeconds(2)}>Record Timer +DNF</button>
                </>
              )}
              {startCounter ? (
                <button className={styles.stopTimer} onClick={() => handleStopTiming()}>Stop Timing</button>
               ):(
                <button className={styles.startTimer} onClick={() => HandleStartTiming()}>Start Timing</button>
              )} 
            </div>
          </div>
        </div>

      </div>
    </section>

  )
}
