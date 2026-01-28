Bubble Sort (JavaScript)

This repository contains a JavaScript implementation of the Bubble Sort algorithm.

📖 Overview

Bubble Sort is a simple comparison-based sorting algorithm.
It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order.
Larger elements “bubble up” to the end of the array with each pass.

⚙️ How It Works

Compare adjacent elements

Swap them if the left element is greater than the right

After each pass, the largest element moves to the end

Repeat until no swaps are needed

🛠️ Implementation
function bubbleSort(nums) {
    let n = nums.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
                swapped = true;
            }
        }

        // If no swaps occurred, the array is already sorted
        if (!swapped) break;
    }

    return nums;
}

▶️ Usage
let nums = [5, 1, 4, 2, 8];
console.log(bubbleSort(nums));

Output
[1, 2, 4, 5, 8]

⏱️ Complexity Analysis
Time Complexity
Case	Complexity
Best Case	O(n)
Average	O(n²)
Worst Case	O(n²)

Best case occurs when the array is already sorted (with optimization).

Space Complexity

O(1) — in-place sorting algorithm

✅ Key Characteristics

Simple and easy to understand

In-place sorting

Stable sorting algorithm

Inefficient for large datasets

📌 Notes

Mainly used for educational purposes

Not recommended for large arrays

Helpful for understanding basic sorting concepts

📚 When to Use Bubble Sort

Learning sorting fundamentals

Very small datasets

Interview explanations (conceptual understanding)