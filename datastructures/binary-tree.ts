export class TreeNode {
  public value: any;
  public left: TreeNode | null;
  public right: TreeNode | null;

  constructor(value: any) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  public root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  public insert(value: any): void {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;

    while (true) {
      if (value === currentNode.value) {
        return undefined;
      }

      if (currentNode.value < newNode.value) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return undefined;
        }

        currentNode = currentNode.right;
      } else {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return undefined;
        }

        currentNode = currentNode.left;
      }
    }
  }

  public find(): void {}

  public contains(): void {}

  public remove(): void {}

  public traverse(): void {}
}

const tree = new BinarySearchTree();

tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(16);
tree.insert(7);

