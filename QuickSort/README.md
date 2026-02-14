QuickSort Implementation in JavaScript
Overview

This project contains a simple implementation of the QuickSort algorithm in JavaScript. QuickSort is a highly efficient, in-place sorting algorithm that uses the divide-and-conquer strategy to sort arrays.

The current implementation selects the first element of the array as the pivot.

Features

Sorts arrays of numbers in ascending order.

Uses in-place swapping (no extra arrays needed).

Recursive implementation using the classic QuickSort algorithm.

Handles arrays of any length.

Usage

Clone or download the repository.

Open the JavaScript file (quicksort.js) in your code editor.

Add an array of numbers you want to sort:

let arr = [10, 12, 3, 1, 23, 13];
quickSort(arr);
console.log(arr); // Output: [1, 3, 10, 12, 13, 23]


Run the file using Node.js:

node quicksort.js

QuickSort Function
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const partitionIndex = partition(arr, low, high);
        quickSort(arr, low, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[low];
    let i = low + 1;
    let j = high;

    while (i <= j) {
        while (i <= high && arr[i] <= pivot) i++;
        while (j >= low && arr[j] > pivot) j--;

        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[low], arr[j]] = [arr[j], arr[low]];
    return j;
}

Time Complexity
Case	Time Complexity	Space Complexity
Best	O(n log n)	O(log n)
Average	O(n log n)	O(log n)
Worst	O(n²)	O(n)

Note: Worst-case occurs when the array is already sorted or nearly sorted. Using a random pivot can mitigate this.