//preOrder Trversing example
// https://www.geeksforgeeks.org/binary-search-tree-traversal-inorder-preorder-post-order/?ref=lbp


class Node {
    constructor(v) {
      this.data = v;
      this.left = this.right = null;
    }
  }
   
  function printPreOrder(node) {
    if (node == null) return;
   
    console.log(node.data + " ");
   
    printPreOrder(node.left);
    printPreOrder(node.right);
  }
   
  // Build the tree
  let root = new Node(100);
  root.left = new Node(20);
  root.right = new Node(200);
  root.left.left = new Node(10);
  root.left.right = new Node(30);
  root.right.left = new Node(150);
  root.right.right = new Node(300);
   
  console.log("Preorder Traversal: ");
  printPreOrder(root);