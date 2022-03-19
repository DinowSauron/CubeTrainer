

export function SetDisplayVars() {
  const container = document.getElementById("ContainerWidth");
  if(!container){
    console.log("You not have any object to track Width, set by ID: 'ContainerWidth'");
    return;
  }

  const WidthPx = container.offsetWidth;

  let itemsInGrid = 0;
  itemsInGrid = Number((WidthPx / 500).toFixed());
  if (itemsInGrid <= 0) {
      itemsInGrid = 1;
  }
  if (itemsInGrid > 5) {
      // itemsInGrid = 5
  } 

  container.style.setProperty("--grid-width", WidthPx.toString());
  container.style.setProperty("--grid-items", itemsInGrid.toString());
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


  const formatedValue = {
    dateString,
    dateValue,
    hourString,
    hourValue
  }
  return formatedValue;
}