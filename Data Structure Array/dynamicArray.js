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
        
    }

    clear() {
        this.#size = 0;
       
    }

    /* ================= Element Access ================= */

    at(i) {
        if(i < 0 || i >= this.#size){
            throw new Error("index not found")
        }
        return this.#arr[i];
        
    }

    set(i, value) {
        if(typeof i !== "number" || i < 0 || i > this.#size){
            throw new Error("invalid index");
        }
        if(typeof value !== "number"){
            throw new Error("Value must be number");
            
        }
        this.#arr[i] = value;
        
    }

    front() {
        return this.#arr[0];

    }

    back() {
        return this.#arr[this.#size - 1];
    
    }

    toArray() {
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
       
    }

    popBack() {
        if(this.empty()){
            throw new Error("Array is empty")
        }
        let removedValue = this.#arr[this.#size - 1];
        this.#arr[this.#size - 1] = undefined;
        this.#size--;
        return removedValue
        
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
        
    }

    

    swap(i, j) {
        if(i < 0 || i >= this.#size || j < 0 || j >= this.#size){
            throw new Error("index does not exist");
        }
        let tmp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = tmp;
        
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
        
    }

    values() {
        return this[Symbol.iterator]();
        
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
        
    }

    /* ================= High Order ================= */

    forEach(fn) {
       
        for(let i = 0;i < this.#size;i++){
            fn(this.#arr[i],i,this);
        }
    }

    map(fn) {
        
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
    }

    some(fn) {
        for(let i = 0;i < this.#size;i++){
            if(fn(this.#arr[i],i,this) === true){
                return true
            }
        }
        return  false
    }

    every(fn) {
        for(let i = 0;i < this.#size;i++){
            if(fn(this.#arr[i],i,this) === false){
                return false
            }
        }
        return true
    }

    find(fn) {
        for(let i = 0;i < this.#size;i++){
            if(fn(this.#arr[i],i,this) === true){
                return this.#arr[i];
            }
        }
        return undefined
    }

    findIndex(fn) {
        for(let i = 0;i < this.#size;i++){
            if(fn(this.#arr[i],i,this) === true){
                return i;
            }
        }
        return -1
    }

    includes(value) {
        for(let i = 0;i < this.#size;i++){
            if(this.#arr[i] === value){
                return true
            }
        }
        return false;
        
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
        
    }

    sort(compareFn) {
        for(let i = 0;i < this.#size - 1;i++){
            for(let j = 0;j < this.#size - 1 - i;j++){
                if(this.#arr[j] > this.#arr[j+1]){
                    [this.#arr[j],this.#arr[j+1]] = [this.#arr[j+1], this.#arr[j]]
                }
            }
        }
        
    }

    clone() {
        let copy = new DynamicArray(this.#size);
        for(let i = 0;i < this.#size;i++){
            copy.#arr[i] = this.#arr[i];
        }
        return copy

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
    
    }
}