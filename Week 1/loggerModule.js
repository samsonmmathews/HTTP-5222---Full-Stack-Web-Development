//MODULE EXAMPLE
//The logger is for logging messages to the console.

// VERY OLD WAY (NOT DESIRABLE)
// var logger = {
//     message: "My message",
//     setMsg: function (msg) {
//         logger.message = msg
//     }
// };

// NEWER MODULE SYNTAX
let msg = "My private message";

export function setMessage(newMsg) {
    msg = newMsg;
}

export function displayMessage() {
    return msg;
}

export function setMessagePrivate(newMsg) {
    msg = newMsg;
}

export default {setMessage, displayMessage};