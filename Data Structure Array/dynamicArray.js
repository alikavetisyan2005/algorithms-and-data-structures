class DynamicArray {
    #arr;
    #size;
    #capacity;
    #GROWTH = 2;

    constructor(cap = 0, fill = 0) {
        if(cap < 0){
            throw new Error("Capacity must be positive number: ")
        }
        this.#size = cap;
        this.#capacity = cap;
        this.#arr = new Array(cap).fill(fill);
    
    }

    /* ================= Capacity ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    empty() {
        return this.#size === 0;
    }

    reserve(n) {
        if(n <= this.#capacity){
            return;
        }
        const newArr = new Array(n);
        for(let i = 0;i < this.#size;i++){
            newArr[i] = this.#arr[i];
        }
        this.#arr = newArr;
        this.#capacity = n;
    }

    shrinkToFit() {
        const newArr = new Array(this.#size)
        for(let i = 0;i < this.#size;i++){
            newArr[i] = this.#arr[i]
        }
        this.#arr = newArr;
        this.#capacity = this.#size
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
        if(i < 0 || i >= this.#size){
            throw new Error("index not found")
        }
        return this.#arr[i];
        // If i < 0 or i >= size → throw Error
        // Otherwise return element at index i
    }

    set(i, value) {
        if(typeof i !== "number" || i < 0 || i > this.#size){
            throw new Error("invalid index");
        }
        if(typeof value !== "number"){
            throw new Error("Value must be number");
            
        }
        this.#arr[i] = value;
        // If index invalid → throw Error
        // If value is not a number → throw Error
        // Otherwise overwrite element at index i
    }

    front() {
        return this.#arr[0];
        // Must return first element
        // Equivalent to at(0)
    }

    back() {
        return this.#arr[this.#size - 1];
        // Must return last element
        // Equivalent to at(size - 1)
    }

    toArray() {
        // Must return a normal JS array
        // Must include only elements [0 ... size-1]
        // Must NOT include unused capacity
        return this.#arr.slice(0,this.#size)
    }

    /* ================= Modifiers ================= */

    pushBack(value) {
        if(typeof value !== "number"){
            throw new Error("Value must be a number")
        }
        if(this.#capacity === 0){
            this.reserve(1);
        }
        else if(this.#size === this.#capacity){
            this.reserve(this.#capacity * this.#GROWTH);
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
        if(this.empty()){
            throw new Error("Array is empty")
        }
        let removedValue = this.#arr[this.#size - 1];
        this.#arr[this.#size - 1] = undefined;
        this.#size--;
        return removedValue
        // If empty → throw Error
        // Remove last element
        // Decrease size by 1
        // Return removed value
    }

    insert(pos, value) {
        if(pos < 0 || pos > this.#size){
            throw new Error("Position does not exist: ");
        }
        if(typeof value !== "number"){
            throw new Error("value must be number");
        }
        if(this.#capacity === 0){
            this.reserve(1)
        }
        else if(this.#size === this.#capacity){
            this.reserve(this.#capacity * this.#GROWTH);
        }
        for(let i = this.#size;i > pos;i--){
            this.#arr[i] = this.#arr[i-1]
        }
        this.#arr[pos] = value;
        this.#size++;

        // If pos < 0 or pos > size → throw Error
        // If buffer full → resize
        // Shift elements right from pos
        // Insert value at pos
        // Increase size
    }

    erase(pos) {
        if(pos < 0 || pos >= this.#size){
            throw new Error("position does not exist");
        }
        if(typeof pos !== "number"){
            throw new Error("position must be number");
        }
        for(let i = pos;i < this.#size - 1;i++){
            this.#arr[i] = this.#arr[i + 1]
        }
        this.#arr[this.#size - 1] = undefined;
        this.#size--;
        // If pos invalid → throw Error
        // Shift elements left from pos
        // Decrease size
    }

    #resize(n) {

        // Must allocate new buffer of size n
        // Copy min(size, n) elements
        // If n < size → truncate size
        // Update capacity
    }

    swap(i, j) {
        if(i < 0 || i >= this.#size || j < 0 || j >= this.#size){
            throw new Error("index does not exist");
        }
        let tmp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = tmp;
        // If any index invalid → throw Error
        // Swap values at indices i and j
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let index = 0;
        const arr = this.#arr;
        const size = this.#size;
        return{
            next(){
                if(index < size){
                    return {value: arr[index++], done: false};
                }
                return {done: true}
            }
        }
        // Must allow:
        // for (let x of arr)
        // Should iterate from index 0 to size-1
    }

    values() {
        return this[Symbol.iterator]();
        // Must return iterator over values
        // Same behavior as Symbol.iterator
    }

    keys() {
        let index = 0;
        const size = this.#size;
        return{
            next(){
                if(index < size){
                    return {value: index++, done: false};
                }
                return {done: true}
            }
        }
        // Must return iterator over indices
        // Values: 0, 1, 2, ... size-1
    }

    entries() {
        let index = 0;
        const arr = this.#arr;
        const size = this.#size;
        return{
            next(){
                if(index < size){
                    return {value: [index, arr[index++]], done: false};
                }
                return {done: true}
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
        for(let i = 0;i < this.#size;i++){
            fn(this.#arr[i],i,this);
        }
    }

    map(fn) {
        // Must return new DynamicArray
        // Each element = fn(oldValue, index, thisArray)
        const result = new DynamicArray();
        for(let i = 0;i < this.#size;i++){
            result.push(fn(this.#arr[i],i,this));
        }
        return result
    }

    filter(fn) {
        const result = new DynamicArray();
        for(let i = 0;i < this.#size;i++){
            if(fn(this.#arr[i],i,this) === true){
                result.push(this.#arr[i])
            }
        }
        return result;
        // Must return new DynamicArray
        // Only elements where fn(...) === true
    }

    reduce(fn, initial) {
        if (this.#size === 0 && initial === undefined) {
            throw new Error("Reduce of empty DynamicArray with no initial value");
        }

        let acc;
        let startIndex;

        if (initial !== undefined) {
            acc = initial;
            startIndex = 0;
        } 
        else {
            acc = this.#arr[0];
            startIndex = 1;
        }

        for (let i = startIndex; i < this.#size; i++) {
            acc = fn(acc, this.#arr[i], i, this);
        }

    return acc;
        // If empty and initial undefined → throw Error
        // If initial exists:
        //   acc = initial, start from index 0
        // Else:
        //   acc = first element, start from index 1
        // Must return accumulated value
    }

    some(fn) {
        for(let i = 0;i < this.#size;i++){
            if(fn(this.#arr[i],i,this) === true){
                return true
            }
        }
        return  false
        // Must return true if any element satisfies fn
        // Otherwise false
    }

    every(fn) {
        for(let i = 0;i < this.#size;i++){
            if(fn(this.#arr[i],i,this) === false){
                return false
            }
        }
        return true
        // Must return true only if all elements satisfy fn
    }

    find(fn) {
        for(let i = 0;i < this.#size;i++){
            if(fn(this.#arr[i],i,this) === true){
                return this.#arr[i];
            }
        }
        return undefined
        // Must return first value where fn(...) === true
        // If not found → return undefined
    }

    findIndex(fn) {
        for(let i = 0;i < this.#size;i++){
            if(fn(this.#arr[i],i,this) === true){
                return i;
            }
        }
        return -1
        // Must return index of first match
        // If not found → return -1
    }

    includes(value) {
        for(let i = 0;i < this.#size;i++){
            if(this.#arr[i] === value){
                return true
            }
        }
        return false;
        // Must return true if value exists in array
        // Otherwise false
    }

    /* ================= Extensions ================= */

    reverse() {
        let i = 0;
        let j = this.#size - 1;
        while(i < j){
            [this.#arr[i],this.#arr[j]] = [this.#arr[j], this.#arr[i]]
            i++;
            j--;
        }
        // Must reverse elements in-place
        // No extra array allowed
    }

    sort(compareFn) {
        for(let i = 0;i < this.#size - 1;i++){
            for(let j = 0;j < this.#size - 1 - i;j++){
                if(this.#arr[j] > this.#arr[j+1]){
                    [this.#arr[j],this.#arr[j+1]] = [this.#arr[j+1], this.#arr[j]]
                }
            }
        }
        // Must sort array in-place
        // Must NOT use built-in Array.sort
        // You must implement your own algorithm
    }

    clone() {
        let copy = new DynamicArray(this.#size);
        for(let i = 0;i < this.#size;i++){
            copy.#arr[i] = this.#arr[i];
        }
        return copy
        // Must return deep copy of this DynamicArray
    }

    equals(other) {
        if(other instanceof DynamicArray === false){
            return false;
        }
        if(this.#size !== other.size()){
            return false;
        }
        for(let i = 0;i < this.#size;i++){
            if(this.#arr[i] !== other.at(i)){
                return false
            }
        }
        return true
        // Must return true if:
        // same size AND all elements equal
    }
}