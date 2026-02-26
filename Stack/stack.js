import DynamicArray from "../Data Structure Array/dynamicArray.js";


class Stack {
    #stack;
    #size;
    #cap;

    constructor(capacity = 8) {
        if(capacity < 0 || typeof capacity !== "number"){
            throw new Error("Capacity must be positive number");
        }
        this.#size = 0;
        this.#stack = new DynamicArray(capacity);
        this.#cap = capacity;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#cap
    }

    is_empty() {
        return this.#size === 0
    }

    is_full() {
        return this.#size === this.#cap
    }

    clear() {
        this.#size = 0;
    }

    /* ================= Core Stack Operations ================= */

    push(value) {
        if(this.is_full()){
            throw new Error("Stack is full");
        }
        this.#stack.pushBack(value);
        this.#size++;
    }

    pop() {
        if(this.is_empty()){
            throw new Error("Stack is empty");
        }
        this.#size--
        return this.#stack.popBack()
    }

    peek() {
        if(this.is_empty()){
            throw new Error("Stack is empty");
        }
        return this.#stack.at(this.#size - 1)
    }
    
}


export default Stack;