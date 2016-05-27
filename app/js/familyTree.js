// // ************** Generate the tree diagram  *****************
// Constants
var margin = {top: 20, right: 100,bottom: 20, left: 200},
    width = 1200,
    height = 800,
    leftTopMostNodeXAxis = 100,
    leftTopMostNodeYAxis = 100;

// Create Hierarchical helper Object
var HierarchicalHelperObj = new HierarchicalHelper("small");
// Create SVG for the drawings
HierarchicalHelperObj.createSVG(margin, width, height);

var fatherNode = HierarchicalHelperObj.drawNode(leftTopMostNodeXAxis, leftTopMostNodeYAxis, "male");
var motherNode = HierarchicalHelperObj.drawPatnerNode(fatherNode, "female");

var childNode = HierarchicalHelperObj.drawChildNode(fatherNode, motherNode, "male");
var childPatnersNode = HierarchicalHelperObj.drawPatnerNode(childNode, "female");

var childsChildsNode = HierarchicalHelperObj.drawChildNode(childNode, childPatnersNode, "female");
HierarchicalHelperObj.drawPatnerNode(childsChildsNode, "male");
// Drop a line to join the end points of previous two lines

