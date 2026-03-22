class DynamicArray {
    #arr;
    #size;
    #capacity;
    #GROWTH = 2;

    constructor(cap = 0, fill = 0) {
        if(cap < 0 || !Number.isInteger(cap)) {
            throw new Error("cap must be positive ineger");
        }

        this.#arr = new Int32Array(cap).fill(fill);
        this.#size = cap;
        this.#capacity = cap;

        // Must allocate internal buffer with length = cap
        // Must set size = cap
        // Must set capacity = cap
        // Must fill all elements with value "fill"
        // If cap < 0 → throw Error
    }

    /* ================= Capacity ================= */

    size() {
        return  this.#size;
        // Must return current number of elements
    }

    capacity() {
        return this.#capacity;
        // Must return allocated buffer size
    }

    empty() {
       return this.#size === 0
        // Must return true if size === 0, otherwise false
    }

    reserve(n) {
        if(n <= this.#capacity) return;
        let newArr = new Int32Array(n);
        for(let i = 0;i < this.#size;i++){
            newArr[i] = this.#arr[i];
        }

        this.#arr = newArr;
        this.#capacity = n;

        // If n <= capacity → do nothing
        // If n > capacity:
        //   - allocate new buffer of size n
        //   - copy first "size" elements
        //   - replace old buffer
        //   - update capacity
    }

    shrinkToFit() {
        let newArr = new Int32Array();
        for(let i = 0;i < this.#size;i++){
            newArr[i] = this.#arr[i];
        }
        this.#arr = newArr;
        this.#capacity = this.#size;

        // Must reallocate buffer so that:
        // capacity === size
        // Only valid elements are kept
    }

    clear() {
        this.#size = 0;
        // Must set size = 0
        // Capacity must remain unchanged
    }

    /* ================= Element Access ================= */

    at(i) {
        if(i < 0 || i >= this.#size) throw new Error("invalid index");
        
        return this.#arr[i];
        // If i < 0 or i >= size → throw Error
        // Otherwise return element at index i
    }

    set(i, value) {
        if(i < 0 || i >= this.#size) throw new Error("invalid index");
        if(typeof value !== "number") throw new Error("Value must be a number");
        
        this.#arr[i] = value;

        // If index invalid → throw Error
        // If value is not a number → throw Error
        // Otherwise overwrite element at index i
    }

    front() {
        return this.at(0);
        // Must return first element
        // Equivalent to at(0)
    }

    back() {
        return this.at(this.#size - 1)
        // Must return last element
        // Equivalent to at(size - 1)
    }

    toArray() {

        let newArr = new Array(this.#size);
        for(let i = 0;i < this.#size;i++){
            newArr[i] = this.#arr[i]
        }

        return newArr;
        // Must return a normal JS array
        // Must include only elements [0 ... size-1]
        // Must NOT include unused capacity
    }

    /* ================= Modifiers ================= */

    pushBack(value) {
        if(typeof value !== "number") throw new Error("must be a number");
        
        if(this.#size === this.#capacity){
            this.#resize(this.#capacity * this.#GROWTH);
        }

        this.#arr[this.#size] = value;
        this.#size++;

        // If value is not number → throw Error
        // If size === capacity:
        //   - grow capacity (usually capacity * 2)
        // Append value at the end
        // Increase size by 1
    }

    popBack() {
        if(this.empty()) throw new Error("Array is empty");
        
        const value = this.#arr[this.#size - 1];
        this.#arr[this.#size - 1] = null;
        this.#size--;
        return value;
        // If empty → throw Error
        // Remove last element
        // Decrease size by 1
        // Return removed value
    }

    insert(pos, value) {
        if(pos < 0 || pos >= this.#size) throw new Error("invalid pos");
        
        if(this.#size === this.#capacity){
            this.#resize(this.#capacity * this.#GROWTH);
        }
        for(let i = this.#size - 1;i >= pos;i++){
            this.#arr[i + 1] = this.#arr[i]
        }
        this.#arr[pos] = value;
        this.#size++

        // If pos < 0 or pos > size → throw Error
        // If buffer full → resize
        // Shift elements right from pos
        // Insert value at pos
        // Increase size
    }

    erase(pos) {
        if(pos < 0 || pos >= this.#size) return undefined;

        for(let i = pos;i < this.#size - 1;i++){
            this.#arr[i] = this.#arr[i+1]
        }
        this.#size--;
        // If pos invalid → throw Error
        // Shift elements left from pos
        // Decrease size [1,2,3,4]
    }

    #resize(n) {
        
        let newArr = new Int32Array(n);
        let count = Math.min(n,this.#size);

        for(let i = 0;i < count;i++){
            newArr[i] = this.#arr[i];
        }

        this.#arr = newArr;
        this.#capacity = n;
        this.#size = count
        // Must allocate new buffer of size n
        // Copy min(size, n) elements
        // If n < size → truncate size
        // Update capacity
    }

    swap(i, j) {
        if(i < 0 || i >= this.#size) return undefined;
        if(j < 0 || j >= this.#size) return undefined;

        [this.#arr[i],this.#arr[j]] = [this.#arr[j],this.#arr[i]];
        // If any index invalid → throw Error
        // Swap values at indices i and j
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {

        let i = 0;
        let arr = this.#arr;
        let size = this.#size;

        return{
            next(){
                if(i < size){
                    return {value: arr[i++], done: false};
                }
                else{
                    return {done: true};
                }
            }
        }
        // Must allow:
        // for (let x of arr)
        // Should iterate from index 0 to size-1
    }

    values() {

        let i = 0;
        let arr = this.#arr;
        let size = this.#size;

        return{
            next(){
                if(i < size){
                    return {value: arr[i++], done: false};
                }
                else{
                    return {done: true};
                }
            }
        }
        // Must return iterator over values
        // Same behavior as Symbol.iterator
    }

    keys() {
        let i = 0;
        let size = this.#size;
        let arr = this.#arr;

        return {
            next(){
                if(i < size){
                    return {value: i++, done: false};
                }
                else{
                    return {done: true}
                }
            }
        }
        // Must return iterator over indices
        // Values: 0, 1, 2, ... size-1
    }

    entries() {
        let i = 0;
        let size = this.#size;
        let arr = this.#arr;

        return {
            next(){
            if(i < size){
                return {value: [i,arr[i++]],done: false};
            }
            else{
                return {done: true};
            }
        }
    }
        // Must return iterator over [index, value] pairs
        // Example: [0, 10], [1, 20], ...
    }

    /* ================= High Order ================= */

    forEach(fn) {
        // Must call fn(value, index, thisArray)
        // For each element from 0 to size-1
        // Must not modify the array
    }

    map(fn) {
        // Must return new DynamicArray
        // Each element = fn(oldValue, index, thisArray)
    }

    filter(fn) {
        // Must return new DynamicArray
        // Only elements where fn(...) === true
    }

    reduce(fn, initial) {
        // If empty and initial undefined → throw Error
        // If initial exists:
        //   acc = initial, start from index 0
        // Else:
        //   acc = first element, start from index 1
        // Must return accumulated value
    }

    some(fn) {
        // Must return true if any element satisfies fn
        // Otherwise false
    }

    every(fn) {
        // Must return true only if all elements satisfy fn
    }

    find(fn) {
        // Must return first value where fn(...) === true
        // If not found → return undefined
    }

    findIndex(fn) {
        // Must return index of first match
        // If not found → return -1
    }

    includes(value) {
        // Must return true if value exists in array
        // Otherwise false
    }

    /* ================= Extensions ================= */

    reverse() {
        // Must reverse elements in-place
        // No extra array allowed
    }

    sort(compareFn) {
        // Must sort array in-place
        // Must NOT use built-in Array.sort
        // You must implement your own algorithm
    }

    clone() {
        // Must return deep copy of this DynamicArray
    }

    equals(other) {
        // Must return true if:
        // same size AND all elements equal
    }
}