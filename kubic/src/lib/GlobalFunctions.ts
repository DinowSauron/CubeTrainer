

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
