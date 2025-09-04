//DEMO BLOCKING VS NON-BLOCKING SCRIPT

// console.log(logger.message);
// logger.setMsg("My new message");
// console.log(logger.message);

// TEST LOGGERMODULE.JS
// import {displayMessage, setMessage, setMessagePrivate} from "./loggerModule.js"
import logger from './loggerModule.js' // for a default import, you can import without a specific name
//Everything that is default export will be loaded into the arbitrary (variable) name above.


// console.log(msg);
// setMessage("My new message");

logger.setMessage("My new message");
console.log(displayMessage());

// DEMO BLOCKING (sequential/synchronous) VS NON-BLOCKING SCRIPT (asynchronous)

let x = 5;
let y = 10;

let btn = document.getElementById("click");
btn.addEventListener("click", function () {
    console.log("I HAVE BEEN CLICKED");
});

console.log("Some random text...");

let sum = x + y;
console.log("The sum of 5 and 10 is " + sum);