const { useCallback } = require("react");

class Node {
    #value;
    #next = null;

    constructor(val = 0) {
        this.#value = val;
        this.#next = null;
        // Must create node storing value = val
        // Must initialize next pointer to null
    }

    get value() {
        return this.#value;
        // Must return stored value
    }

    set value(val) {
        this.#value = val;
        // Must update stored value
        // No type restriction unless required by list contract
    }

    get next() {
        return this.#next;
        // Must return reference to next node
        // If no next node → return null
    }

    set next(new_node) {
        this.#next = new_node;
        // Must set next pointer to another Node or null
        // Must not break linked list structure
    }
}

class SinglyLinkedList {
    #head = null;
    #size = 0;

    constructor(iterable) {
        if(!iterable) {
            this.#head = null;
            this.#size = 0;
        }
        if(typeof iterable[Symbol.iterator] === "function"){
            for(let value of iterable){
                this.push_back(value);
            }
            return;
        }
        this.push_back(iterable);

        // If iterable is undefined → create empty list
        // If iterable is iterable object:
        //   Must insert all elements in order using push_back
        // If iterable is single value → push_back once
    }

    /* ================= Size & State ================= */

    size() {
        return this.#size;
        // Must return number of nodes in list
    }

    isEmpty() {
        return this.#size === 0
        // Must return true if size === 0
    }

    clear() {
        this.#head = null;
        this.#size = 0;
        // Must remove all nodes
        // Must set head = null
        // Must set size = 0
    }

    /* ================= Front Access ================= */

    front() {
        if(this.isEmpty()) return undefined;
        return this.#head;
        // If empty → return undefined or throw (depending on contract)
        // Otherwise return head node value
    }

    /* ================= Push & Pop ================= */

    push_front(val) {
        let newNode = new Node(val);
        if(!this.#head){
            this.#head = newNode;
            return;
        }    
        newNode.next = this.#head;
        this.#head = newNode;
        this.#size++;
        // Must create new node
        // Must set new node.next = current head
        // Must update head to new node
        // Must increase size
    }

    push_back(val) {
        let newNode = new Node(val)
        if(this.isEmpty()) {
            this.#head = newNode;
            return;
        }

        let current = this.#head;
        while(current.next){
            current = current.next;
        }

        current.next = newNode;
        this.#size++

        // If list empty:
        //   Must create new head node
        // Else:
        //   Must traverse to last node
        //   Must attach new node at end
        // Must increase size
    }

    pop_front() {
        if(this.isEmpty()) return undefined;

        const val = this.#head.val;
        this.#head = this.#head.next;
        this.#size--
        return val;
        // If empty → return undefined or throw
        // Must remove head node
        // Must move head to next node
        // Must decrease size
        // Must return removed value
    }

    pop_back() {
        if(this.isEmpty()) return undefined;

        if(this.#size === 1) {
            this.#head = null
            return;   
        }

        let current = this.#head
        while(current.next.next){
            current = current.next;
        }
        const val = current.next.val
        current.next = null;
        this.#size--;
        return val;
            // If empty → return undefined or throw
        // If only one element: [1,2,3,4]
        //   Must set head = null
        // Else:
        //   Must traverse to node before last
        //   Must remove last node
        // Must decrease size
        // Must return removed value
    }

    /* ================= Random-like Access ================= */

    at(index) {
        if(index < 0 || index >= this.#size) return undefined;

        let current = this.#head;
        while(index){
            current = current.next;
            index--;
        }
        const val = current.val;

        return val
        // If index invalid → return undefined or throw
        // Must traverse list from head
        // Must return value at index [1,2,3,4]
        // Complexity O(n)
    }

    insert(index, val) {
        if(index < 0 || index > this.#size) return undefined;
        let newNode = new Node(val)
        let current = this.#head;
        let prev = null;
        while(index){
            prev = current;
            current = current.next;
            index--;
        }

        prev.next = newNode;
        newNode.next = current;
        this.#size++



        // If index invalid → return or throw
        // If index === 0 → push_front
        // If index === size → push_back
        // Else: [1,2,3,4,5]
        //   Traverse to index position
        //   Insert new node between nodes
        // Must increase size
    }

    erase(index) {
        if(index < 0 || index >= this.#size) return undefined;

        if(index === 0) this.pop_front();
        if(index === this.#size - 1) this.pop_back();

        let current = this.#head;

        while(index - 1){
            current = current.next;
            index--;
        }

        current.next = current.next.next;

        this.#size--;
        // If index invalid → return or throw
        // If index === 0 → pop_front
        // If index === size-1 → pop_back
        // Else:
        //   Traverse to node before index
        //   Skip target node
        // Must decrease size
    }

    remove(value, equals) {

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
        let current = this.#head;

        while(current){
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.#head = prev;
        // Must reverse list in-place
        // Must not create new nodes
        // Must update head
        // Complexity O(n)
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
        // Must traverse entire list
        // Must return JS array of all node values
    }

    static fromArray(arr) {
        // Must create new list from array values
        // Must preserve order
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        // Must allow:
        // for (let value of list)
        // Must iterate from head → tail
        // Must not modify list
    }
}