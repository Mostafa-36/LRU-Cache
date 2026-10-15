import DoublyLinkedList from "./DoublyLinkedList.js";
import CacheNode from "./CacheNode.js";

export default class LRUCache {
  constructor(capacity) {
    this.capacity = capacity > 0 ? capacity : 0;
    this.doubleLinkedList = new DoublyLinkedList(capacity);
    this.map = new Map();
  }

  get(key) {
    let node = this.map.get(key);

    if (node) {
      this.doubleLinkedList.moveToFront(node);
      return node.val;
    }

    return -1;
  }

  put(key, value) {
    let node = this.map.get(key);
    if (node) {
      node.val = value;
      this.doubleLinkedList.moveToFront(node);
    } else {
      if (this.capacity <= 0) return;

      if (this.capacity <= this.doubleLinkedList.getSize()) {
        const removedNode = this.doubleLinkedList.removeLast();

        if (removedNode) {
          this.map.delete(removedNode.key);
        }
      }

      node = new CacheNode(key, value);
      this.doubleLinkedList.addToFront(node);
    }

    this.map.set(key, node);
  }

  delete(key) {
    let node = this.map.get(key);

    if (!node) return;

    let deletedNode = this.doubleLinkedList.removeNode(node);

    this.map.delete(key);

    return deletedNode;
  }

  clear() {
    this.doubleLinkedList.clear();
    this.map.clear();
  }

  show() {
    this.doubleLinkedList.traverse();
  }
}
