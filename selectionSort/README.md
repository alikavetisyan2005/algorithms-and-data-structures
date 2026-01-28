Selection Sort in JavaScript
Overview

Selection Sort is a straightforward sorting algorithm that divides the array into a sorted and unsorted part. It repeatedly selects the smallest (or largest) element from the unsorted portion and swaps it with the first unsorted element, gradually building the sorted portion of the array.

Selection Sort is simple but not efficient for large datasets compared to faster algorithms like QuickSort or MergeSort.

How It Works

Start at the first element of the array (consider it as the start of the unsorted portion).

Find the minimum element in the unsorted portion.

Swap it with the first element of the unsorted portion.

Move the boundary of the sorted portion one element to the right.

Repeat until the array is fully sorted.

Example

Input:

let arr = [64, 25, 12, 22, 11];
selectionSort(arr);
console.log(arr); // [11, 12, 22, 25, 64]

JavaScript Implementation
function selectionSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Find the minimum element in the unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first unsorted element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

Time & Space Complexity

Best Case: O(n²) – array is already sorted

Average Case: O(n²)

Worst Case: O(n²) – array is reverse sorted

Space Complexity: O(1) – sorts in place

Use Cases

Small datasets

Situations where memory is limited (in-place sorting)

Educational purposes to learn basic sorting techniques

Notes

Selection Sort is not stable by default (equal elements may not preserve their original order).

Simple to implement but not efficient for large arrays.