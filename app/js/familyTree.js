// ************** Generate the tree diagram  *****************
/* Some of the standard features for our diagram such as the size and shape of the svg container with margins included.*/
var margin = {top: 20, right: 100,bottom: 20, left: 200},
 width = 1000 - margin.right - margin.left,
 height = 800 - margin.top - margin.bottom;
 

/* The next block of code appends our SVG working area to the body of our web page and creates a group elements (<g>) that will contain our svg objects (our nodes, text and links).
*/

var nodeDimension = getNodeDimensions("large");
var svg,
    nodeWidth = nodeDimension.width,
    nodeHeight = nodeDimension.height,
    dropLineLength = 100,
    verticalGapBetweenTwoNodes = nodeDimension.height,
    maleNodeColor = "green",
    femaleNodeColor = "pink",
    leftTopMostNodeXAxis = 200,
    leftTopMostNodeYAxis = 100;


addSVG();
var maleNode = addRectangle(leftTopMostNodeXAxis, leftTopMostNodeYAxis, nodeWidth , nodeHeight, maleNodeColor);
//parentMale[0][0].attributes.width.value + parentMale[0][0].attributes.x.value
var femaleNode = drawPatner(maleNode, "drawFemale");
dropParentLine(maleNode);
dropParentLine(femaleNode);


// Drop a line to join the end points of previous two lines
joinDropLinesOfPatners (maleNode, femaleNode);

var maleNode = addRectangle(leftTopMostNodeXAxis + nodeWidth + dropLineLength * 2, leftTopMostNodeYAxis + nodeHeight, nodeWidth , nodeHeight, maleNodeColor);
// Drop a line to join the end points of previous two lines
joinParentsDropLine(maleNode);

function addSVG() {
  svg = d3.select("body").append("svg")
 .attr("width", width + margin.right + margin.left)
 .attr("height", height + margin.top + margin.bottom)
  .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}


function addRectangle(xAxis, yAxis, rectWidth, rectHeight , rectColor) {
  return svg.append("rect")       // attach a rectangle
    .attr("x", xAxis)         // position the left of the rectangle
    .attr("y", yAxis)          // position the top of the rectangle
    .attr("height", rectHeight)    // set the height
    .attr("width", rectWidth)
    .attr("fill", rectColor);

}

function addLine(x1Axis, y1Axis, x2Axis, y2Axis) {
    svg.append("line")          // attach a line
    .style("stroke", "black")   // colour the line
    .attr("x1", x1Axis)            // x1 position of the first end of the line
    .attr("y1", y1Axis)             // y1 position of the first end of the line
    .attr("x2", x2Axis)            // x2 position of the second end of the line
    .attr("y2", y2Axis);           // y2 position of the second end of the line
}

function dropParentLine(parentObject) {
  var x1Axis = parseInt(parentObject[0][0].attributes.x.value) + parseInt(parentObject[0][0].attributes.width.value),
      y1Axis = parseInt(parentObject[0][0].attributes.y.value) + (parseInt(parentObject[0][0].attributes.height.value) / 2),
      x2Axis = x1Axis + dropLineLength,
      y2Axis = y1Axis;
  addLine(x1Axis, y1Axis, x2Axis , y2Axis);
}

function joinDropLinesOfPatners(higherParentObject, lowerParentObject) {
  var x1Axis = parseInt(higherParentObject[0][0].attributes.x.value) + parseInt(higherParentObject[0][0].attributes.width.value) + dropLineLength,
      y1Axis = parseInt(higherParentObject[0][0].attributes.y.value) + (parseInt(higherParentObject[0][0].attributes.height.value) / 2),
      x2Axis = x1Axis,
      y2Axis = parseInt(lowerParentObject[0][0].attributes.y.value) + (parseInt(lowerParentObject[0][0].attributes.height.value) / 2);
  addLine(x1Axis, y1Axis, x2Axis, y2Axis);
}

function joinParentsDropLine(childNodeObject) {
  var x1Axis = parseInt(childNodeObject[0][0].attributes.x.value) - dropLineLength,
      y1Axis = parseInt(childNodeObject[0][0].attributes.y.value) + (parseInt(childNodeObject[0][0].attributes.height.value) / 2),
      x2Axis = parseInt(childNodeObject[0][0].attributes.x.value),
      y2Axis = y1Axis;
  addLine(x1Axis, y1Axis, x2Axis, y2Axis);    
}


function addText() {
  svg.append("text")          // append text
    .style("fill", "black")   // fill the text with the colour black
    .attr("x", 200)           // set x position of left side of text
    .attr("y", 100)           // set y position of bottom of text 
    .text("Hello World");     // define the text to display 
}

function getNodeDimensions (sizeString) {
  var smallNodeDimensions = { width: 100, height: 50}, 
      mediumNodeDimensions = { width: 150, height: 75}, 
      largeNodeDimensions = { width: 200, height: 100};
  if (sizeString === "small") {
    return smallNodeDimensions;
  } else if (sizeString === "large") {
    return largeNodeDimensions;
  } else {
    return mediumNodeDimensions;
  }
}

function drawPatner(spouseObject, nodeType) {
  var SpouseXAxis = parseInt(spouseObject[0][0].attributes.x.value),
      SpouseYAxis = parseInt(spouseObject[0][0].attributes.y.value);
  if (nodeType === "drawFemale") {
      return addRectangle(SpouseXAxis, SpouseYAxis + verticalGapBetweenTwoNodes + nodeHeight, nodeWidth, nodeHeight, femaleNodeColor); 
  }
}

