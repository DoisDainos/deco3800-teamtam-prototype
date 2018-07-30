/* generates a graph based on pointsNum
   the more points the more difficult*/
function generateRandomPoints(difficulty, type) {
  var sign = Math.floor(Math.random() * 1.9);
  var points = [];
  for(var i = 0; i < difficulty; i++) {
    points[i] = generateFirstPoint();
    i += 1;
    points[i] = generateSecondPoint(points[i - 1]);
  }
  return points;
}

/* generates a sloping graph based on pointsNum
   the more points the more difficult*/
function generateSlopePoints(difficulty) {
  var points = [];
  hertz = 250;
  for(var i = 0; i < difficulty; i++) {
    points[i] = generateFirstPoint();
    i += 1;
    points[i] = generateSlopeSecondPoint(hertz);
    if (i >= 2) {
      while (points[i] === points[i-2]) {
          points[i] += 5;
      }
    }
    hertz += hertz;
  }
  return points;
}

/* creates a rising point on the graph
   based on the first point*/
function generateSlopeSecondPoint(hertz, first_point){
  var val = Math.floor((hertz - 250)*9/(hertz) + 1);
  return 15 + ((Math.floor(val) * 5));
}

/* creates a sloping point on the graph
   based on the first point*/
function generateRisingSecondPoint(hertz){
  var val = Math.floor((hertz - 250)*(10-1)/(8000-hertz) + 1);
  return 100 - ((Math.floor(Math.random() * val) * 5));
}


/* creates a randomly generated point */
function generateFirstPoint(){
  return ((Math.floor(Math.random() * 3) * 5));
}

/* creates a randomly generated point on the graph
   based on the first point*/
function generateSecondPoint(first_point){
  return (40 + ((first_point - ((Math.floor(Math.random() * 5)) * 5) - 20)));
}

/* returns the number of points that
   need to be masked for AC */
function getMaskingNumsAC(points) {
  var maskNums = [];
  for(var i = 1; i <= points.length; i+=2) {
    if ((points[i] - points[i-1]) > 39 || (points[i-1] - points[i]) > 39) {
      maskNums.push(points[i]);
    }
  }
  return maskNums;
}

/* returns the number of points that
   need to be masked for BC */
function getMaskingNumsBC(points) {
  var maskNums = [];
  for(var i = 1; i <= points.length; i+=2) {
    if ((points[i] - points[i-1]) > 14 || (points[i-1] - points[i]) > 14) {
      maskNums.push(points[i]);
    }
  }
  return maskNums;
}

module.exports = {
  generateRandomPoints: generateRandomPoints,
  generateSlopePoints: generateSlopePoints,
  getMaskingNumsAC: getMaskingNumsAC,
  getMaskingNumsBC: getMaskingNumsBC
}
