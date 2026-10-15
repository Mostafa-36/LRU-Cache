export default class CacheNode {
  constructor(key, val) {
    this.val = val;
    this.next = null;
    this.prev = null;
    this.key = key;
  }
}
