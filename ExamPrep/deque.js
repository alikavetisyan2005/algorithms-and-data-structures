class Deque {
  #arr;
  #front;
  #size;
  #capacity;

  constructor(capacity = 8) {
    if(capacity <= 2) throw new Error("capacity must be at least 2");
    
    this.#capacity = capacity;
    this.#size = 0;
    this.#front = 0;
    this.#arr = new Array(capacity);
    // Must allocate internal circular buffer of given capacity
    // Capacity must be >= 2, otherwise throw Error
    // Must initialize:
    //   front = 0
    //   size = 0
    // Buffer may contain garbage or placeholder values
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size
    // Must return number of stored elements
  }

  capacity() {
    return this.#capacity
    // Must return internal buffer capacity
  }

  empty() {
    return this.#size === 0;
    // Must return true if size === 0
  }

  full() {
    return this.#size === this.#capacity;
    // Must return true if size === capacity
  }

  /* ================= Internal Helpers ================= */

  #mod(i) {
    return (i % this.#capacity + this.#capacity) % this.#capacity
    // Must convert index to circular buffer index
    // Must correctly handle negative indices
    // Result must be in range [0, capacity-1]
  }

  #index(i) {
    return this.#mod(this.#front + i);
    // Must convert logical index → physical index
    // Logical index:
    //   0 = front element
    //   size-1 = back element
  }

  #ensureCapacityForOneMore() {
    if(this.#size < this.#capacity)  return;

      let newArr = new Array(this.#capacity * 2);
      for(let i = 0;i < this.#size;i++){
        newArr[i] = this.#arr[this.#index(i)];
      }
      this.#arr = newArr;
      this.#front = 0;
      this.#capacity *= 2
      return;
    
    // If size < capacity → do nothing
    // If size === capacity:
    //   Allocate new buffer with capacity * 2
    //   Copy elements in logical order
    //   Reset front to 0
  }

  /* ================= Element Access ================= */

  front() {
    if(this.empty()) throw new Error("error");
    
    return this.#arr[this.#front];
    // If empty → throw Error
    // Must return first element
  }

  back() {
    if(this.empty()) throw new Error("error");
    
    return this.#arr[this.#index(this.#size - 1)]
    // If empty → throw Error
    // Must return last element
  }

  at(i) {
    if(i < 0 || i >= this.#size) throw new Error("");
    
    return this.#arr[this.#index(i)]
    // If i invalid → throw Error
    // Must return element at logical index i
  }

  /* ================= Modifiers ================= */

  push_back(value) {
    this.#ensureCapacityForOneMore();
    const idx = this.#index(this.#size);

    this.#arr[idx] = value;
    this.#size++
    

    // Must ensure capacity
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
    if(this.empty()) throw new Error("error");

    const value = this.#arr[this.#front];

    this.#front = this.#mod(this.#front + 1);
    this.#size--;
    return value;
    // If empty → throw Error
    // Must remove front element
    // Must move front forward circularly
    // Must decrease size
    // Must return removed value
  }

  pop_back() {
    if(this.empty()) throw new Error("error");
    
    let idx = this.#index(this.#size - 1);
    const value = this.#arr[idx];
    this.#size--

    return value;
    // If empty → throw Error
    // Must remove last element
    // Must decrease size
    // Must return removed value
  }

  clear() {
    this.#arr = new Array(this.#capacity);

    this.#front = 0;
    this.#size = 0;
    // Must reset deque to empty state
    // Must keep current capacity
    // Must reset front to 0
    // Must set size to 0
  }

  /* ================= Extended Professional Methods ================= */

  reserve(newCapacity) {
    
    // If newCapacity <= current capacity → do nothing
    // Else:
    //   Allocate new buffer
    //   Copy elements in logical order
    //   Reset front to 0
  }

  shrinkToFit() {
    // Must reduce capacity to size
    // Must reallocate buffer
    // Must preserve order
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
    // If indices invalid → throw Error
    // Must swap logical elements
  }

}