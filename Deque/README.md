Deque Implementation in JavaScript
Overview

This project provides a fully-featured Deque (Double-Ended Queue) in JavaScript. A Deque is a linear data structure that allows insertion and removal of elements from both the front and the back efficiently.

This implementation uses a circular buffer with dynamic resizing and supports functional programming methods, iteration, and professional utility functions.

Features

Dynamic capacity with automatic resizing (push_front / push_back).

Access elements by index with at().

Peek front and back elements with front() and back().

Remove elements from front or back (pop_front, pop_back).

Clear all elements.

Reserve or shrink capacity (reserve(), shrinkToFit()).

Rotate left or right (rotateLeft(), rotateRight()).

Swap elements by index (swap()).

Search for elements (find(), includes()).

Clone and compare deques (clone(), equals()).

Convert to array (toArray()).

Iteration support (for...of, keys(), values(), entries()).

Functional style methods: forEach(), map(), filter(), reduce().

Usage

Clone or download the repository.

Open deque.js in your code editor.

Create a new deque and perform operations:

const deque = new Deque(8);

// Push elements
deque.push_back(1);
deque.push_back(2);
deque.push_front(0);

// Pop elements
deque.pop_front();
deque.pop_back();

// Access elements
console.log(deque.front()); // 1
console.log(deque.back());  // 1

// Iterate over deque
for (const val of deque) {
    console.log(val);
}

// Convert to array
console.log(deque.toArray());


Run the file using Node.js:

node deque.js

Example
const deque = new Deque(8);

deque.push_back(1);
deque.push_back(2);
deque.push_back(3);
deque.push_back(4);

deque.pop_front(); // removes 1
deque.pop_front(); // removes 2

deque.push_back(5);
deque.push_back(6);

console.log(deque.toArray()); // Output: [3, 4, 5, 6]

Time Complexity
Operation	Time Complexity
Access by index (at)	O(1)
Insert at front/back	O(1) amortized
Remove from front/back	O(1)
Resize / reserve	O(n)
Search (find)	O(n)
Iteration	O(n)
map, filter, reduce	O(n)

Notes:

Dynamic resizing occurs when capacity is exceeded.

All operations are efficient due to the circular buffer design.

Advantages

Efficient double-ended insertions and deletions.

Flexible capacity management.

Functional and iterable API similar to modern JavaScript collections.

Limitations

Searching by value is O(n), unlike hash-based structures.

Rotations and swaps modify the internal buffer and are O(n).

License

This project is open-source under the MIT License.