"use strict";
// Enables Strict Mode — helps catch common JavaScript errors,  
// enforces cleaner syntax, and prevents the use of undeclared variables.

// Import (require) the "messages" module from the local file named "messages.js".
// The "./" means it’s in the same directory as this script.
const messageModule = require("./messages");

// Loops through each message in the 'messages' array from the imported module.
// The 'forEach' method executes the provided arrow function once for each element.
// 'm' represents the current message in the loop.
messageModule.messages.forEach(m => console.log(m));

// For each message, it logs the message text to the console.