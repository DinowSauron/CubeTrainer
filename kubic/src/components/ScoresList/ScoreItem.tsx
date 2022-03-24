import styles from "./scorelist.module.scss"
import { milisecondsFormated, secondsFormated, minutesFormated } from "../../lib/FormatterFunctions"

type ScoreItemProps = {
  score: {
    timer: number,
    isDNF: boolean,
    scramble: string,
    date: {
      dateString: string,
      hourString: string,
      dateValue: number,
      hourValue: number
    }
  },
  index: number
}

export default function ScoreItem({score, index}: ScoreItemProps){

  const ms = milisecondsFormated(score.timer);
  const sec = secondsFormated(score.timer);
  const min = Number(minutesFormated(score.timer));


  return (
    <div className={styles.item}>
      <h3 className={score.isDNF?styles.dnf:""}>{index + 1}</h3>
      <div className={styles.timerZone}>
        <p className={styles.timing}>{min != 0 && (min+":")}{sec}.<span>{ms}</span></p>
        {score.isDNF&&(
          <p className={styles.dnfRecord}> +2 DNF</p>
        )}
      </div>
    </div>
  )
}
