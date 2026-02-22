class Queue {
    #queue;
    #front;
    #back;
    #size;
    #cap;

    constructor(capacity = 8) {
        if(!Number.isInteger(capacity) || capacity <= 0){
            throw new Error("Capacity must be positive number");
        }
        
        this.#cap = capacity;
        this.#queue = new Array(capacity);
        this.#front = 0;
        this.#back = -1
        this.#size = 0;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#cap
    }

    is_empty() {
        return this.#size === 0;
    }

    is_full() {
        return this.#size === this.#cap;
    }

    clear() {
        this.#size = 0;
        this.#front = 0;
        this.#back = -1;
        
    }

    /* ================= Core Queue Operations ================= */

    enqueue(value) {
        if(this.is_full()){
            throw new Error("Queue overflow");
        }
        
        this.#back = (this.#back + 1) % this.#cap;
        this.#queue[this.#back] = value;
        this.#size++;
    }

    dequeue() {
        if(this.is_empty()){
            throw new Error("Queue underflow")
        }

        const value = this.#queue[this.#front];
        this.#front = (this.#front + 1) % this.#cap;
        this.#size--;
        return value
    }

    peek() {
        if(this.is_empty()){
            return null;
        }
        return this.#queue[this.#front];
    }

    back() {
        if(this.is_empty()){
            throw new Error("Queue is empty");
        }
        return this.#queue[this.#back];
    }

    print() {
        if(this.is_empty()){
            throw new Error("Queue is empty")
        }
        let res = [];
        for(let i = 0;i < this.#size;i++){
            let index = (this.#front + i) % this.#cap;
            res.push(this.#queue[index]);
        }
        return res
    }

}

const qu = new Queue(8);
console.log(qu.enqueue(10));
console.log(qu.enqueue(20));
console.log(qu.enqueue(40));
console.log(qu.enqueue(30));
console.log(qu.dequeue());
console.log(qu.dequeue());
console.log(qu.peek())
console.log(qu.back())
console.log(qu.print())


