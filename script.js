// Balanced Binary Search Tree TOP Lesson

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
    // this.root = null;
    this.root = this.buildTree(
      this.filteredArray,
      0,
      this.filteredArray.length - 1
    );
  }

  sortArray(array) {
    // let sortedArray = array.slice().sort((a, b) => a - b);
    // let filteredArray = [];
    // for (let i = 0; i < sortedArray.length; i++) {
    //   filteredArray.push(sortedArray[i]);
    //   if (sortedArray[i] === sortedArray[i + 1]) {
    //     i++;
    //   }
    // }
    // console.log("SortArray: filteredArray", filteredArray);
    // return filteredArray; // updates constructor filteredArray data
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

  // insertItem(value, root) {
  insertItem(value, root = this.root) {
    if (root === null) {
      console.log("InsertItem: inserted", value);
      return new Node(value);
    }
    // if (value < root.data) {
    //   root.left = this.insertItem(value, root.left);
    // } else {
    //   root.right = this.insertItem(value, root.right);
    // }
    // return root;
    return value < root.data
      ? (root.left = this.insertItem(value, root.left))
      : this.insertItem(value, root.right);
  }

  //deleteItem(value, root) {
  deleteItem(value, root = this.root) {
    if (root === null) {
      console.log("DeleteItem: notFound", value);
      return null; //advises recursion this is the end of the line.
    }

    if (value < root.data) {
      // if (value < root) {  // root is a node object, not a primitive value like data or key.
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left === null) {
        console.log("DeleteItem: deleted");
        return root.right;
      } else if (root.right === null) {
        console.log("DeleteItem: deleted");
        return root.left;
      }
      root.data = this.smallestNode(root.right).data;
      root.right = this.deleteItem(root.data, root.right);
    }
    return root;
  }

  smallestNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // findItem(value, root) {
  findItem(value, root = this.root) {
    if (root === null) {
      console.log("findItem: notFound", value);
      return null;
    }

    if (value === root.data) {
      console.log("findItem: found", value);
      return root;
    }
    // if (value < root.data) {
    //   return this.findItem(value, root.left);
    // } else {
    //   return this.findItem(value, root.right);
    // }
    return value < root.data
      ? this.findItem(value, root.left)
      : this.findItem(value, root.right);
  }

  levelOrder(callBack, root = this.root) {
    //build a version that iterates and one that recurses
    let queue = [];
    let result = [];

    if (root === null) return null;

    //find callBack node if provided
    let foundItem = callBack ? this.findItem(callBack, root) : root;

    if (foundItem === null) {
      console.log("LevelOrderFindItem: not found", callBack);
      return result;
    }

    queue.push(foundItem);

    // //***^^^iteration version^^^***
    // //begin level order traversal at callBack or root as provided
    // while (queue.length > 0) {
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

    //***recursive version***/

    let current = queue.shift();
    result.push(current);
    if (current.left) {
      queue.push(current.left);
    }
    if (current.right) {
      queue.push(current.right);
    }
     console.log(
      "LevelOrderFinal:",
      result.map((node) => node.data.toString()).join(", ")
    );
    return this.levelOrder(current, root);
  }

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  isBalanced() {}

  reBalance() {
    let tempArray = [];
  }
}

//insert prettyPrint function from lesson for console.log visualization

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
myTree.insertItem(69, myTree.root);
prettyPrint(myTree.root);
myTree.findItem(23, myTree.root);
myTree.findItem(13, myTree.root);
myTree.deleteItem(13, myTree.root);
myTree.deleteItem(23, myTree.root);
prettyPrint(myTree.root);
myTree.deleteItem(67, myTree.root); //calls node.right w/ child
myTree.deleteItem(4, myTree.root); //calls node.left w/ child
prettyPrint(myTree.root);
// myTree.levelOrder(null, myTree.root);
myTree.levelOrder(69, myTree.root);
// myTree.levelOrder(6, myTree.root);
