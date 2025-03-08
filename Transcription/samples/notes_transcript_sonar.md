## Study Notes: Binary Tree Fundamentals

### Introduction to Binary Trees

- **Definition**: A binary tree is a data structure where each node can have at most two children, referred to as the left child and the right child[5].
- **Key Terms**:
  - **Root Node**: The topmost node with no parent.
  - **Leaf Nodes**: The bottommost nodes with no children.
  - **Parent Node**: A node that has child nodes.
  - **Child Nodes**: Nodes directly connected below a parent node.

### Types of Binary Trees

1. **Full Binary Tree**:
   - Every node has either 0 or 2 children.
   - No node can have just one child[1].

2. **Complete Binary Tree**:
   - All levels are full except possibly the last level, which is filled from left to right[1].

3. **Perfect Binary Tree**:
   - All levels are full, and all leaf nodes are at the same level.
   - It is both full and complete[1].

4. **Binary Search Tree (BST)**:
   - For each node, all elements in its left subtree are less than the node, and all elements in its right subtree are greater than the node[3].

### Binary Tree Traversals

1. **Pre-order Traversal**:
   - Visit the current node.
   - Traverse the left subtree.
   - Traverse the right subtree[5].

2. **In-order Traversal**:
   - Traverse the left subtree.
   - Visit the current node.
   - Traverse the right subtree[5].

3. **Post-order Traversal**:
   - Traverse the left subtree.
   - Traverse the right subtree.
   - Visit the current node[5].

### Recursion in Binary Trees

- Recursion involves executing a policy at each node, which can include visiting the node and traversing its subtrees.
- The state of each node (e.g., whether it has children) determines the actions taken during recursion[5].

### Time Complexity of Traversals

- All three traversals (pre-order, in-order, post-order) have a time complexity of O(N), where N is the number of nodes in the tree, because each node is visited once[5].