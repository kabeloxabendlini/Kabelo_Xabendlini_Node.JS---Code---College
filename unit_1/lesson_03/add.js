// The 'exports' object allows this function to be accessible 
// from other files when this module is imported using 'require'.
// For example: const math = require('./thisFile'); then you can call math.addNum(3, 5);
exports.addNum = (x, y) => {  
    
    // 'x' and 'y' are parameters (inputs) passed into the function.
    // The arrow function syntax '(x, y) => { ... }' defines a concise function expression.

    // A variable named 'answer' is declared using 'let', 
    // which means it can be reassigned later if needed.
    // The variable stores the result of adding x and y.
    let answer = x + y;     

    // The console.log() method prints output to the terminal.
    // Here, a *template literal* (string enclosed in backticks `...`) is used.
    // Inside the template literal, variables can be inserted using ${variableName}.
    // The resulting message will look like: "3 + 5 = 8"
    console.log(`${x} + ${y} = ${answer}`); 
    // This prints a user-friendly representation of the addition operation.
};

// In summary:
// 1. This module exports a function named 'addNum'.
// 2. The function takes two numbers (x and y).
// 3. It adds them together and stores the result in 'answer'.
// 4. It then logs the full equation (e.g., "3 + 5 = 8") to the console.
// 5. Because it's exported, other files can import and use it.