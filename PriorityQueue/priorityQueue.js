class Priority_Queue {
    #heap;
    #cmp;
    #size;

    #max_heap;
    #min_heap;

    constructor(cmp = (a, b) => a - b) {
        this.#heap = [];
        this.#size = 0;
        if(typeof cmp !== "function") throw new Error("cmp must be a function");
        this.#cmp = cmp
        let test = cmp(1,2)
        if(test <= 0){
            this.#min_heap = true;
            this.#max_heap = false;
        }
        else{
            this.#max_heap = true;
            this.#min_heap = false;
        }
        // Must initialize empty heap container

        // cmp must be comparison function
        // If cmp is invalid → throw Error

        // Must determine heap type:
        // if cmp(a,b) <= 0 → min heap
        // otherwise → max heap

        // Must initialize:
        // heap storage
        // size = 0
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
        // Must return number of elements in queue
    }

    is_empty() {
        return this.#size === 0
        // Must return true if queue has no elements
    }

    clear() {
        this.#heap = []
        this.#size = 0;
        // Must remove all elements
        // Must reset heap storage
        // Must set size = 0
    }

    comparator() {
        return this.#cmp;
        // Must return comparison function used by queue
    }

    /* ================= Access Operations ================= */

    peek() {
        if(this.is_empty()) return undefined;
        return this.#heap[0];
        // Must return highest priority element
        // Must NOT remove element
        // If empty → return undefined
    }

    /* ================= Modification Operations ================= */

    add(value) {

        this.#heap.push(value);
        this.#size++;

        if(this.#min_heap){
            this.#shift_up_for_min_heap(this.#size - 1);
        }
        else{
            this.#shift_up_for_max_heap(this.#size - 1);
        }
        // Must insert element at end of heap array

        // Must restore heap property using shift-up

        // If min-heap:
        //   smallest element must rise toward root

        // If max-heap:
        //   largest element must rise toward root

        // Must increase size
    }

    pop() {

        this.#swap(0,this.#size - 1);
        const value = this.#heap.pop();
        if(this.#min_heap){
            this.#shift_down_for_min_heap(0)
        }
        else{
            this.#shift_down_for_max_heap(0);
        }
        this.#size--
        return value;
        // Must remove root element (highest priority)

        // Steps:
        // 1) Swap root with last element
        // 2) Remove last element
        // 3) Restore heap property using shift-down

        // Must decrease size

        // Must return removed value
    }

    remove(value) {
        let index = -1;
        for(let i = 0;i < this.#size;i++){
            if(this.#heap[i] === value){
                index = i;
                break;
            }
        }
        if(index === -1) return;

        this.#swap(index,this.#size - 1);

        const removed = this.#heap.pop();

        if(this.#min_heap){
            this.#shift_down_for_min_heap(index);
            this.#shift_up_for_min_heap(index)
        }
        else{
            this.#shift_down_for_max_heap(index);
            this.#shift_up_for_max_heap(index);
        }

        this.#size--;
        return removed;
        // Must find index of value

        // If value exists:
        //   swap with last element
        //   remove last element
        //   restore heap property

        // If value not found → do nothing
    }

    /* ================= Heap Utilities ================= */

    toArray() {
        let arr = new Array(this.#size);
        for(let i = 0;i < this.#size;i++){
            arr[i] = this.#heap[i];
        }

        return arr;
        // Must return shallow copy of heap array
        // Must NOT modify internal heap
    }

    /* ================= Index Helpers ================= */

    #get_parent(index) {
        return Math.floor((index - 1) / 2);
        // Must return parent index
        // Formula: floor((index - 1) / 2)
    }

    #get_left_child(index) {
        return 2 * index + 1
        // Must return left child index
        // Formula: 2 * index + 1
    }

    #get_right_child(index) {
        return 2 * index + 2
        // Must return right child index
        // Formula: 2 * index + 2
    }

    #swap(i, j) {
        [this.#heap[i],this.#heap[j]] = [this.#heap[j],this.#heap[i]];
        // Must swap elements at indices i and j
    }

    /* ================= Heap Maintenance ================= */

    #shift_up_for_min_heap(index) {
        if(index === 0) return;
        let parent = this.#get_parent(index);

        if(this.#cmp(this.#heap[index], this.#heap[parent]) < 0){
            this.#swap(parent,index);
            this.#shift_up_for_min_heap(parent);
        }

        // Must restore min-heap property

        // While node < parent:
        //   swap node with parent
        // Continue until heap property satisfied
    }

    #shift_up_for_max_heap(index) {
        if(index === 0) return;
        let parent = this.#get_parent(index);
        if(this.#cmp(this.#heap[index], this.#heap[parent]) > 0){
            this.#swap(parent,index);
            this.#shift_up_for_max_heap(parent);
        }
    
    }

    #shift_down_for_min_heap(index) {
        let leftChild = this.#get_left_child(index);
        let rightChild = this.#get_right_child(index);

        let min = index;

        if(this.#heap[leftChild] < this.#heap[min]){
            min = leftChild;
        }
        if(this.#heap[rightChild] < this.#heap[min]){
            min = rightChild;
        }

        if(min !== index){
            this.#swap(min,index);
            this.#shift_down_for_min_heap(min)
        }

        
        // Must restore min-heap property after removal

        // Compare node with its children
        // Swap with smallest child if needed
        // Continue downward until heap valid
    }

    #shift_down_for_max_heap(index) {
        let leftChild = this.#get_left_child(index);
        let rightChild = this.#get_right_child(index);
        let max = index;

        if(this.#heap[leftChild] > this.#heap[max]){
            max = leftChild;
        }
        if(this.#heap[rightChild]  > this.#heap[max]){
            max = rightChild;
        }
        if(max !== index){
            this.#swap(max,index);
            this.#shift_down_for_max_heap(max);
        }
        // Must restore max-heap property after removal

        // Compare node with its children
        // Swap with largest child if needed
    }

    /* ================= Search Utility ================= */

    #indexOf(value) {
        for(let i = 0;i < this.#size;i++){
            if(this.#heap[i] === value){
                return i;
            }
        }

        return -1
        // Must search heap array for value
        // Return index if found
        // Return -1 otherwise
    }

    /* ================= Advanced Heap Operations ================= */

    heapify(array) {

        // Must build heap from arbitrary array

        // Complexity must be O(n)

        // Must use bottom-up heap construction
    }

    replace(value) {
        // Must replace root with new value

        // Must restore heap property

        // Must return previous root value
    }

    contains(value) {
        for(let i = 0;i < this.#size;i++){
            if(this.#heap[i] === value) return true;
        }

        return false;
        // Must return true if value exists in heap
        // Otherwise false
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let heap = this.#heap;
        let i = 0;
        let size = this.#size;
        return {
            next(){
                while(i < size){
                    return {value: heap[i++],done: false};
                }
                return {value: undefined,done: true}
            }
        }
        // Must iterate elements in internal heap order
        // Must NOT modify heap
    }

    values() {
        let i = 0;;
        let size = this.#size;
        let heap = this.#heap;

        return {
            next(){
                while(i < size){
                    return {value: heap[i++],done: false};
                }
                return {value: undefined, done: true}
            }
        }
        // Must return iterator of heap values
    }

    entries() {
        let i = 0;
        let heap = this.#heap;
        let size = this.#size;

        return {
            next(){
                while(i < size){
                    return {value: [i, heap[i++]], done: false};
                }
                return {value: undefined,done: true};
            }
        }
        // Must return iterator of [index, value]
    }
}