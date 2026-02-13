class Deque {
  #arr;
  #front;
  #size;
  #cap;

  constructor(capacity = 8) {
    if(capacity < 2) throw new Error("Capacity must be at least 2");

    this.#cap = capacity;
    this.#size = 0;
    this.#front = 0;
    this.#arr = new Array(capacity);

  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  capacity() {
    return this.#cap;
  }

  empty() {
    return this.#size === 0;
  }

  full() {
    return this.#size === this.#cap
  }

  /* ================= Internal Helpers ================= */

  #mod(i) {
    return ((i % this.#cap) + this.#cap) % this.#cap;
  }

  #index(i) {
    return this.#mod(this.#front + i)
  }

  #ensureCapacityForOneMore() {
    if(this.#size < this.#cap){
        return;
    }
    let newCap = this.#cap * 2;
    let newBuffer = new Array(newCap);
    for(let i = 0;i < this.#size;i++){
        newBuffer[i] = this.#arr[this.#index(i)]
    }
    this.#front = 0;
    this.#cap = newCap;
    this.#arr = newBuffer;
    }



  /* ================= Element Access ================= */

  front() {
    if(this.empty()){
        throw new Error("Empty");
    }
    return this.#arr[this.#front]
  }

  back() {
    if(this.empty()){
        throw new Error("Empty");        
    }
    return this.#arr[this.#index(this.#size - 1)]
  }

  at(i) {
    if(i < 0 || i >= this.#size){
        throw new Error("Index does not exist");
    }
    return this.#arr[this.#index(i)]
  }

  /* ================= Modifiers ================= */

  push_back(value) {
    this.#ensureCapacityForOneMore();
    const index = this.#index(this.#size);
    this.#arr[index] = value;
    this.#size++;
  }

  push_front(value) {
    this.#ensureCapacityForOneMore();
    if(this.#front === 0){
        this.#front = this.#cap - 1;
    }
    else{
        this.#front -= 1;
    }
    this.#arr[this.#front] = value;
    this.#size++;
  }

  pop_front() {
    if(this.empty()){
        throw new Error("Empty")
    }
    const removed = this.#arr[this.#front]
    this.#arr[this.#front] = null;
    this.#front = this.#mod(this.#front + 1)
    this.#size--;

  }

  pop_back() {
    if(this.empty()){
        throw new Error("Empty");
    }
    const last = this.#index(this.#size - 1)
    const removed = this.#arr[last];
    this.#arr[last] = null;
    this.#size--
    return removed;
  }

  clear() {
    this.#front = 0;
    this.#size = 0
  }

  /* ================= Extended Professional Methods ================= */

  reserve(newCapacity) {
    if(newCapacity <= this.#cap){
        return
    }
    const newBuffer = new Array(newCapacity);
    for(let i = 0;i < this.#size;i++){
        newBuffer[i] = this.#arr[this.#index(i)]
    }
    this.#front = 0;
    this.#arr = newBuffer;
    this.#cap = newCapacity
    
  }

  shrinkToFit() {
    if(this.#size === this.#cap){
        return;
    }
    const newBuffer = new Array(this.#size);
    for(let i = 0;i < this.#size;i++){
        newBuffer[i] = this.#arr[this.#index(i)];
    }
    this.#arr = newBuffer;
    this.#cap = this.#size;
    this.#front = 0
    
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
    if(i < 0 || i >= this.#size || j < 0 || j >= this.#size){
        throw new Error("Index does not exist");
    }
    [this.#arr[this.#index(i)],this.#arr[this.#index(j)]] = [this.#arr[this.#index(j)],this.#arr[this.#index(i)]]
  }

  /* ================= Search & Utilities ================= */

  find(value) {
    for(let i = 0;i < this.#size;i++){
        let idx = this.#index(i)
        if(this.#arr[idx] === value){
            return i
        }
    }
    return -1
  }

  includes(value) {
    for(let i = 0;i < this.#size;i++){
        let idx = this.#index(i);
        if(this.#arr[idx] === value){
            return true
        }
    }
    return false
  }

  toArray() {
    const newArr = new Array(this.#size);
    for(let i = 0;i < this.#size;i++){
        let idx = this.#index(i);
        newArr[i] = this.#arr[idx];  
    }
    return newArr

  }

  clone() {
    const deque = new Deque(this.#cap);
    for(let i = 0;i < this.#size;i++){
        const value = this.#arr[this.#index(i)];
        deque.push_back(value);
    }
    return deque
  }

  equals(otherDeque) {
    if(this.#size !== otherDeque.size){
        return false;
    }
    for(let i = 0;i < this.#size;i++){
        let idx = this.#index(i);
        if(this.#arr[idx] !== otherDeque.at(i)){
            return false;
        }
    }
    return true
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    let i = 0;
    const size = this.#size;
    const deque = this;
    return{
        next(){
            if(i < size){
                const value = deque.#arr[deque.#index(i)];
                i++
                return {value: value, done: false};
            }
            else{
                return {value: undefined, done: true}
            }
        }
    }
  }

  values() {
        return this[Symbol.iterator]();
  }


  keys() {
    let i = 0;
    let size = this.#size;
    return{
        next(){
            if(i < size){
                return {value: i++,done: false}
            }
            else{
                return {value: undefined,done: true}            
            }
        },
        [Symbol.iterator](){
            return this
        }
    }
  }

  entries() {
    let i = 0;
    let size = this.#size;
    let deque = this;
    return{
        next(){
            if(i < size){
                return {value: [i,deque.#arr[deque.#index(i)]], done: false}
            }
            else{
                return {value: undefined,done: true}
            }
        },
        [Symbol.iterator](){
            return this
        }
    }
  }

  /* ================= Functional Style ================= */

  forEach(fn) {
    for(let i = 0;i < this.#size;i++){
        const value = this.#arr[this.#index(i)];
        fn(value, i, this);
    }
  }


  map(fn) {
    const deque = new Deque(this.#size);
    for(let i = 0;i < this.#size;i++){
        const value = this.#arr[this.#index(i)];
        deque.push_back(fn(value,i,this))
    }
    return deque;
    
  }


  filter(fn) {
    const deque = new Deque(this.#size);
    for(let i = 0;i < this.#size;i++){
        const value = this.#arr[this.#index(i)];
        if(fn(value,i, this)){
            deque.push_back(value)
        }
    }
    return deque
  }


  reduce(fn, initial) {
    if(this.empty() && initial === undefined){
        throw new Error("Empty or no initial value");
    }
    let acc = initial;
    let start = 0;
    if(acc === undefined){
        acc = this.#arr[this.#front];
        start = 1;
    }
    for(let i = start;i < this.#size;i++){
        const value = this.#arr[this.#index(i)];
        acc = fn(acc, value, i, this)
    }
    return acc

    // Must behave like Array.reduce
    // Must throw if empty and no initial value
  }
}