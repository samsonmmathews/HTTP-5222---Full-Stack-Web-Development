import { groceries, addGroceries, groceryLength } from './labModule.js'

console.log("Before: " + groceries);
console.log(addGroceries("strawberries"));
console.log("After: " + groceries);
console.log(groceryLength());

function first() {
    console.log("This is the first log");
}

function second() {
    console.log("This is the second log");
}

// Non-blocking code executes after all the four blocking codes executes below  
setTimeout(first, 3000); // This gives us a three second timer before executing the function first()
setTimeout(second, 1000); // This gives us one second timer before executing the function second()

// Since the second() gets executed after 1 second, it executes first. first() only gets executed after 3 seconds

// These are examples of blocking code
console.log("This is the first log - 1");
console.log("This is the second log - 1 ");

// Another example of blocking code
first();
second();