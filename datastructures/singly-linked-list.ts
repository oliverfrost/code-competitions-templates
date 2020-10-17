export class Node {
  public value: any;
  public next: any;

  constructor(v: any) {
    this.value = v;
    this.next = null;
  }
}

/**
 * Example:
 * const list = new SinglyLinkedList();
 * list.push(100);
 */
export class SinglyLinkedList {
  public head: Node | null;
  public tail: Node | null;
  public length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  public push(value: any): SinglyLinkedList {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  public pop(): Node | undefined {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  public shift(): Node | undefined {
    if (!this.head) return undefined;
    const currentHead = this.head;

    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }

    return currentHead;
  }

  public unshift(value: any): SinglyLinkedList {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    }
    newNode.next = this.head;
    this.head = newNode;
    this.length++;

    return this;
  }

  public get(index: number): Node | null {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;

    while (counter !== index) {
      current = current!.next;
      counter++;
    }
    return current;
  }

  public set(index: number, value: any): boolean {
    const foundNode = this.get(index);

    if (foundNode) {
      foundNode.value = value;
      return true;
    }
    return false;
  }

  public insert(index: number, value: any) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(value);
    if (index === 0) return !!this.unshift(value);

    const newNode = new Node(value);
    const prev = this.get(index - 1);
    const temp = prev!.next;
    prev!.next = newNode;
    newNode.next = temp;
    this.length++;

    return true;
  }

  public remove(index: number): Node | undefined {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const previousNode = this.get(index - 1);
    const removed = previousNode!.next;
    previousNode!.next = removed.next;
    this.length--;

    return removed;
  }

  public reverse(): SinglyLinkedList {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = node!.next;
      node!.next = prev;
      prev = node;
      node = next;
    }

    return this;
  }

  public print(): void {
    const arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    console.log(arr);
  }
}
