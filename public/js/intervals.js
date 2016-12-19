var newInterval = document.createElement("div");
newInterval.className = "interval";
var timeValue = document.createTextNode(timeInterval);
newInterval.appendChild(timeValue);
document.getElementById("intervals").appendChild(newInterval);