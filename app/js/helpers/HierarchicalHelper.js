function HierarchicalHelper(nodeSize) {
  // Svg object
  this.svg = {};
  // Constants to configure Node Dimensions
  this.smallNodeDimensions = { width: 100, height: 50, fontSize: 12}; 
  this.mediumNodeDimensions = { width: 150, height: 75, fontSize: 16}; 
  this.largeNodeDimensions = { width: 200, height: 100, fontSize: 20};
  this.nodeDimension = this.getNodeDimensions(nodeSize);
  this.nodeWidth = this.nodeDimension.width;
  this.nodeHeight = this.nodeDimension.height;
  // Gap between two vertical nodes
  this.verticalGapBetweenTwoNodes = this.nodeDimension.height;
  this.dropLineLength = 50;
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

HierarchicalHelper.prototype.drawNode = function (xAxis, yAxis, nodeInfo) {
  var rectColor;
  if (nodeInfo.gender === "male") {
    rectColor = this.maleNodeColor;
  } else if (nodeInfo.gender === "female") {
    rectColor = this.femaleNodeColor;
  }
  svg.append("rect")                    // attach a rectangle
    .attr("x", xAxis)                   // position the left of the rectangle
    .attr("y", yAxis)                   // position the top of the rectangle
    .attr("height", this.nodeHeight)    // set the height
    .attr("width", this.nodeWidth)      // set the width
    .attr("fill", rectColor);           // set the rectangle color
  this.fillInfoInNode(xAxis, yAxis, nodeInfo);  
  return {
    nodeAttributes : {
      xAxis: xAxis,
      yAxis: yAxis,
      height: this.nodeHeight,
      width: this.nodeWidth,
      color: rectColor  
    },
    nodeInfo: nodeInfo
  }  
}

HierarchicalHelper.prototype.fillInfoInNode = function(xAxis, yAxis, nodeInfo) {
  this.addText(nodeInfo.name, xAxis + 10, yAxis + 25);  
}

HierarchicalHelper.prototype.drawLine = function (x1Axis, y1Axis, x2Axis, y2Axis) {
    svg.append("line")             // attach a line
    .style("stroke", "black")      // colour the line
    .attr("x1", x1Axis)            // x1 position of the first end of the line
    .attr("y1", y1Axis)            // y1 position of the first end of the line
    .attr("x2", x2Axis)            // x2 position of the second end of the line
    .attr("y2", y2Axis);           // y2 position of the second end of the line
}


HierarchicalHelper.prototype.drawPatnerNode = function (spouseNodeObject, nodeInfo) {
  var nodeCreated;
  var SpouseXAxis = parseInt(spouseNodeObject.nodeAttributes.xAxis),
      SpouseYAxis = parseInt(spouseNodeObject.nodeAttributes.yAxis);
  if (nodeInfo.gender === "female") {
      // Create female below the spouse node
      nodeCreated = this.drawNode(SpouseXAxis, SpouseYAxis + this.verticalGapBetweenTwoNodes + this.nodeHeight, nodeInfo); 
  } else if (nodeInfo.gender === "male") {
      // Create male above the spouse node
      nodeCreated = this.drawNode(SpouseXAxis, SpouseYAxis - this.verticalGapBetweenTwoNodes - this.nodeHeight, nodeInfo); 
  }
  this.dropParentLine(spouseNodeObject);
  this.dropParentLine(nodeCreated);
  // Drop a line to join the end points of previous two lines
  this.joinDropLinesOfPatners (spouseNodeObject, nodeCreated);
  return nodeCreated;
}

HierarchicalHelper.prototype.drawChildNode = function (fatherNodeObj, MotherNodeObj, nodeInfo) {
  var childNode = this.drawNode(fatherNodeObj.nodeAttributes.xAxis + this.nodeWidth + this.dropLineLength * 2, fatherNodeObj.nodeAttributes.yAxis + this.nodeHeight, nodeInfo);
  this.joinParentsDropLine(childNode);  
  return childNode;
}

HierarchicalHelper.prototype.dropParentLine = function (parentObject) {
  var x1Axis = parseInt(parentObject.nodeAttributes.xAxis) + parseInt(parentObject.nodeAttributes.width),
      y1Axis = parseInt(parentObject.nodeAttributes.yAxis) + (parseInt(parentObject.nodeAttributes.height) / 2),
      x2Axis = x1Axis + this.dropLineLength,
      y2Axis = y1Axis;
  this.drawLine(x1Axis, y1Axis, x2Axis , y2Axis);
}

HierarchicalHelper.prototype.joinDropLinesOfPatners = function (higherParentObject, lowerParentObject) {
  var x1Axis = parseInt(higherParentObject.nodeAttributes.xAxis) + parseInt(higherParentObject.nodeAttributes.width) + this.dropLineLength,
      y1Axis = parseInt(higherParentObject.nodeAttributes.yAxis) + (parseInt(higherParentObject.nodeAttributes.height) / 2),
      x2Axis = x1Axis,
      y2Axis = parseInt(lowerParentObject.nodeAttributes.yAxis) + (parseInt(lowerParentObject.nodeAttributes.height) / 2);
  this.drawLine(x1Axis, y1Axis, x2Axis, y2Axis);
}

HierarchicalHelper.prototype.joinParentsDropLine = function (childNodeObject) {
  var x1Axis = parseInt(childNodeObject.nodeAttributes.xAxis) - this.dropLineLength,
      y1Axis = parseInt(childNodeObject.nodeAttributes.yAxis) + (parseInt(childNodeObject.nodeAttributes.height) / 2),
      x2Axis = parseInt(childNodeObject.nodeAttributes.xAxis),
      y2Axis = y1Axis;
  this.drawLine(x1Axis, y1Axis, x2Axis, y2Axis);    
}

HierarchicalHelper.prototype.addText = function (text, xAxis, yAxis, color) {
  return svg.append("text")           // append text
    .style("fill", color)             // fill the text with the colour black
    .attr("x", xAxis)                 // set x position of left side of text
    .attr("y", yAxis)                 // set y position of bottom of text 
    .text(text)
    .attr("font-size", this.nodeDimension.fontSize);                      // define the text to display 
}

