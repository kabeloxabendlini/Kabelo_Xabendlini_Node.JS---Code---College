"use strict";  
// Enables Strict Mode in JavaScript — helps catch errors, prevents unsafe actions 
// (like using undeclared variables), and enforces cleaner code practices.

3 + 3;  
// Simple arithmetic expression that adds 3 + 3. 
// The result (6) is not stored or printed, so it’s just evaluated and ignored.

3 / 0;  
// Division by zero in JavaScript returns "Infinity" (not an error like in some languages).

console.log("Hello Universe!");  
// Prints the message "Hello Universe!" to the console.

let name = "Jada Mathele";  
// Declares a variable named 'name' and assigns it the string value "Jada Mathele".

console.log(name);  
// Logs the value of the variable 'name' (i.e., "Jada Mathele") to the console.

class Goat {
    // Defines a class named 'Goat'.
    // Classes are blueprints for creating objects with specific properties and methods.

    eat(foodType) {
        // Method 'eat' takes one argument: foodType.
        // It logs a message saying what the goat loves to eat.
        console.log(`I love eating ${foodType}`);
    }
}

let billy = new Goat();  
// Creates a new instance (object) of the 'Goat' class and assigns it to the variable 'billy'.

billy.eat("tin cans");  
// Calls the 'eat' method on the 'billy' object, passing "tin cans" as an argument.
// Output: "I love eating tin cans"