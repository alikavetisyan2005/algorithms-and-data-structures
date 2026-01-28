# Merge Sort (JavaScript)

This repository contains a JavaScript implementation of the **Merge Sort** algorithm using a recursive, divide-and-conquer approach.

---

## 📖 Overview

**Merge Sort** is a stable sorting algorithm that works by:

1. Dividing the array into smaller subarrays
2. Recursively sorting each subarray
3. Merging the sorted subarrays back together

It guarantees **O(n log n)** time complexity in all cases.

---

## 🛠️ Implementation

### `merge` Function

Merges two sorted arrays into one sorted array.

```js
function merge(nums1, nums2) {
    let res = [];
    let i = 0;
    let j = 0;

    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            res.push(nums1[i++]);
        } else {
            res.push(nums2[j++]);
        }
    }

    while (i < nums1.length) res.push(nums1[i++]);
    while (j < nums2.length) res.push(nums2[j++]);

    return res;
}
```

---

### `mergeSort` Function

Recursively divides the array and merges the sorted halves.

```js
function mergeSort(nums) {
    if (nums.length <= 1) {
        return nums;
    }

    const mid = Math.floor(nums.length / 2);
    const left = nums.slice(0, mid);
    const right = nums.slice(mid);

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    return merge(sortedLeft, sortedRight);
}
```

---

## ▶️ Usage

```js
let nums = [-7, 5, 1, 12, 9, 11];
console.log(mergeSort(nums));
```

### Output

```js
[-7, 1, 5, 9, 11, 12]
```

---

## ⏱️ Complexity Analysis

### Time Complexity

* Best Case: **O(n log n)**
* Average Case: **O(n log n)**
* Worst Case: **O(n log n)**

### Space Complexity

* **O(n)** (extra space used during merging)

---

## ✅ Features

* Stable sorting algorithm
* Predictable performance
* Uses recursion and divide-and-conquer
* Does not mutate the original array

---

## 📌 Notes

* This implementation returns a new sorted array.
* Suitable for learning recursion and algorithm design.
* Commonly used for sorting large datasets.

---
