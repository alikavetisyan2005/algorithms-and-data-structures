class Node {
    #value;
    #next = null;

    constructor(val = 0) {
        this.#value = val;
        this.#next = null;
    }

    get value() {
        return this.#value;
    }

    set value(val) {
        if(typeof val !== "number"){
            throw new Error("value must be a number")
        }
        this.#value = val
    }

    get next() {
        return this.#next;
    }

    set next(new_node) {
        if(new_node !== null && !(new_node instanceof Node)){
            throw new Error("new node must be instance of Node")
        }
        this.#next = new_node;
    }
}

class SinglyLinkedList {
    #head = null;
    #size = 0;

    constructor(iterable) {
        if(!iterable){
            return;
        }
        if(typeof iterable[Symbol.iterator] === "function"){
            for(let value of iterable){
                this.push_back(value);
            }
            return;
        }
        this.push_back(iterable)
    }

    /* ================= Size & State ================= */

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        this.#head = null;
        this.#size = 0;
    }

    /* ================= Front Access ================= */

    front() {
        if(this.isEmpty()){
            return undefined;
        }
        return this.#head.value;
    }

    /* ================= Push & Pop ================= */

    push_front(val) {
        let node = new Node(val);
        node.next = this.#head;
        this.#head = node;
        this.#size++;
    }

    push_back(val) {
        const node  = new Node(val);
        if(this.isEmpty()){
            this.#head = node;
        }
        else{
            let current = this.#head;
                while(current.next !== null){
                current = current.next;
            }
            current.next = node;
    }
        this.#size++;
    }

    pop_front() {
        if(this.isEmpty()){
            return undefined;
        }
        let removedValue = this.#head.value;
        this.#head = this.#head.next;
        this.#size--;
        return removedValue;
    }

    pop_back() {
        if(this.isEmpty()){
            return undefined;
        }
        if(this.#size === 1){
            let removedValue = this.#head.value;
            this.#head = null;
            this.#size--;
            return removedValue
        }

        let current = this.#head;
        while(current.next.next !== null){
            current = current.next;
        }
        let removedValue = current.next.value;
        current.next = null;
        this.#size--;
        return removedValue;
    }

    /* ================= Random-like Access ================= */

    at(index) {
        if(index < 0 || index >= this.#size){
            return undefined;
        }
        let i = 0;
        let current = this.#head;
        while(i < index){
            current = current.next;
            i++
        }
        return current.value;
    }

    insert(index, val) {
        if(index < 0 || index > this.#size){
            return undefined;
        }
        if(index === 0){
            this.push_front(val);
            return;
        }
        if(index === this.#size){
            this.push_back(val)
            return;
        }
        let current = this.#head;
        let i = 0;
        while(i < index - 1){
            current = current.next;
            i++;
        }
        let node = new Node(val);
        node.next = current.next;
        current.next = node
        this.#size++;
    }

    erase(index) {
        if(index < 0 || index > this.#size){
            return undefined;
        }
        if(index === 0){
            this.pop_front();
            return;
        }
        if(index === this.#size - 1){
            this.pop_back();
            return;
        }
        let i = 0;
        let current = this.#head;
        while(i < index - 1){
            current = current.next;
            i++;
        }
        current.next = current.next.next;
        this.#size--;

    }
    equals(a,b){
        return a === b;
    }

    remove(value, equals) {
        let current = this.#head
        while(current.next){
            if(equals(current.next,value)){
                current.next = current.next.next;
            }
            else{
                current = current.next
            }
        }      
        // Must remove all nodes matching value
        // If equals function exists:
        //   Use equals(a, b)
        // Else:
        //   Use strict equality ===
        // Must return number of removed nodes
    }

    /* ================= Algorithms ================= */

    reverse() {
        let prev = null;
        let current = this.#head
        while(current){
            let next = current.next;
            current.next = prev
            prev = current;
            current = next
        }
        this.#head = prev
    }

    sort(cmp) {
        // Must sort list using linked-list friendly algorithm
        // Recommended: Merge Sort
        // Must reorder nodes, not values (preferred)
        // Must update head
    }

    merge(list, cmp) {
        // Both lists must be sorted according to cmp
        // If not sorted → throw Error
        // Must merge nodes into single sorted list
        // Must update this list head
        // Must preserve all nodes
        // Complexity O(n)
    }

    /* ================= Utilities ================= */

    toArray() {
        let res = [];
        let current = this.#head;
        while(current){
            res.push(current.value);
            current = current.next
        }
        return res
    }

    static fromArray(arr) {
        const newList = new SinglyLinkedList();
        if(arr.length === 0) return newList;

        newList.#head = new Node(arr[0])
        let current = newList.#head;
        for(let i = 1;i < arr.length;i++){
            current.next = new Node(arr[i]);
            current = current.next
        }
        newList.#size = arr.length
        return newList
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let current = this.#head
        return {
            next: () => {
                if(current){
                    let value = current.value;
                    current = current.next
                    return {value: value, done: false}
                }
                else{ return {value: undefined, done: true}
                }
            }
        }
        // Must allow:
        // for (let value of list)
        // Must iterate from head → tail
        // Must not modify list
    }
}

const list = new SinglyLinkedList();

console.log(list.isEmpty());
console.log(list.size() === 0);

list.push_back(10);
list.push_front(5);
list.push_back(15);

console.log(list.size() === 3);
console.log(list.front() === 5);
console.log(list.toArray());

console.log(list.pop_front());
console.log(list.pop_back());
console.log(list.toArray());
console.log(list.at(0))
list.erase(0)
console.log(list.toArray());

let arr = [7,8,9]
let list2 = SinglyLinkedList.fromArray(arr)
console.log(list2.toArray())
list2.reverse()
console.log(list2.toArray())
