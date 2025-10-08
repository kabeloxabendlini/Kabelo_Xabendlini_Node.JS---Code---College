"use strict";  
// Enables Strict Mode — helps catch common JavaScript errors,  
// enforces cleaner syntax, and prevents the use of undeclared variables.

const cities = require("cities");  
// Imports the "cities" Node.js module, which provides data about cities,  
// such as location, postal codes, and related geographic information.

let myCity = cities.zip_lookup("10016");  
// Uses the 'zip_lookup' method from the 'cities' module to look up information  
// about the ZIP code "10016" (for example, this corresponds to New York City, NY, USA).

console.log(myCity);  
// Logs the resulting city information (like city name, state, and country)  
// to the console.