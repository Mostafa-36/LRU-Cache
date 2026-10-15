import DoublyLinkedList from "../src/DoublyLinkedList.js";
import CacheNode from "../src/CacheNode.js";

function getNodes(list) {
  const nodes = [];

  for (let node = list.head; node !== null; node = node.prev) {
    nodes.push(node);
  }

  return nodes;
}

function expectValidList(list) {
  const nodes = getNodes(list);

  expect(nodes).toHaveLength(list.getSize());

  if (nodes.length === 0) {
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    return;
  }

  expect(nodes[0]).toBe(list.head);
  expect(nodes[nodes.length - 1]).toBe(list.tail);

  expect(list.head.next).toBeNull();
  expect(list.tail.prev).toBeNull();

  for (const node of nodes) {
    if (node.prev !== null) {
      expect(node.prev.next).toBe(node);
    }

    if (node.next !== null) {
      expect(node.next.prev).toBe(node);
    }
  }
}

describe("DoublyLinkedList", () => {
  test("adds nodes to the front", () => {
    const list = new DoublyLinkedList();

    list.addToFront(new CacheNode("A", 10));
    list.addToFront(new CacheNode("B", 20));
    list.addToFront(new CacheNode("C", 30));

    expect(getNodes(list).map((node) => node.key)).toEqual(["C", "B", "A"]);

    expect(list.getSize()).toBe(3);
    expectValidList(list);
  });

  test("removes the last node", () => {
    const list = new DoublyLinkedList();
    const a = new CacheNode("A", 10);
    const b = new CacheNode("B", 20);
    const c = new CacheNode("C", 30);

    list.addToFront(a);
    list.addToFront(b);
    list.addToFront(c);

    expect(list.removeLast()).toBe(a);

    expect(getNodes(list).map((node) => node.key)).toEqual(["C", "B"]);

    expect(list.getSize()).toBe(2);
    expect(a.prev).toBeNull();
    expect(a.next).toBeNull();
    expectValidList(list);
  });

  test("removes the head", () => {
    const list = new DoublyLinkedList();
    const a = new CacheNode("A", 10);
    const b = new CacheNode("B", 20);
    const c = new CacheNode("C", 30);

    list.addToFront(a);
    list.addToFront(b);
    list.addToFront(c);

    expect(list.removeNode(c)).toBe(c);

    expect(getNodes(list).map((node) => node.key)).toEqual(["B", "A"]);

    expect(list.getSize()).toBe(2);
    expectValidList(list);
  });

  test("removes a middle node", () => {
    const list = new DoublyLinkedList();
    const a = new CacheNode("A", 10);
    const b = new CacheNode("B", 20);
    const c = new CacheNode("C", 30);

    list.addToFront(a);
    list.addToFront(b);
    list.addToFront(c);

    expect(list.removeNode(b)).toBe(b);

    expect(getNodes(list).map((node) => node.key)).toEqual(["C", "A"]);

    expect(b.prev).toBeNull();
    expect(b.next).toBeNull();
    expect(list.getSize()).toBe(2);
    expectValidList(list);
  });

  test("removes the only node", () => {
    const list = new DoublyLinkedList();
    const a = new CacheNode("A", 10);

    list.addToFront(a);

    expect(list.removeNode(a)).toBe(a);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.getSize()).toBe(0);
    expectValidList(list);
  });

  test("moves a node to the front", () => {
    const list = new DoublyLinkedList();
    const a = new CacheNode("A", 10);
    const b = new CacheNode("B", 20);
    const c = new CacheNode("C", 30);

    list.addToFront(a);
    list.addToFront(b);
    list.addToFront(c);

    list.moveToFront(a);

    expect(getNodes(list).map((node) => node.key)).toEqual(["A", "C", "B"]);

    expect(list.getSize()).toBe(3);
    expectValidList(list);
  });

  test("handles removal from an empty list", () => {
    const list = new DoublyLinkedList();

    expect(list.removeLast()).toBeNull();
    expect(list.removeNode(null)).toBeNull();
    expect(list.getSize()).toBe(0);
    expectValidList(list);
  });

  test("clears the list and allows reuse", () => {
    const list = new DoublyLinkedList();

    list.addToFront(new CacheNode("A", 10));
    list.addToFront(new CacheNode("B", 20));

    list.clear();

    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.getSize()).toBe(0);
    expectValidList(list);

    list.addToFront(new CacheNode("C", 30));

    expect(getNodes(list).map((node) => node.key)).toEqual(["C"]);

    expectValidList(list);
  });
});
