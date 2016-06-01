// // ************** Generate the tree diagram  *****************
// Constants
var margin = {top: 20, right: 100,bottom: 20, left: 200},
    width = 1200,
    height = 800,
    leftTopMostNodeXAxis = 100,
    leftTopMostNodeYAxis = 100;

/* Start - Dummy Family Data */
var nodeInfo = [{
	name: "Karan Bajaj",
	age: "26",
	gender: "male",
	dob: "09221989"
}, {
	name: "ABC Bajaj",
	age: "25",
	gender: "female",
	dob: "10221989"
}, {
	name: "S Anandani",
	age: "25",
	gender: "male",
	dob: "06221989"
}, {
	name: "A Anandani",
	age: "25",
	gender: "female",
	dob: "06221989"
},{
	name: "Wenxin Peng",
	age: "24",
	gender: "female",
	dob: "06221989"
},{
	name: "S Peng",
	age: "25",
	gender: "male",
	dob: "06221989"
}]; 
/* End - Dummy Family Data */



// Create Hierarchical helper Object
var HierarchicalHelperObj = new HierarchicalHelper("medium");
// Create SVG for the drawings
HierarchicalHelperObj.createSVG(margin, width, height);

var fatherNode = HierarchicalHelperObj.drawNode(leftTopMostNodeXAxis, leftTopMostNodeYAxis, nodeInfo[0]);
var motherNode = HierarchicalHelperObj.drawPatnerNode(fatherNode, nodeInfo[1]);

var childNode = HierarchicalHelperObj.drawChildNode(fatherNode, motherNode, nodeInfo[2]);
var childPatnersNode = HierarchicalHelperObj.drawPatnerNode(childNode, nodeInfo[3]);

var childsChildsNode = HierarchicalHelperObj.drawChildNode(childNode, childPatnersNode, nodeInfo[4]);
HierarchicalHelperObj.drawPatnerNode(childsChildsNode, nodeInfo[5]);


