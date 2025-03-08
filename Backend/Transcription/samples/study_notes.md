## Study Notes: Binary Heaps and Heap Sort

### Introduction to Binary Heaps

- **Definition**: A binary heap is a complete binary tree that satisfies the heap property. It can be either a **Min Heap** or a **Max Heap**.
  - **Min Heap**: The value of each node is less than or equal to the values of its children.
  - **Max Heap**: The value of each node is greater than or equal to the values of its children.

### Array Representation of Binary Heaps

- **Formulae**:
  - **Parent Node**: \( (i - 1) / 2 \)
  - **Left Child**: \( 2i + 1 \)
  - **Right Child**: \( 2i + 2 \)
- **Complete Binary Tree**: All levels are filled except possibly the last, which is filled from left to right.

### Insertion in a Heap

- **Process**:
  1. Insert the new element at the end of the array.
  2. Compare the new element with its parent and swap if necessary to maintain the heap property.
  3. Continue this process until the heap property is satisfied.
- **Time Complexity**: \( O(\log n) \) in the worst case, where \( n \) is the number of elements in the heap.

### Deletion in a Heap

- **Process**:
  1. Remove the root element (which is the maximum or minimum depending on the type of heap).
  2. Replace the root with the last element in the heap.
  3. Compare the new root with its children and swap if necessary to maintain the heap property.
  4. Continue this process until the heap property is satisfied.
- **Time Complexity**: \( O(\log n) \) in the worst case.

### Heap Sort

- **Process**:
  1. Create a max heap from the given array.
  2. Remove the root element (maximum) and place it at the end of the array.
  3. Repeat step 2 until the heap is empty, resulting in a sorted array.
- **Time Complexity**: \( O(n \log n) \) for both best and worst cases.

### Heapify

- **Process**: A method to create a heap from an array by starting from the last non-leaf node and moving upwards, ensuring the heap property at each step.
- **Time Complexity**: \( O(n) \) for creating a heap using heapify.

### Priority Queues

- **Definition**: A data structure where elements are ordered based on priority.
- **Implementation**: Heaps are ideal for implementing priority queues, offering \( O(\log n) \) time for insertion and deletion.