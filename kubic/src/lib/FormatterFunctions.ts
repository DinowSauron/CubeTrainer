
export function PadNumber(num: number,padNum: number = 2) {
  return String(num).padStart(padNum, "0");
}

export function milisecondsFormated(ms: number, allDigits = false) {
  const miliseconds = ms % 1000;
  const milisecondsFormated = Math.floor(miliseconds / (allDigits?1:10))

  return PadNumber(milisecondsFormated, allDigits?3:2);
}

export function secondsFormated(ms: number) {
  if(ms < 1000){
    return '00';
  }
  const seconds = Number(Math.floor(ms / 1000).toFixed(0));
  const secondsCalculated = seconds % 60;
  return PadNumber(secondsCalculated);
}

export function minutesFormated(ms: number) {
  if(ms < 60 * 1000){
    return '  ';
  }
  const seconds = Number(Math.floor(ms / 1000).toFixed(0));
  const minutesCalculated = Math.floor(seconds / 60);

  return PadNumber(minutesCalculated);
}


/**
 * Get string and numeric value from date
 * @param date new Date()
 */
export function getFormatedDate(date: Date | undefined = undefined){
  !date? date = new Date():''
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  function getStringFromValue(value: number, separator = "/", interval = [2,2,2]) {
    const dist = [
      interval[0],
      interval[0] + interval[1],
      interval[0] + interval[1] + interval[2]
    ]
    return value.toString().slice(0, dist[0]) + separator +
           value.toString().slice(dist[0], dist[1]) + separator +
           value.toString().slice(dist[1], dist[2]);
  }

  const hourValue = (hours*10000) + (minutes*100) + seconds;
  const dateValue = (year*10000) + (month*100) + day;
  const dateString = getStringFromValue(dateValue, "/", [4,2,2]) // o ano tem 4 numeros
  const hourString = getStringFromValue(hourValue, ":", [2,2,2])
  const dateInMiliseconds = (new Date()).getTime()

  const formatedValue = {
    dateInMiliseconds,
    dateString,
    dateValue,
    hourString,
    hourValue
  }
  return formatedValue;
}