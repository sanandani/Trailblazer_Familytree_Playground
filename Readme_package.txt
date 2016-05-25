Most of fields are for informational purpose only, such as the name, description, author, and the repository.
Dependencies (We have defined dependencies in bower.json)
The dependencies field describes the runtime library dependencies that your project has, meaning the libraries your project needs to run properly in a browser.
- For example, d3 is the name that D3 library is published under in the NPM repository. 
- The version number 3.x signifies that this project is compatible with any version 3 releases, and NPM should retrieve the latest stable version 3 build to satisfy this dependency.

devDependencies
The devDependencies field describes development time (compile time) library dependencies. 
What this means is that, libraries specified under this category are only required in order to build this project, and not required for running your JavaScript project.
 
All dependency libraries will be downloaded into node_modules folder under your project root folder.

Node.js HTTP Server: http-server, this module will allow you to launch a lightweight HTTP server from any folder and starting serving pages right away.

http-server: This command will launch a Node.js powered HTTP server on the default port 8080 or if you want you can use the –p option to provide a custom port number for it. We are using http-server app -a localhost -p 8000 -c-1