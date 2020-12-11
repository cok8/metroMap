let stationsData = [
  { name: "A", xcor: 100, ycor: 100 },
  { name: "B", xcor: 200, ycor: 100 },
  { name: "C", xcor: 300, ycor: 500 },
  { name: "D", xcor: 700, ycor: 100 },
];

let linesData = [
  {
    color: "blue",
    stations: [
      { name: "A", index: 0 },
      { name: "B", index: 1 },
      { name: "C", index: 2 },
      { name: "D", index: 3 },
    ],
  },
];

const metroMap = document.querySelector("#map");

for (let stationData of stationsData) {
  let station = document.createElement("span");
  station.classList.add("station");
  station.style.left = `${stationData.xcor}px`;
  station.style.top = `${stationData.ycor}px`;
  metroMap.appendChild(station);
}

for (let lineData of linesData) {
  let startStop;
  let endStop;
  for (let i = 0; i < lineData.stations.length - 1; i++) {
    if (lineData.stations[i].name === stationsData[i].name) {
      startStop = stationsData[i];
    }
    if (lineData.stations[i + 1].name === stationsData[i + 1].name) {
      endStop = stationsData[i + 1];
    }

    let width = endStop.xcor - startStop.xcor;
    let height = -(endStop.ycor - startStop.ycor);

    
    if (height === 0) {
      let left = startStop.xcor + 5 
      let top = startStop.ycor + 5;
      let line = document.createElement("span");
      line.classList.add("line");
      line.style.width = width > 0 ? `${width + 10}px` : `${-width + 10}px`;
      line.style.left = `${left}px`;
      line.style.top = `${top}px`;
      line.style.transform = width > 0 ?`rotate(${0}rad)`:`rotate(${Math.PI}rad)`;
      line.style.transformOrigin = "8px";
      line.style.zIndex = `-1`;
      metroMap.appendChild(line);
    } else if (width === 0) {
      let left = startStop.xcor + 5;
      let top = startStop.ycor + 5;
      let line = document.createElement("span");
      line.classList.add("line");
      line.style.width = height< 0? `${-height + 10}px`: `${height + 10}px`;
      line.style.left = `${left}px`;
      line.style.top = `${top}px`;
      line.style.transform = height<0 ?`rotate(${Math.PI/2}rad)`:`rotate(${-Math.PI/2}rad)`;
      line.style.transformOrigin = "8px";
      line.style.zIndex = `-1`;
      metroMap.appendChild(line);
    } else if (Math.abs(height) === Math.abs(width)) {
      let aTangent = Math.atan(height / width);
      let left = startStop.xcor + 5;
      let top = startStop.ycor + 5;
      let line = document.createElement("span");
      line.classList.add("line");
      let length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) + 10;
      line.style.width = `${length}px`;
      line.style.left = `${left}px`;
      line.style.top = `${top}px`;
      line.style.transform =
        width > 0
          ? `rotate(${-aTangent}rad)`
          : `rotate(${Math.PI - aTangent}rad)`;
      line.style.transformOrigin = "8px";
      line.style.zIndex = `-1`;
      metroMap.appendChild(line);
    } else {
      if (Math.abs(width) > Math.abs(height)) {
        let newWidth = [
          (Math.abs(width) - Math.abs(height)) / 2,
          Math.abs(height),
          (Math.abs(width) - Math.abs(height)) / 2,
        ];
        let left = startStop.xcor + 5;
        let top = startStop.ycor + 5;
        for (let i in newWidth) {
          let line = document.createElement("span");
          line.classList.add("line");
          if (width > 0) {
            left += i == 0 ? 0 : newWidth[i - 1];
          } else {
            left -= i == 0 ? 0 : newWidth[i - 1];
          }
          line.style.width = `${newWidth[i] + 10}px`;
          if (width < 0) {
            console.log(true);
            line.style.transform = `rotate(${Math.PI}rad)`;
          }
          if (i == 1) {
            let aTangent = Math.atan(height / newWidth[1]);
            line.style.transform =
              width > 0
                ? `rotate(${-aTangent}rad)`
                : `rotate(${Math.PI + aTangent}rad)`;

            line.style.width = `${
              Math.sqrt(2 * Math.pow(newWidth[i], 2)) + 10
            }px`;
          }
          if (i == 2) {
            top += -height;
          }
          line.style.left = `${left}px`;
          line.style.top = `${top}px`;
          line.style.transformOrigin = "8px";
          line.style.zIndex = `-1`;
          metroMap.appendChild(line);
        }
      } else if (Math.abs(height) > Math.abs(width)) {
        let newHeight = [
          (Math.abs(height) - Math.abs(width)) / 2,
          Math.abs(width),
          (Math.abs(height) - Math.abs(width)) / 2,
        ];
        let left = startStop.xcor + 5;
        let top = startStop.ycor + 5;
        for (let i in newHeight) {
          let line = document.createElement("span");
          line.classList.add("line");

          if (height > 0) {
            top -= i == 0 ? 0 : newHeight[i - 1];
          } else {
            top += i == 0 ? 0 : newHeight[i - 1];
          }
          line.style.width = `${newHeight[i] + 10}px`;
          line.style.transform =
            height < 0
              ? `rotate(${Math.PI / 2}rad)`
              : `rotate(${-Math.PI / 2}rad)`;

          if (i == 1) {
            let aTangent = Math.atan(newHeight[i] / width);
            console.log(height < 0);
            line.style.transform =
              width < 0
                ? `rotate(${Math.PI + aTangent}rad)`
                : `rotate(${aTangent}rad)`;

            line.style.width = `${
              Math.sqrt(2 * Math.pow(newHeight[i], 2)) + 10
            }px`;
          }
          if (i == 2) {
            left += width;
          }
          line.style.left = `${left}px`;

          line.style.top = `${top}px`;

          line.style.transformOrigin = "8px";
          line.style.zIndex = `-1`;
          metroMap.appendChild(line);
        }
      }
    }
  }
}
