Insertion Sort in JavaScript
Overview

Insertion Sort is a simple and intuitive sorting algorithm. It builds the sorted array one element at a time by repeatedly inserting the current element into its correct position among the already sorted elements.

It works well for small datasets and mostly sorted arrays, but is less efficient for large datasets compared to advanced algorithms like QuickSort or MergeSort.

How It Works

Start with the second element of the array (the first element is considered sorted).

Compare the current element with the elements in the sorted portion.

Shift all elements larger than the current element to the right.

Insert the current element into its correct position.

Repeat until the entire array is sorted.

Example

Input:

let arr = [5, 2, 9, 1, 5, 6];
insertionSort(arr);
console.log(arr); // [1, 2, 5, 5, 6, 9]

JavaScript Implementation
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Move elements of arr[0..i-1] that are greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

Time & Space Complexity

Best Case: O(n) – array is already sorted

Average Case: O(n²)

Worst Case: O(n²) – array is reverse sorted

Space Complexity: O(1) – sorts in place

Use Cases

Small datasets

Nearly sorted arrays

Educational purposes to understand sorting

Notes

Insertion Sort is stable, meaning equal elements retain their original order.

Simple to implement but not efficient for very large datasets.