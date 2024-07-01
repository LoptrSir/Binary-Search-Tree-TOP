// inOrder Traversing example
// https://www.geeksforgeeks.org/binary-search-tree-traversal-inorder-preorder-post-order/?ref=lbp

class Node {
  constructor(v) {
    this.left = null;
    this.right = null;
    this.data = v;
  }
}

// Inorder Traversal
function printInorder(root) {
  if (root) {
    //base condition? can replace if <(root === null) return null>?
    // Traverse left subtree
    printInorder(root.left);

    // Visit node
    console.log(root.data);

    // Traverse right subtree
    printInorder(root.right);
  }
}
// Driver code
if (true) {
  // Build the tree
  let root = new Node(100);
  root.left = new Node(20);
  root.right = new Node(200);
  root.left.left = new Node(10);
  root.left.right = new Node(30);
  root.right.left = new Node(150);
  root.right.right = new Node(300);
  root.left.left.left = new Node(11);
  root.left.left.left.left = new Node(12);
  root.left.left.right = new Node(13);
  root.left.left.left.left.left = new Node(14);
  root.left.left.left.left.left.right = new Node(15);

  // Function call
  console.log("Inorder Traversal:");
  printInorder(root);
}

