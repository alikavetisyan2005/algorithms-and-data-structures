class HashTable {
    #table;
    #capacity;
    #size;
    #loadFactor;

    constructor(capacity = 17, loadFactor = 0.75) {
        if(capacity < 0 || !Number.isInteger(capacity)) throw new Error("capacity must be positive integer");

        this.#capacity = capacity;
        
        this.#size = 0;
        this.#loadFactor = loadFactor;

        this.#table = Array.from({ length: this.#capacity }, () => []);
        
        // Must initialize hash table with given capacity

        // capacity must be positive integer
        // If invalid → throw Error

        // Must create internal bucket array

        // Each bucket can store:
        // linked list OR dynamic array of entries

        // Must initialize:
        // size = 0
        // capacity = capacity
        // loadFactor = loadFactor
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
        // Must return number of key-value pairs
    }

    capacity() {
        return this.#capacity;
        // Must return number of buckets
    }

    isEmpty() {
        return this.#size === 0;
        // Must return true if size === 0
    }

    clear() {
        this.#table = Array.from({ length: this.#capacity }, () => []);
        this.#size = 0;
        // Must remove all entries
        // Must keep current capacity
        // Must reset size = 0
    }

    /* ================= Hashing ================= */

    #hash(key) {
        let total = 0;
        if(typeof key == "string"){
            for(let i = 0;i < key.length;i++){
                total = (total * 31 + key.charCodeAt(i)) % this.#capacity;
            }
        }
        else if(typeof key === "number"){
            total = key;
        }
        else throw new Error("key must be number or string");
        

        return Math.abs(total) % this.#capacity;
        // Must compute integer hash for given key

        // Must support at least:
        // string keys
        // number keys

        // Hash result must be converted to bucket index:
        // index = hash % capacity
    }

    /* ================= Core Operations ================= */

    put(key, value) {

        let idx = this.#hash(key);
        let bucket = this.#table[idx];
        for(let entry of bucket){
            if(entry.key === key){
                entry.value = value;
                return;
            }
        }

        bucket.push({key, value})
        this.#size++

        if(this.#loadFactor() > this.loadFactor){
            this.#resize()
        }
 
        // Must insert or update key-value pair

        // Steps:
        // 1) Compute bucket index using hash function
        // 2) Traverse bucket
        // 3) If key exists → update value
        // 4) Otherwise insert new entry

        // Must increase size if new key added

        // Must check load factor:
        // if size / capacity > loadFactor
        // → resize table
    }

    get(key) {
        let idx = this.#hash(key);
        let bucket = this.#table[idx];

        for(let entry of bucket){
            if(entry.key === key){
                return entry.value;
            }
        }

        return undefined;
        // Must return value associated with key

        // Steps:
        // 1) Compute bucket index
        // 2) Search bucket for key

        // If key not found → return undefined
    }

    remove(key) {
        let idx = this.#hash(key);
        let bucket = this.#table[idx];

        for(let i = 0;i < bucket.length;i++){
            if(bucket[i].key === key){
                const removed = bucket[i].value;
                bucket.splice(i,1);
                this.#size--;
                return removed
            }
        }

        return undefined


        // Must remove key-value pair

        // Steps:
        // 1) Locate bucket
        // 2) Remove entry

        // Must decrease size

        // Must return removed value
    }

    containsKey(key) {
        let idx = this.#hash(key);
        let bucket = this.#table[idx];

        for(let i = 0;i < bucket.length;i++){
            if(bucket[i].key === key){
                return true;
            }
        }

        return false;
        // Must return true if key exists
        // Otherwise false
    }

    containsValue(value) {

        // Must search entire table
        // Return true if value exists
    }

    /* ================= Resize / Rehash ================= */

    #resize(newCapacity) {
        let oldArray = this.#table
        this.#table = Array.from({ length: newCapacity }, () => [])
        
        
        this.#capacity = newCapacity;
        this.#size = 0;

        for(let bucket of oldArray){
            for(let entry of bucket){
                this.put(entry.key,entry.value);
            }
        }



        // Must create new bucket array

        // Must rehash ALL existing entries

        // Must redistribute entries across new buckets

        // Must update capacity
    }

    loadFactor() {
        return this.#size / this.#capacity;
        // Must return current load factor:
        // size / capacity
    }

    /* ================= Entry Views ================= */

    keys() {
        
        // Must return array OR iterator of all keys
    }

    values() {
        // Must return array OR iterator of all values
    }

    entries() {
        // Must return array OR iterator of [key, value]
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        // Must iterate through key-value pairs
        // Each step returns [key, value]
    }

    /* ================= Utility Operations ================= */

    toObject() {
        // Must convert hash table into plain JS object
        // Keys become object properties
    }

    clone() {
        // Must create deep copy of table
        // New table must not share buckets
    }
}