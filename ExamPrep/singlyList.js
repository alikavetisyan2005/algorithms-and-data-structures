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
        if(typeof val !== "number") throw new Error("value must be a number");
        this.#value = val;
        // Must update stored value
        // No type restriction unless required by list contract
    }

    get next() {
        if(!this.#next) return null;

        return this.#next
        // Must return reference to next node
        // If no next node → return null
    }

    set next(new_node) {
        if(new_node !== null && !(new_node instanceof Node)) throw new Error("must be node or null");
        this.#next = new_node;
        // Must set next pointer to another Node or null
        // Must not break linked list structure
    }
}

class SinglyLinkedList {
    #head = null;
    #size = 0;

    constructor(iterable) {
        if(!iterable) return
        if(typeof iterable[Symbol.iterator] === "function"){
            for(let elem of iterable){
                this.push_back(elem);
            }
            return;
        }
        this.push_back(iterable)

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
        return this.#size === 0;
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
        return this.#head.value
        // If empty → return undefined or throw (depending on contract)
        // Otherwise return head node value
    }

    /* ================= Push & Pop ================= */

    push_front(val) {
        let newNode = new Node(val);
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
            this.#size++;
            return
        }
        let current = this.#head;
        while(current.next){
            current = current.next;
        }   
        current.next = newNode;
        this.#size++;
        // If list empty:  1 2 3 4 
         //   Must create new head node
        // Else:
        //   Must traverse to last node
        //   Must attach new node at end
        // Must increase size
    }

    pop_front() {
        if(this.isEmpty()) return undefined
        const val = this.#head.value
        this.#head = this.#head.next;
        this.#size--;
        return val;
        // If empty → return undefined or throw
        // Must remove head node
        // Must move head to next node
        // Must decrease size
        // Must return removed value
    }

    pop_back() {
        if(this.isEmpty()) return undefined
        if(this.#size === 1) {
            let val = this.#head.value;
            this.#head = null;
            this.#size--;
            return val;
        }
        let current = this.#head;
        let prev = null;
        while(current.next){
            prev = current;
            current = current.next;
        }
        prev.next = null;
        this.#size--;
        return current.value;
        // If empty → return undefined or throw
        // If only one element: 1,2,3,4,5
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
        return current.value;
        // If index invalid → return undefined or throw
        // Must traverse list from head
        // Must return value at index
        // Complexity O(n)
    }

    insert(index, val) {
        if(index < 0 || index > this.#size) return undefined;
        if(index === 0) this.push_front(val);
        if(index === this.#size) this.push_back(val);
        let newNode = new Node(val);

        let current = this.#head
        while(index--){
            let prev = current;
            current = current.next;
        }
        prev.next = newNode;
        newNode.next = current;
        this.#size++;
        // If index invalid → return or throw
        // If index === 0 → push_front
        // If index === size → push_back
        // Else:
        //   Traverse to index position
        //   Insert new node between nodes
        // Must increase size  1,3,3,4,5
    }

    erase(index) {
        if(index < 0 || index > this.#size) return undefined;
        if(index === 0) this.pop_front();
        if(index = this.#size - 1) this.pop_back()
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
        // Else:   1,2,32,3,4
        //   Traverse to node before index
        //   Skip target node
        // Must decrease size
    }

    remove(value, equals) {
        let removed = 0;

        const cmp = typeof equals === "function"? equals : (a,b) => a === b;

        while(this.#head && cmp(this.#head.value,value)){
            this.#head = this.#head.next;
            this.#size--;
            removed++;
        }

        let current = this.#head;

        while(current && current.next){
            if(cmp(current.next.value,value)){
                current.next = current.next.next;
                this.#size--;
                removed++;
            }
            else{
                current = current.next;
            }
        }

        return removed;
        // Must remove all nodes matching value
        // If equals function exists:
        //   Use equals(a, b)
        // Else:
        //   Use strict equality ===
        // Must return number of removed nodes
    }

    /* ================= Algorithms ================= */

    reverse() {
        if(!this.#head) return;
        let current = this.#head;
        let prev = null;
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
        let current = this.#head;
        return{
            next(){
                if(current){
                    let val = current.value;
                    current = current.next;
                    return {value: val, done: false};
                }
                return {value: undefined, done: true};
            }
        }
        // Must allow:
        // for (let value of list)
        // Must iterate from head → tail
        // Must not modify list
    }
}


let list = new SinglyLinkedList();
list.push_front(10);
list.push_front(20);
list.push_front(30);
list.reverse()
list.remove(10)
for(let l of list){
    console.log(l)
}




