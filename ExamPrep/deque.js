import DynamicArray from "../Data Structure Array/dynamicArray.js"
class Deque {
  #arr;
  #front;
  #size;

  constructor(capacity = 8) {
    if(capacity <= 2) throw new Error("capacity must be at least 2");
    if(!Number.isInteger(capacity)) throw new Error("capacity must be integer");
    this.#arr = new DynamicArray(capacity);
    this.#front = 0;
    this.#size = 0;

    // Must allocate internal circular buffer of given capacity
    // Capacity must be >= 2, otherwise throw Error
    // Must initialize:
    //   front = 0
    //   size = 0
    // Buffer may contain garbage or placeholder values
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
    // Must return number of stored elements
  }

  capacity() {
    return this.#arr.capacity;
    // Must return internal buffer capacity
  }

  empty() {
    return this.#size === 0
    // Must return true if size === 0
  }

  full() {
    return this.capacity() === this.#size
    // Must return true if size === capacity
  }

  /* ================= Internal Helpers ================= */

  #mod(i) {
    let cap = this.capacity();
    return ((i + cap) % cap) % cap;
    // Must convert index to circular buffer index
    // Must correctly handle negative indices
    // Result must be in range [0, capacity-1]
  }

  #index(i) {
    return this.#mod(this.#front + i)
    // Must convert logical index → physical index
    // Logical index:
    //   0 = front element
    //   size-1 = back element
  }

  #ensureCapacityForOneMore() {
    if(this.#size < this.capacity) return;
    if(this.#size === this.capacity) {
        let newBuffer = new DynamicArray(this.capacity * 2);
        for(let i = 0;i < this.#size;i++){
            newBuffer[i] = this.#arr[this.#index(i)];
        }
    }
    this.#arr = newBuffer;
    this.#front = 0;
    // If size < capacity → do nothing
    // If size === capacity:
    //   Allocate new buffer with capacity * 2
    //   Copy elements in logical order
    //   Reset front to 0
  }

  /* ================= Element Access ================= */

  front() {
    if(this.empty()) throw new Error("array is empty");
    return this.#arr[this.#front];
    // If empty → throw Error
    // Must return first element
  }

  back() {
    return this.#arr[this.#index(this.#size - 1)]
    // If empty → throw Error
    // Must return last element
  }


  at(i) {
    if(i < 0 || i >= this.#size) throw new Error("invalid index")
    return this.#arr[this.#index(i)];
    // If i invalid → throw Error
    // Must return element at logical index i
  }

  /* ================= Modifiers ================= */

  push_back(value) {
    this.#ensureCapacityForOneMore();
    let idx = this.#index(this.#size);
    this.#arr[idx] = value;

    this.#size++;
    // Must ensure capacity [null,2,null,4,5]
     // Must insert value after last element
    // Must increase size
  }

  push_front(value) {
    this.#ensureCapacityForOneMore();
    this.#front = this.#mod(this.#front - 1)
    this.#arr[this.#front] = value;
    this.#size++;
    // Must ensure capacity
    // Must move front backward circularly
    // Must insert value at new front
    // Must increase size
  }

  pop_front() {
    if(this.empty()) throw new Error("array is empty");
    const value = this.#arr[this.#front];
    this.#arr[this.#front] = null;
    this.#front = this.#mod(this.#front + 1)
    this.#size--;
    return value;
    // If empty → throw Error
    // Must remove front element
    // Must move front forward circularly
    // Must decrease size
    // Must return removed value
  }

  pop_back() {
    if(this.empty()) throw new Error("array is empty");
    const idx = this.#index(this.#size - 1);
    const value = this.#arr[idx];
    this.#arr[idx] = null;
    this.#size--
    return value;
    // If empty → throw Error
    // Must remove last element
    // Must decrease size
    // Must return removed value
  }

  clear() {
    this.#size = 0;
    this.#front = 0
    // Must reset deque to empty state
    // Must keep current capacity
    // Must reset front to 0
    // Must set size to 0
  }

  /* ================= Extended Professional Methods ================= */

  reserve(newCapacity) {
    if(newCapacity <= this.capacity) return;
    let newBuffer = new DynamicArray(newCapacity);
    for(let i = 0;i < this.#size;i++){
        newBuffer[i] = this.#arr[this.#index(i)];
    }

    this.#arr = newBuffer;
    this.#front = 0;
    // If newCapacity <= current capacity → do nothing
    // Else:
    //   Allocate new buffer
    //   Copy elements in logical order
    //   Reset front to 0
  }

  shrinkToFit() {
    // if(this.#size === this.#cap){
    //     return;
    // }
    // const newBuffer = new Array(this.#size);
    // for(let i = 0;i < this.#size;i++){
    //     newBuffer[i] = this.#arr[this.#index(i)];
    // }
    // this.#arr = newBuffer;
    // // this.capa = this.#size;
    // this.#front = 0
    // // Must reduce capacity to size
    // // Must reallocate buffer
    // // Must preserve order
  }

  rotateLeft(k = 1) {
    // Must rotate deque left by k steps
    // Logical front shifts forward
    // Must work with k > size
  }

  rotateRight(k = 1) {
    // Must rotate deque right by k steps
    // Logical front shifts backward
  }

  swap(i, j) {
    if(i < 0 || i >= this.#size) throw new Error("i is invalid");
    if(j < 0 || j >= this.#size) throw new Error("j is invallid");
    [this.#arr[this.#index(i)],this.#arr[this.#index(j)]] = [this.#arr[this.#index(j)],this.#arr[this.#index(i)]]
    // If indices invalid → throw Error
    // Must swap logical elements
  }

  /* ================= Search & Utilities ================= */

  find(value) {
    for(let i = 0;i < this.#size;i++){
        if(this.#arr[this.#index(i)] === value){
            return this.#index(i);
        }
    }
    return -1
    // Must return first logical index of value
    // If not found → return -1
  }

  includes(value) {
    for(let i = 0;i < this.#size;i++){
        if(this.#arr[this.#index(i)] === value){
            return true
        }
    }
    return false;
    // Must return true if value exists
    // Otherwise false
  }

  toArray() {
    let res = [];
    for(let i = 0;i < this.#size;i++){
        res.push(this.#arr[this.#index(i)])
    }

    return res;
    // Must return normal JS array
    // Must preserve logical order
  }

  clone() {
    // Must return deep copy of deque
    // New instance must not share buffer
  }

  equals(otherDeque) {
    // Must return true if:
    // same size AND same logical values
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {

    // Must iterate from front → back
    // Must not expose internal buffer layout
  }

  values() {
    // Must return value iterator
  }

  keys() {
    // Must return iterator of logical indices 0 → size-1
  }

  entries() {
    // Must return iterator of [index, value]
  }

  /* ================= Functional Style ================= */

  forEach(fn) {
    // Must call fn(value, index, thisDeque)
  }

  map(fn) {
    // Must return new deque with mapped values
  }

  filter(fn) {
    // Must return new deque with filtered values
  }

  reduce(fn, initial) {
    // Must behave like Array.reduce
    // Must throw if empty and no initial value
  }
}