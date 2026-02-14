Singly Linked List Implementation in JavaScript
Overview

This project implements a Singly Linked List (SLL) in JavaScript. A singly linked list is a linear data structure where each node contains a value and a reference (pointer) to the next node in the list.

Singly linked lists are useful for dynamic data structures where insertions and deletions are frequent, as they allow efficient operations compared to arrays.

Features

Create a linked list from scratch.

Add nodes at the head or tail.

Insert nodes at a specific position.

Remove nodes by value or position.

Traverse and display the linked list.

Find length and search for elements.

Usage

Clone or download the repository.

Open the JavaScript file (singlyLinkedList.js) in your editor.

Create a new linked list and perform operations:

Time Complexity
Operation	Time Complexity
Access (by index)	O(n)
Search (by value)	O(n)
Insertion at head	O(1)
Insertion at tail	O(n)
Insertion at position	O(n)
Deletion by value	O(n)
Advantages

Dynamic memory allocation.

Efficient insertions/deletions at head or specific positions.

Can grow and shrink in size easily.

Limitations

Accessing elements by index is slower (O(n)) compared to arrays.

Extra memory needed for storing next pointers.