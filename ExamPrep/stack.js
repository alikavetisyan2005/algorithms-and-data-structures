class Stack {
    #stack;
    #size;
    #cap;

    constructor(capacity) {
        if(capacity < 2 ) throw new Error("capacity must be positive integer");
        

        this.#stack = new Int32Array(capacity);
        this.#size = 0;
        this.#cap = capacity;
        // Must create fixed-capacity stack
        // Capacity must be a positive number
        // If capacity invalid → throw Error
        // Must initialize:
        //   internal array buffer
        //   size = 0
        //   cap = capacity
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
        // Must return current number of elements in stack
    }

    capacity() {
        return this.#cap;
        // Must return maximum number of elements stack can hold
    }

    is_empty() {
        return this.#size == 0
        // Must return true if size === 0
    }


    is_full() {
        return this.#size === this.#cap
        // Must return true if size === capacity
    }

    clear() {
        this.#size = 0;

        // Must remove all elements from stack
        // Must keep capacity unchanged
        // Must reset size to 0
    }

    /* ================= Core Stack Operations ================= */

    push(value) {
        if(this.is_full()) throw new Error("overflow");
        
        this.#stack.push(value);
        this.#size++;
        // If stack is full → throw Error (overflow)
        // Must add value to the top of stack
        // Must increase size by 1
    }

    pop() {
        if(this.is_empty()) throw new Error("underflow");

        
        const value = this.#stack.pop();
        this.#size--;
        return value;
        // If stack is empty → throw Error (underflow)
        // Must remove top element
        // Must decrease size by 1
        // Must return removed value
    }

    peek() {
        return this.#stack[this.#size - 1]
        // If stack empty → throw Error
        // Must return top element WITHOUT removing it
    }
}
