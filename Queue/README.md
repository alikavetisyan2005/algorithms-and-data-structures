Circular Queue Implementation in JavaScript

A fixed-size circular queue implemented in JavaScript. This data structure supports FIFO (First-In-First-Out) operations efficiently using a circular buffer.

Features

Fixed-size queue with user-defined capacity

O(1) enqueue and dequeue operations

Peek at front and back elements without removing them

Circular array implementation ensures space efficiency

Safety checks for overflow and underflow

Class: Queue
Constructor
constructor(capacity)

capacity: Positive integer specifying the maximum number of elements.

Throws an error if capacity is invalid.

Initializes an internal buffer, front, back, and size.

Methods
enqueue(value)

Adds an element to the back of the queue.

queue.enqueue(10);

Throws an error if the queue is full (overflow).

Circularly updates the back pointer.

Increments size.

dequeue()

Removes and returns the front element.

let value = queue.dequeue();

Throws an error if the queue is empty (underflow).

Circularly updates the front pointer.

Decrements size.

peek()

Returns the front element without removing it.

let front = queue.peek();

Returns null if the queue is empty.

back()

Returns the last element without removing it.

let last = queue.back();

Throws an error if the queue is empty.

is_empty()

Checks if the queue is empty.

queue.is_empty(); // true or false
is_full()

Checks if the queue is full.

queue.is_full(); // true or false
print()

Prints the queue elements in FIFO order.

queue.print(); // e.g., 10 <- 20 <- 30
Example Usage
const queue = new Queue(5);

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log(queue.peek()); // 10
console.log(queue.back()); // 30

queue.print(); // 10 <- 20 <- 30

console.log(queue.dequeue()); // 10
queue.print(); // 20 <- 30
Notes

Internally, the queue uses a circular buffer to maintain O(1) operations.

front and back pointers track the logical start and end.

Overflow and underflow checks ensure safety.