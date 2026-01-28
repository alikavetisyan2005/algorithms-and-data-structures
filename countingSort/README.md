Counting Algorithm
Overview

The Counting Algorithm is a simple technique used to count the frequency of elements in a dataset. It is commonly used for tasks like frequency analysis, histogram generation, and as a core idea behind Counting Sort.

How It Works

Initialize a data structure (array or map/dictionary) to store counts.

Iterate through the input data.

For each element, increment its corresponding count.

Use the resulting counts for analysis, reporting, or further processing.

Example

Input:

[1, 2, 2, 3, 3, 3]


Output (counts):

1 → 1  
2 → 2  
3 → 3

Pseudocode
initialize empty count_map
for each element in input:
    count_map[element] += 1
return count_map

Time & Space Complexity

Time Complexity: O(n)

Space Complexity: O(k)
where k is the number of unique elements (or range of values).

Use Cases

Frequency counting

Data analysis and statistics

Character or word counting

Preprocessing for sorting algorithms (e.g., Counting Sort)

Limitations

Not ideal when the range of possible values is very large

Requires extra memory for storing counts

Extensions

Can be modified to implement Counting Sort

Can be adapted for strings, words, or characters

Can be used to build histograms