### Binary Tree Fundamentals Study Notes

---

#### **Tree Types**
1. **Full Binary Tree**  
   - Every node has **0 or 2 children** (no nodes with 1 child).  
   - Example:  
     ```
        10
       /  \
      7    11
     / \  
    6   8
    ```

2. **Complete Binary Tree**  
   - Nodes are filled **top to bottom**, **left to right** (used in binary heaps).  
   - Missing nodes can only be on the last level, filled from the left.  
   - Example:  

     ```
        10
       /  \
      7    11
     / \   /
    6   8 20
    ```
3. **Perfect Binary Tree**  
   - **All leaves are at the same level**, and every non-leaf node has **2 children**.  
   - Combines properties of **full** and **complete** trees.  
   - Example:  
     ```
        10
       /  \
      7    11
     / \  / \
    6  8 20 22
    ```
---

#### **Tree Traversal Methods**
Traversal order depends on **when the current node is visited** relative to its children.  

| Traversal   | Order          | Mnemonic       |
|-------------|----------------|----------------|
| **Pre-order**  | Node → Left → Right | **P**rint before subtrees |
| **In-order**   | Left → Node → Right | **I**n the middle         |
| **Post-order** | Left → Right → Node | **P**rint after subtrees |

---

#### **Examples**
**Tree Structure**:  
```
      10
     /  \
    7    11
   / \    \
  6   8    20
 /    \   / \
1      9 14 22
```

1. **Pre-order Traversal**  
   - **Order**: 10 → 7 → 6 → 1 → 8 → 9 → 11 → 20 → 14 → 22  
   - Process node **before** left/right subtrees.

2. **In-order Traversal**  
   - **Order**: 1 → 6 → 7 → 8 → 9 → 10 → 11 → 14 → 20 → 22  
   - Nodes are visited in **ascending order** for BSTs.

3. **Post-order Traversal**  
   - **Order**: 1 → 6 → 9 → 8 → 7 → 14 → 22 → 20 → 11 → 10  
   - Process node **after** left/right subtrees.

---

#### **Key Concepts**
- **Recursion**: Each stack frame follows the traversal policy (pre/in/post). State is maintained via the call stack.  
- **Iterative Approach**: Use an explicit stack to mimic recursion (not covered in-depth here).  
- **Time Complexity**: **O(n)** for all traversals (each node is visited once).  
- **Binary Search Tree (BST)**: In-order traversal yields sorted values.  

---

#### **Applications**
- **Pre-order**: Copying trees, serialization.  
- **In-order**: BST validation, sorted output.  
- **Post-order**: Deleting nodes, expression evaluation.  

---

**Summary**: Mastery of tree types and traversal policies (pre/in/post-order) is foundational for solving tree-based problems in coding interviews. Practice implementing these recursively and iteratively! 🌳