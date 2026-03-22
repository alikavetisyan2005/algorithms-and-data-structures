class Queue {
    #queue;
    #front;
    #back;
    #size;
    #cap;

    constructor(capacity) {
        if(capacity <= 0 || !Number.isInteger(capacity)) {
            throw new Error("capacity must be integer");
        }

        this.#front = 0;
        this.#back = -1;
        this.#size = 0
        this.#cap =capacity
        this.#queue = new Int32Array(capacity);
        // Capacity must be positive number
        // If invalid → throw Error

        // Must allocate fixed-size internal buffer
        // Must initialize:
        //   front = 0
        //   back = -1 (or equivalent empty-state position)
        //   size = 0
        //   cap = capacity
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
        // Must return number of elements currently stored
    }

    capacity() {
        return this.#cap;
        // Must return maximum number of elements queue can hold
    }

    is_empty() {
        return this.#size === 0
        // Must return true if size === 0
    }

    is_full() {
        return this.#size === this.#cap;
        // Must return true if size === capacity
    }


    clear() {
        this.#front = 0;
        this.#back = -1;
        this.#size = 0;
        // Must reset queue to empty state
        // Must keep capacity unchanged
        // Must reset:
        //   front = 0
        //   back = -1
        //   size = 0
    }

    /* ================= Core Queue Operations ================= */

    enqueue(value) {
        if(this.is_full()) throw new Error("overflow");
        
        this.#back = (this.#back + 1) % this.#cap
        this.#queue[this.#back] = value;
        this.#size++;

        // If queue is full → throw Error (overflow)

        // Must:
        //   move back forward circularly
        //   store value at new back
        //   increment size
    }

    dequeue() {
        if(this.is_empty()) throw new Error("underflow");
        

        const value = this.#queue[this.#front];

        this.#front = (this.#front + 1) % this.#cap;
        this.#size--;
        return value;
        // If queue is empty → throw Error (underflow)

        // Must:
        //   read value at front
        //   optionally clear reference
        //   move front forward circularly
        //   decrement size
        //   return removed value
    }

    peek() {
        if(this.is_empty()){
            throw new Error("aaa");
        }

        return this.#queue[this.#front];
        // If queue empty → return null OR throw Error (depending on design contract)
        // Otherwise return front element WITHOUT removing it
    }

    back() {
        if(this.is_empty()) {
            throw new Error("aaa");
        }

        return this.#queue[this.#back];
        // If queue empty → throw Error
        // Must return last element
    }

    print() {

        // Must output queue elements in FIFO order
        // Must not expose internal layout
    }
}