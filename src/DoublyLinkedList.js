export default class DoublyLinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  addToFront(node) {
    if (!node) return;

    node.prev = this.head;
    node.next = null;

    if (this.head) {
      this.head.next = node;
    } else {
      this.tail = node;
    }

    this.head = node;
    this.size++;
  }

  removeNode(node) {
    if (!node || this.size === 0) return null;

    if (node === this.tail) {
      return this.removeLast();
    }

    if (node === this.head) {
      this.head = node.prev;

      if (this.head) {
        this.head.next = null;
      }
    } else {
      const prevNode = node.prev;
      const nextNode = node.next;

      if (prevNode) {
        prevNode.next = nextNode;
      }

      if (nextNode) {
        nextNode.prev = prevNode;
      }
    }

    node.prev = null;
    node.next = null;
    this.size--;

    return node;
  }

  moveToFront(node) {
    if (!node || node === this.head) return;

    const removedNode = this.removeNode(node);

    if (removedNode) {
      this.addToFront(removedNode);
    }
  }

  removeLast() {
    const lastNode = this.tail;

    if (!lastNode) return null;

    this.tail = lastNode.next;

    if (this.tail) {
      this.tail.prev = null;
    } else {
      this.head = null;
    }

    lastNode.prev = null;
    lastNode.next = null;
    this.size--;

    return lastNode;
  }

  getSize() {
    return this.size;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  traverse() {
    const items = [];

    for (let node = this.head; node !== null; node = node.prev) {
      items.push(node.val);
    }

    console.log(items.join(" -> "));
  }
}
