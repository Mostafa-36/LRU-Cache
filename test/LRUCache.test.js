import LRUCache from "../src/LRUCache.js";

function getKeys(cache) {
  const keys = [];

  for (
    let node = cache.doubleLinkedList.head;
    node !== null;
    node = node.prev
  ) {
    keys.push(node.key);
  }

  return keys;
}

function expectValidCache(cache) {
  const list = cache.doubleLinkedList;
  const keys = getKeys(cache);

  expect(cache.map.size).toBe(list.getSize());
  expect(list.getSize()).toBeLessThanOrEqual(cache.capacity);
  expect(new Set(keys).size).toBe(keys.length);

  for (const key of keys) {
    expect(cache.map.has(key)).toBe(true);
    expect(cache.map.get(key).key).toBe(key);
  }

  if (keys.length === 0) {
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    return;
  }

  expect(list.head.next).toBeNull();
  expect(list.tail.prev).toBeNull();

  for (let node = list.head; node !== null; node = node.prev) {
    if (node.prev !== null) {
      expect(node.prev.next).toBe(node);
    }

    if (node.next !== null) {
      expect(node.next.prev).toBe(node);
    }
  }
}

describe("LRUCache", () => {
  test("stores and retrieves values", () => {
    const cache = new LRUCache(3);

    cache.put("A", 10);
    cache.put("B", 20);

    expect(cache.get("A")).toBe(10);
    expect(cache.get("B")).toBe(20);
    expectValidCache(cache);
  });

  test("returns -1 for a missing key", () => {
    const cache = new LRUCache(2);

    expect(cache.get("missing")).toBe(-1);
    expectValidCache(cache);
  });

  test("get makes a key most recently used", () => {
    const cache = new LRUCache(3);

    cache.put("A", 10);
    cache.put("B", 20);
    cache.put("C", 30);

    expect(cache.get("B")).toBe(20);
    expect(getKeys(cache)).toEqual(["B", "C", "A"]);

    expectValidCache(cache);
  });

  test("evicts the least recently used key", () => {
    const cache = new LRUCache(3);

    cache.put("A", 10);
    cache.put("B", 20);
    cache.put("C", 30);

    cache.get("B");
    cache.put("D", 40);

    expect(cache.get("A")).toBe(-1);
    expect(cache.get("B")).toBe(20);
    expect(cache.get("C")).toBe(30);
    expect(cache.get("D")).toBe(40);

    expect(getKeys(cache)).toEqual(["D", "C", "B"]);
    expectValidCache(cache);
  });

  test("updates an existing key without increasing size", () => {
    const cache = new LRUCache(2);

    cache.put("A", 10);
    cache.put("B", 20);
    cache.put("A", 100);

    expect(cache.get("A")).toBe(100);
    expect(cache.doubleLinkedList.getSize()).toBe(2);
    expect(getKeys(cache)).toEqual(["A", "B"]);

    expectValidCache(cache);
  });

  test("updating a key does not evict another key", () => {
    const cache = new LRUCache(2);

    cache.put("A", 10);
    cache.put("B", 20);
    cache.put("A", 100);

    expect(cache.map.has("B")).toBe(true);
    expect(cache.get("B")).toBe(20);
    expectValidCache(cache);
  });

  test("capacity one keeps only the latest entry", () => {
    const cache = new LRUCache(1);

    cache.put("A", 10);
    cache.put("B", 20);

    expect(cache.get("A")).toBe(-1);
    expect(cache.get("B")).toBe(20);
    expect(cache.doubleLinkedList.getSize()).toBe(1);

    expectValidCache(cache);
  });

  test.each([0, -1, -5])(
    "does not store entries with capacity %i",
    (capacity) => {
      const cache = new LRUCache(capacity);

      cache.put("A", 10);

      expect(cache.get("A")).toBe(-1);
      expect(cache.map.size).toBe(0);
      expectValidCache(cache);
    },
  );

  test("deletes an existing key", () => {
    const cache = new LRUCache(3);

    cache.put("A", 10);
    cache.put("B", 20);
    cache.put("C", 30);

    const deletedNode = cache.delete("B");

    expect(deletedNode.key).toBe("B");
    expect(cache.map.has("B")).toBe(false);
    expect(cache.get("B")).toBe(-1);
    expect(cache.doubleLinkedList.getSize()).toBe(2);

    expectValidCache(cache);
  });

  test("deleting a missing key changes nothing", () => {
    const cache = new LRUCache(2);

    cache.put("A", 10);

    expect(cache.delete("missing")).toBeUndefined();
    expect(getKeys(cache)).toEqual(["A"]);

    expectValidCache(cache);
  });

  test("clear empties the cache and allows reuse", () => {
    const cache = new LRUCache(2);

    cache.put("A", 10);
    cache.put("B", 20);
    cache.clear();

    expect(cache.map.size).toBe(0);
    expect(cache.doubleLinkedList.getSize()).toBe(0);
    expect(cache.get("A")).toBe(-1);

    expectValidCache(cache);

    cache.put("X", 100);

    expect(cache.get("X")).toBe(100);
    expectValidCache(cache);
  });

  test("stores zero and null values", () => {
    const cache = new LRUCache(2);

    cache.put("zero", 0);
    cache.put("null", null);

    expect(cache.get("zero")).toBe(0);
    expect(cache.get("null")).toBeNull();

    expectValidCache(cache);
  });

  test("documents the ambiguity of a stored value -1", () => {
    const cache = new LRUCache(2);

    cache.put("negative", -1);

    expect(cache.get("negative")).toBe(-1);
    expect(cache.map.has("negative")).toBe(true);
    expect(cache.map.has("missing")).toBe(false);

    expectValidCache(cache);
  });
});
