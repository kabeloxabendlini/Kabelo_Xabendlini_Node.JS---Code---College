// The 'require' function is a built-in Node.js feature used to import 
// code, functions, or data from another JavaScript file (called a module).

// Here, we are importing the contents of a local file named 'add.js'.
// The './' means the file is in the same directory as this script.
// Whatever 'add.js' exports (in this case, the 'addNum' function) 
// will be stored inside the variable 'addition'.
const addition = require('./add');  


// Now, we access the 'addNum' function that was exported from 'add.js'
// using 'addition.addNum'. 
// 'addition' is the imported object, and 'addNum' is a property (the function) on it.

// We call the function and pass two numbers as arguments: 10 and 15.
// This will trigger the function defined in 'add.js':
//    -> it will calculate 10 + 15,
//    -> store the result in the variable 'answer',
//    -> and log "10 + 15 = 25" to the console.
addition.addNum(10, 15);  


// In summary:
// 1. The code imports the 'addNum' function from 'add.js'.
// 2. It stores the imported module inside the variable 'addition'.
// 3. It then calls that function with the numbers 10 and 15.
// 4. The output shown in the terminal will be: "10 + 15 = 25".
// 5. This demonstrates how to *import* and *use* a function from another file in Node.js.