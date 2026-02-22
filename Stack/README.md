Stack Implementation in JavaScript

A fixed-size stack implemented using an underlying dynamic array structure. Supports standard LIFO (Last-In-First-Out) operations efficiently.

Features

Fixed-capacity stack with user-defined size

Standard stack operations: push, pop, peek

Size and capacity tracking

Safety checks for overflow and underflow

Clears stack quickly

Class: Stack
Constructor
constructor(capacity = 8)

capacity: Positive integer specifying maximum number of elements (default: 8)

Throws an error if capacity is invalid

Initializes internal dynamic array and size tracker

Methods
push(value)

Adds an element to the top of the stack.

stack.push(12);

Throws an error if the stack is full.

Increments internal size counter.

pop()

Removes and returns the top element.

let top = stack.pop();

Throws an error if the stack is empty.

Decrements internal size counter.

peek()

Returns the top element without removing it.

let top = stack.peek();

Throws an error if the stack is empty.

size()

Returns the current number of elements in the stack.

stack.size(); // e.g., 3
capacity()

Returns the maximum capacity of the stack.

stack.capacity(); // e.g., 8
is_empty()

Checks if the stack is empty.

stack.is_empty(); // true or false
is_full()

Checks if the stack has reached its maximum capacity.

stack.is_full(); // true or false
clear()

Empties the stack.

stack.clear();

Resets the stack to empty without deleting the underlying array.

Example Usage
const stack = new Stack(5);

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek());   // 30
console.log(stack.size());   // 3
console.log(stack.is_full()); // false

console.log(stack.pop());    // 30
stack.print();               // optional method if implemented

stack.clear();
console.log(stack.is_empty()); // true
Notes

Internally, the stack uses a dynamic array (or fixed array) to store elements.

push and pop operations run in O(1) time.

Size and capacity checks prevent overflows and underflows.

Can be extended to dynamic capacity resizing if needed.