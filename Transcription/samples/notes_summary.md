**Study Notes: Binary Tree Traversals**

---

### **1. Tree Traversal Basics**
- **Purpose**: Systematically visit every node in a binary tree.
- **Types**:  
  - **Pre-order**: Node → Left subtree → Right subtree.  
  - **In-order**: Left subtree → Node → Right subtree.  
  - **Post-order**: Left subtree → Right subtree → Node.  

---

### **2. Key Concepts**
- **Recursion & Call Stack**:  
  - Each traversal uses recursion to process subtrees.  
  - The call stack manages the order of operations (e.g., visiting a node before/after subtrees).  
- **Order of Operations**:  
  - The terms "pre," "in," and "post" determine **when the current node is visited** relative to its subtrees.  

---

### **3. Traversal Details**
#### **Pre-order Traversal**  
- **Order**: **Root first**, then left, then right.  
- **Process**:  
  1. Visit the current node.  
  2. Recursively traverse the left subtree.  
  3. Recursively traverse the right subtree.  
- **Example Sequence**: 10 → 7 → 6 → 1 → 8 → 9 → 11 → 20 → 22.  

#### **In-order Traversal**  
- **Order**: **Left first**, then root, then right.  
- **Process**:  
  1. Recursively traverse the left subtree.  
  2. Visit the current node.  
  3. Recursively traverse the right subtree.  
- **Example Sequence**: 1 → 6 → 7 → 8 → 9 → 10 → 11 → 14 → 20 → 22.  

#### **Post-order Traversal**  
- **Order**: **Root last**, after left and right subtrees.  
- **Process**:  
  1. Recursively traverse the left subtree.  
  2. Recursively traverse the right subtree.  
  3. Visit the current node.  
- **Example Sequence**: 1 → 6 → 8 → 9 → 7 → 14 → 22 → 20 → 11 → 10.  

---

### **4. Recursion & Stack Behavior**  
- Each recursive call creates a **stack frame** tracking:  
  - The current node.  
  - Tasks to complete (e.g., visit node, process left/right subtrees).  
- **Example**:  
  - In pre-order, the node is printed before recursing to left/right.  
  - In post-order, the node is printed after both subtrees are processed.  

---

### **5. Key Takeaways**  
- **Pre-order**: Useful for creating copies of trees.  
- **In-order**: Returns nodes in sorted order for binary search trees (BSTs).  
- **Post-order**: Used to delete nodes safely (children first).  
- **Recursion Simplifies Traversal**: Each node follows the same policy, relying on the call stack to manage state.  

--- 

**Visual Tip**: Imagine traversing the tree by always prioritizing left subtrees first. The difference lies in **when you "visit" the root node** (before, between, or after subtrees).