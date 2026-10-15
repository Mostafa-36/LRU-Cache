import LRUCache from "./LRUCache.js";

const cache = new LRUCache(3);

cache.put("A", 10);
cache.put("B", 20);
cache.put("C", 30);

console.log("After adding A, B, C:");
cache.show();

console.log("\nGet B:", cache.get("B"));
console.log("After getting B:");
cache.show();

cache.put("D", 40);

console.log("\nAfter adding D:");
cache.show();

console.log("\nGet A:", cache.get("A"));

cache.put("D", 400);

console.log("\nAfter updating D:");
cache.show();

cache.delete("B");

console.log("\nAfter deleting B:");
cache.show();

console.log("\nCurrent size:", cache.doubleLinkedList.getSize());

console.log("\nGet X:", cache.get("X"));

cache.clear();

console.log("\nAfter clear:");
cache.show();

console.log("Current size:", cache.doubleLinkedList.getSize());

cache.put("X", 100);
cache.put("Y", 200);

console.log("\nAfter adding X and Y:");
cache.show();
