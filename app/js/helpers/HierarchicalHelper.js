function HierarchicalHelper(nodeSize) {
  // Svg object
  this.svg = {};
  // Constants to configure Node Dimensions
  this.smallNodeDimensions = { width: 100, height: 50}; 
  this.mediumNodeDimensions = { width: 150, height: 75}; 
  this.largeNodeDimensions = { width: 200, height: 100};
  this.nodeDimension = this.getNodeDimensions(nodeSize);
  this.nodeWidth = this.nodeDimension.width;
  this.nodeHeight = this.nodeDimension.height;
  // Gap between two vertical nodes
  this.verticalGapBetweenTwoNodes = this.nodeDimension.height;
  this.dropLineLength = 100;
  // Defining the color of the nodes
  this.maleNodeColor = "green";
  this.femaleNodeColor = "pink";
}


/* The next block of code appends our SVG working area to the body of our web page and creates a group elements (<g>) that will contain our svg objects (our nodes, text and links).
*/
HierarchicalHelper.prototype.createSVG = function(margin, width, height) {
  svg = d3.select("body").append("svg")
 .attr("width", width + margin.right + margin.left)
 .attr("height", height + margin.top + margin.bottom)
  .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}


HierarchicalHelper.prototype.getNodeDimensions = function (size) {
  if (size === "small") {
    return this.smallNodeDimensions;
  } else if (size === "large") {
    return this.largeNodeDimensions;
  } else {
    return this.mediumNodeDimensions;
  }
}

HierarchicalHelper.prototype.drawNode = function (xAxis, yAxis, nodeType) {
  var rectColor;
  if (nodeType === "male") {
    rectColor = this.maleNodeColor;
  } else if (nodeType === "female") {
    rectColor = this.femaleNodeColor;
  }
  svg.append("rect")       // attach a rectangle
    .attr("x", xAxis)         // position the left of the rectangle
    .attr("y", yAxis)          // position the top of the rectangle
    .attr("height", this.nodeHeight)    // set the height
    .attr("width", this.nodeWidth)
    .attr("fill", rectColor);
  return {
    xAxis: xAxis,
    yAxis: yAxis,
    height: this.nodeHeight,
    width: this.nodeWidth,
    color: rectColor
  }  
}

HierarchicalHelper.prototype.drawLine = function (x1Axis, y1Axis, x2Axis, y2Axis) {
    svg.append("line")          // attach a line
    .style("stroke", "black")   // colour the line
    .attr("x1", x1Axis)            // x1 position of the first end of the line
    .attr("y1", y1Axis)             // y1 position of the first end of the line
    .attr("x2", x2Axis)            // x2 position of the second end of the line
    .attr("y2", y2Axis);           // y2 position of the second end of the line
}


HierarchicalHelper.prototype.drawPatnerNode = function (spouseNodeObject, nodeType) {
  var nodeCreated;
  var SpouseXAxis = parseInt(spouseNodeObject.xAxis),
      SpouseYAxis = parseInt(spouseNodeObject.yAxis);
  if (nodeType === "female") {
      // Create female below the spouse node
      nodeCreated = this.drawNode(SpouseXAxis, SpouseYAxis + this.verticalGapBetweenTwoNodes + this.nodeHeight, nodeType); 
  } else if (nodeType === "male") {
      // Create male above the spouse node
      nodeCreated = this.drawNode(SpouseXAxis, SpouseYAxis - this.verticalGapBetweenTwoNodes - this.nodeHeight, nodeType); 
  }
  this.dropParentLine(spouseNodeObject);
  this.dropParentLine(nodeCreated);
  // Drop a line to join the end points of previous two lines
  this.joinDropLinesOfPatners (spouseNodeObject, nodeCreated);
  return nodeCreated;
}

HierarchicalHelper.prototype.drawChildNode = function (fatherNodeObj, MotherNodeObj, nodeType) {
  var childNode = this.drawNode(fatherNodeObj.xAxis + this.nodeWidth + this.dropLineLength * 2, fatherNodeObj.yAxis + this.nodeHeight, nodeType);
  this.joinParentsDropLine(childNode);  
  return childNode;
}

HierarchicalHelper.prototype.dropParentLine = function (parentObject) {
  var x1Axis = parseInt(parentObject.xAxis) + parseInt(parentObject.width),
      y1Axis = parseInt(parentObject.yAxis) + (parseInt(parentObject.height) / 2),
      x2Axis = x1Axis + this.dropLineLength,
      y2Axis = y1Axis;
  this.drawLine(x1Axis, y1Axis, x2Axis , y2Axis);
}

HierarchicalHelper.prototype.joinDropLinesOfPatners = function (higherParentObject, lowerParentObject) {
  var x1Axis = parseInt(higherParentObject.xAxis) + parseInt(higherParentObject.width) + this.dropLineLength,
      y1Axis = parseInt(higherParentObject.yAxis) + (parseInt(higherParentObject.height) / 2),
      x2Axis = x1Axis,
      y2Axis = parseInt(lowerParentObject.yAxis) + (parseInt(lowerParentObject.height) / 2);
  this.drawLine(x1Axis, y1Axis, x2Axis, y2Axis);
}

HierarchicalHelper.prototype.joinParentsDropLine = function (childNodeObject) {
  var x1Axis = parseInt(childNodeObject.xAxis) - this.dropLineLength,
      y1Axis = parseInt(childNodeObject.yAxis) + (parseInt(childNodeObject.height) / 2),
      x2Axis = parseInt(childNodeObject.xAxis),
      y2Axis = y1Axis;
  this.drawLine(x1Axis, y1Axis, x2Axis, y2Axis);    
}

HierarchicalHelper.prototype.addText = function (text, xAxis, yAxis, color) {
  return svg.append("text")            // append text
    .style("fill", color)       // fill the text with the colour black
    .attr("x", xAxis)           // set x position of left side of text
    .attr("y", yAxis)           // set y position of bottom of text 
    .text(text);                // define the text to display 
}

