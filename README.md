# Trailblazer_Familytree_Playground

## Overview

The Trailblazer_Familttree_Playground reporsitory has been setup to use D3 js to evaluate the feasiblity of visualization in trusted family project. Here few lsinks below which will be helpful in understanding d3 visualization

* https://d3js.org/ 
* https://github.com/mbostock/d3/wiki/Gallery
* http://christopheviau.com/d3list/gallery.html
* http://www.d3noob.org/2014/01/tree-diagrams-in-d3js_11.html

The demo files in this repository creates a basic tree using d3

## Getting Started

To get you started you can simply clone the Trailblazer_Familytree_Playground repository and install the dependencies:

### Prerequisites

You need git to clone the angular-08724 repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

You must have node.js and its package manager (npm) installed.
You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone Trailblazer_Familytree_Playground

Clone the Trailblazer_Familytree_Playground repository using [git](http://git-scm.com/):

```
git clone https://github.com/sanandani/Trailblazer_Familytree_Playground.git
cd Trailblazer_Familytree_Playground
```

### Install Dependencies

```
npm install
```

You should find that you have two new folders in your project.

* `node_modules` - contains the npm packages for tools we need
* `app/bower_components` - contains the the d3 and jQuery library files and a few other things.

*Note that the `bower_components` folder would normally be installed in the root folder but Trailblazer_Familytree_Playground changes this location through the `.bowerrc` file.  Putting it in the app folder makes it easier to serve the files by a webserver.*

### Run the Application

The project is preconfigured with a simple development web server.  To start this server:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

### Developer Tools

