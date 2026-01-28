Binary Search (JavaScript)

This repository contains an implementation of the Binary Search algorithm in JavaScript.

📖 Overview

Binary Search is an efficient searching algorithm that works on sorted arrays.
It repeatedly divides the search space in half until the target element is found or the search space becomes empty.

⚙️ How It Works

Start with two pointers: left and right

Find the middle element

Compare the middle element with the target:

If equal → return the index

If smaller → search the right half

If larger → search the left half

Repeat until found or the range is empty

🛠️ Implementation
function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // target not found
}

▶️ Usage
let nums = [-7, 1, 5, 9, 11, 12];
let target = 9;

console.log(binarySearch(nums, target));

Output
3

⏱️ Complexity Analysis
Time Complexity

Best Case: O(1)

Average Case: O(log n)

Worst Case: O(log n)

Space Complexity

O(1) (iterative approach)

✅ Key Characteristics

Requires a sorted array

Very fast compared to linear search

Works best on large datasets

Non-recursive (iterative) implementation

📌 Notes

Returns the index of the target if found

Returns -1 if the target does not exist

Array must be sorted before using binary search

📚 When to Use Binary Search

Searching in large, sorted datasets

Optimizing performance over linear search

Interview and competitive programming scenarios