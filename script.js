// Balanced Binary Search Tree TOP Lesson

//Move foundItem to its own function then call it within relevant functions.

//BST.js

class Node {
  constructor(data) {
    this.left = null;
    this.right = null;
    this.data = data;
  }
}

class Tree {
  constructor(array) {
    this.filteredArray = this.sortArray(array);
    this.root = this.buildTree(
      this.filteredArray,
      0,
      this.filteredArray.length - 1
    );
  }

  sortArray(array) {
    let sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return sortedArray;
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2, 10);
    let node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }

  insertItem(root = this.root, value) {
    if (root === null) {
      console.log("InsertItem: inserted", value);
      return new Node(value);
    }
    return value < root.data
      ? (root.left = this.insertItem(root.left, value))
      : this.insertItem(root.right, value);
  }

  deleteItem(root = this.root, value) {
    if (root === null) {
      console.log("DeleteItem: notFound", value);
      return null; //advises recursion this is the end of the line.
    }

    if (value < root.data) {
      root.left = this.deleteItem(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteItem(root.right, value);
    } else {
      if (root.left === null) {
        console.log("DeleteItem: deleted");
        return root.right;
      } else if (root.right === null) {
        console.log("DeleteItem: deleted");
        return root.left;
      }
      root.data = this.smallestNode(root.right).data;
      root.right = this.deleteItem(root.right, root.data);
    }
    return root;
  }

  smallestNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  findItem(root = this.root, value) {
    if (root === null) {
      console.log("findItem: notFound", value);
      return null;
    }

    if (value === root.data) {
      console.log("findItem: found", value);
      return root;
    }
    return value < root.data
      ? this.findItem(root.left, value)
      : this.findItem(root.right, value);
  }

  foundItem(root, callBack) {}

  levelOrder(root = this.root, callBack) {
    //###2 versions: iteration and recursion###
    let queue = [];
    let result = [];

    let foundItem = callBack ? this.findItem(root, callBack) : root;
    if (foundItem === null) {
      console.log("LevelOrderFindItem: not found", callBack);
      return null;
    }
    queue.push(foundItem);

    //  //***^^^iteration version^^^***
    // //begin level order traversal at callBack or root as provided
    // while (queue.length > 0) {
    //   // current = queue.shift();
    //   let current = queue.shift();
    //   result.push(current);
    //   if (current.left) {
    //     queue.push(current.left);
    //   }
    //   if (current.right) {
    //     queue.push(current.right);
    //   }
    // }
    // console.log(
    //   "LevelOrderFinal:",
    //   result.map((node) => node.data.toString()).join(", ")
    // );
    // return result;

    //   //^^^***recursive version***^^^/
    const traverse = () => {
      if (queue.length === 0) return result;
      let current = queue.shift();
      //console.log("LevelOrderTraverseCurrent1:", current);
      result.push(current);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
      console.log("LevelOrderQueue.length:", queue.length);
      traverse();
    };
    traverse();
    console.log(
      `LevelOrderFinal:"Queue ${queue
        .map((node) => node.data.toString())
        .join(", ")} Result 
      ${result.map((node) => node.data.toString()).join(", ")}`
    );
    return result;
  }

  inOrder(root = this.root, callBack) {
    //traverse left, visit/print root, traverse right
    let inOrderArray = [];
    let foundItem = callBack ? this.findItem(root, callBack) : root;
    if (!foundItem) {
      console.log("InOrderItem: not found", callBack);
      return null;
    }

    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      inOrderArray.push(node);
      traverse(node.right);
    };
    traverse(foundItem);
    console.log(
      `InOrder Result ${inOrderArray
        .map((node) => node.data.toString())
        .join(", ")}`
    );
    return inOrderArray; //makes inOrderArray accessible outside this function.
  }

  preOrder(root = this.root, callBack) {
    //visit/print root, traverse left, traverse right
    let preOrderArray = [];
    let foundItem = callBack ? this.findItem(root, callBack) : root;
    if (!foundItem) {
      console.log("PreOrderItem: not found", callBack);
      return null;
    }
    const traverse = (node) => {
      if (!node) return;
      preOrderArray.push(node);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(foundItem);
    console.log(
      `PreOrder Result ${preOrderArray
        .map((node) => node.data.toString())
        .join(", ")}`
    );
    return preOrderArray; //makes inOrderArray accessible outside this function.
  }

  postOrder(root = this.root, callBack) {
    //traverse left, traverse right, visit/print root
    let postOrderArray = [];
    let foundItem = callBack ? this.findItem(root, callBack) : root;

    if (!foundItem) {
      console.log("PostOrderItem: not found", callBack);
      return null; 
    }
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      postOrderArray.push(node);
    };
    traverse(foundItem);
    console.log(
      `PostOrder Result ${postOrderArray
        .map((node) => node.data.toString())
        .join(", ")}`
    );
    return postOrderArray; //makes inOrderArray accessible outside this function.
  }

  heightIteration(root = this.root, callBack) {
    //returns number of nodes from root/callBack to furthest leaf.
    const foundItem = callBack ? this.findItem(root, callBack) : root;
    if (!foundItem) {
      console.log("heightIteration: item not found", callBack);
      return 0;
    }
    let height = 0;
    let queue = [foundItem];

    while (queue.length > 0) {
      let levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        let node = queue.shift();
        if (node.left) queue.push(node.left);

        if (node.right) queue.push(node.right);
      }
      height++;
    }
    console.log(`HeightIteration is: ${height}`);
    return height;
  }

  heightRecursion(root = this.root, callBack) {
    //returns number of nodes from root/callBack to furthest leaf.
    let foundItem = callBack ? this.findItem(root, callBack) : root;
    if (!foundItem) {
      console.log("PostOrderItem: not found", callBack);
      return 0;
    }

    const traverse = (node) => {
      if (!node) return 0;
      const leftHeight = traverse(node.left);
      const rightHeight = traverse(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };
    const height = traverse(foundItem);
    console.log("HeightRecursion is:", height);
    return height;
  }

  //isBalanced() {}

  // reBalance() {
  //   let tempArray = [];
  // }
}

//driver script to automate process see lesson for details

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export function myFooter() {
  const footer = document.querySelector(".footer");
  footer.style.backgroundColor = "#333";
  footer.style.fontSize = "1rem";
  footer.style.color = "#f8afe5";
  footer.style.padding = "3px";
  footer.style.textAlign = "center";
  footer.style.position = "fixed";
  footer.style.width = "100%";
  footer.style.bottom = "0";
  footer.innerHTML = "LoptrSir";
}
myFooter();

let bstSample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let myTree = new Tree(bstSample);

prettyPrint(myTree.root);
myTree.insertItem(myTree.root, 69);
prettyPrint(myTree.root);
myTree.findItem(myTree.root, 23);
myTree.findItem(myTree.root, 13);
myTree.deleteItem(myTree.root, 13);
myTree.deleteItem(myTree.root, 23);
myTree.deleteItem(myTree.root, 67); 
myTree.deleteItem(myTree.root, 4); 
prettyPrint(myTree.root);
myTree.levelOrder(myTree.root);
myTree.levelOrder(myTree.root, 69);
myTree.levelOrder(myTree.root, 6);
prettyPrint(myTree.root);
myTree.inOrder(myTree.root);
myTree.inOrder(myTree.root, 69);
myTree.inOrder(myTree.root, 4);
prettyPrint(myTree.root);
myTree.preOrder(myTree.root);
myTree.preOrder(myTree.root, 69);
myTree.preOrder(myTree.root, 4);
prettyPrint(myTree.root);
myTree.postOrder(myTree.root);
myTree.postOrder(myTree.root, 69);
myTree.postOrder(myTree.root, 4);
prettyPrint(myTree.root);
myTree.heightIteration(myTree.root);
myTree.heightIteration(myTree.root, 1);
myTree.heightRecursion(myTree.root);
myTree.heightRecursion(myTree.root, 1);
prettyPrint(myTree.root);
