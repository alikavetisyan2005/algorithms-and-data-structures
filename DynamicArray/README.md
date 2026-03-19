DynamicArray (JavaScript)

A custom DynamicArray implementation in JavaScript that mimics the behavior of low-level dynamic arrays (similar to C++ std::vector) while also supporting familiar JavaScript array methods like map, filter, reduce, and iterators.

This project is designed for learning purposes, focusing on:

manual memory management (capacity vs size)

algorithmic thinking

API design

iterator protocols

✨ Features
Core Behavior

Dynamic resizing with configurable growth factor

Separate size and capacity

Manual memory reallocation (reserve, shrinkToFit)

Private fields using #

Element Access

at(index)

set(index, value)

front()

back()

toArray()

Modifiers

pushBack(value)

popBack()

insert(pos, value)

erase(pos)

clear()

swap(i, j)

Iteration Support

for...of iteration

values()

keys()

entries()

Higher-Order Methods

forEach

map

filter

reduce

some

every

find

findIndex

includes

Utilities

reverse() (in-place)

sort(compareFn) (custom algorithm)

clone()

equals(other)

📦 Installation

No dependencies required.

Just include the file:

import DynamicArray from "./DynamicArray.js";


(or paste the class directly into your project)

🚀 Usage Examples
Creating a DynamicArray
const arr = new DynamicArray();

Adding Elements
arr.pushBack(10);
arr.pushBack(20);
arr.pushBack(30);

Accessing Elements
arr.at(0);      // 10
arr.front();    // 10
arr.back();     // 30

Iteration
for (let value of arr) {
  console.log(value);
}

Higher-Order Methods
const doubled = arr.map(v => v * 2);
const evens = arr.filter(v => v % 2 === 0);
const sum = arr.reduce((a, b) => a + b, 0);

Cloning & Equality
const copy = arr.clone();
arr.equals(copy); // true

🧠 Design Notes

Amortized O(1) pushBack

Capacity grows by a factor of 2

No built-in Array.sort is used

Iterators follow the ES6 iterator protocol

All higher-order functions do not modify the original array

⚠️ Constraints

Only numbers are allowed as elements

Index bounds are strictly checked

Designed for educational use, not production

🧪 Example Output
const arr = new DynamicArray();
arr.pushBack(1);
arr.pushBack(2);
arr.pushBack(3);

arr.toArray(); // [1, 2, 3]