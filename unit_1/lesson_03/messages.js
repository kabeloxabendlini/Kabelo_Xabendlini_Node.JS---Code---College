"use strict";
// Enables Strict Mode — helps catch common JavaScript errors,  
// enforces cleaner syntax, and prevents the use of undeclared variables.

// The 'exports' object is used to make data, functions, or variables
// available to other files that import this module using 'require()'.

exports.messages = [
    "You are great!",
    "You can accomplish anything!",
    "Success is in your future!"
];

// This exports an array of motivational messages.
// Any other JavaScript file can now access this array by importing
// this module using: const messageModule = require("./filename");

// The comments below explain common Node.js commands:

// 'exports' makes this array available to other files.

// 'npm install <dependency> --save'
// Installs a package (dependency) and adds it to the "dependencies"
// section in your project's package.json file.

// 'npm init -y'
// Automatically creates a default package.json file for your project.