import Stack from "../Stack/stack.js";
import Queue from "../Queue/queue.js";
class Node {
    constructor(value) {
        this.value = value
        this.left = null;
        this.right = null;
    }
}

class BST {
    #root;
    #size;

    constructor() {
        this.#root = null
        this.#size = 0;
        
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return this.#size === 0
    }

    clear() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Insert / Delete ================= */

    insert(value) {
        let newNode = new Node(value);
        if(!this.#root){
            this.#root = newNode;
            this.#size++
            return;
        }
        let current = this.#root;
        while(true){
            if(value === current.value){
                return;
            }
            if(value < current.value){
                if(!current.left){
                    current.left = newNode;
                    this.#size++;
                    return;
                }
                current = current.left
            }
            else{
                if(!current.right){
                    current.right = newNode
                    this.#size++
                    return;
                }
                current = current.right;
            }
        }
    }

    insert_rec(value){
        return this.#_insert(this.#root,value)
    }

    delete(value) {

        // Must remove node with given value if exists
        // Must preserve BST structure
        // Must correctly handle 3 cases:
        //   1) Leaf node
        //   2) Node with one child
        //   3) Node with two children
        // Must decrease size if node removed
    }

    contains(value) {
        let current = this.#root;
        while(current){
            if(value === current.value){
                return true;
            }
            else if(value < current.value){
                current = current.left;
            }
            else{
                current = current.rigth
            }
        }
        return false
    }

    /* ================= Height & Depth ================= */

    get_height() {
        return this.#_get_height(this.#root)
        
    }

    get_depth(value) {
        
        // Must return distance from root to node
        // Root depth = 0
        // If value not found → return -1
    }

    #get_depth_rec(value){  
    }

    /* ================= Min / Max ================= */

    find_min() {
        if(this.is_empty()){
            return undefined;
        }
        let current = this.#root;
        while(current.left){
            current = current.left
        }
        return current.value
    }
    find_min_rec(node){
        return this.#_find_min(this.#root)
    }

    find_max() {
        if(this.is_empty()){
            return undefined;
        }
        let current = this.#root;
        while(current.right){
            current = current.right;
        }
        return current.value
    }
    find_max_rec(node){
        return this.#_find_max(this.#root)
    }

    /* ================= Traversals ================= */

    level_order() {
        let res = [];
        const qu = new Queue();
        qu.enqueue(this.#root);
        while(!qu.is_empty()){
            const node = qu.dequeue();
            res.push(node.value);
            if(node.left) qu.enqueue(node.left);
            if(node.right) qu.enqueue(node.right);
        }
        return res
        
    }

    inorder_rec() {
        return this.#_inorder(this.#root,[])
        
    }

    inorder_itr() {
        if(!this.#root) return;
        const stack = new Stack();
        let res = [];
        let current = this.#root;
        while(current || !stack.is_empty()){
            while(current){
                stack.push(current)
                current = current.left;
            }
            current = stack.pop();
            res.push(current.value);
            current = current.right;
        }
        return res
    }

    preorder_rec() {
        return this.#_preorder(this.#root,[]);
    }

    preorder_itr() {
        if(!this.#root) return;
        const stack = new Stack();
        stack.push(this.#root)
        let res = [];
        while(stack.size() > 0){
            const node = stack.pop();
            res.push(node.value);
            if(node.right) stack.push(node.right);
            if(node.left) stack.push(node.left)
        }
        return res
    }

    postorder_rec() {
        return this.#_postorder(this.#root,[])
    }

    postorder_itr() {
        if(!this.#root) return;
        const stack = new Stack();
        let res = new Stack();
        let output = [];
        stack.push(this.#root);
        while(!stack.is_empty()){
            const node = stack.pop();
            res.push(node.value)
            if(node.left) stack.push(node.left);
            if(node.right) stack.push(node.right);
        }

        while(!res.is_empty()){
            output.push(res.pop())
        }

        return output;

        // Iterative postorder traversal
        // May use two stacks
    }

    /* ================= Advanced Operations ================= */

    find_successor(value) {
        
        // Must return inorder successor of node
        // Smallest value greater than given value
        // If none → return null
    }

    find_predecessor(value) {
        // Must return inorder predecessor of node
        // Largest value smaller than given value
    }

    is_balanced(node) {
        // Must return true if tree is height-balanced
        // |height(left) - height(right)| <= 1 for all nodes
    }

    validate_BST() {
        // Must verify tree satisfies BST property
        // All nodes in left subtree < node < right subtree
    }

    /* ================= Utilities ================= */

    toArray() {
        if(!this.#root) return;
        const stack = new Stack();
        let res = [];
        let current = this.#root;
        while(current || !stack.is_empty()){
            while(current){
                stack.push(current)
                current = current.left;
            }
            current = stack.pop();
            res.push(current.value);
            current = current.right;
        }
        return res
        // Must return sorted array of values
        // Should use inorder traversal
    }

    clone() {

        // Must return deep copy of entire tree
        // New tree must not share nodes
    }

    equals(otherTree) {
        
        // Must return true if trees have identical structure AND values
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        // Must iterate tree in inorder (sorted order)
        // Must not modify tree
    }

    values() {
        // Must return iterator of values (inorder)
    }

    entries() {
        // Must return iterator of [index, value] in sorted order
    }

    /* ================= Private Helpers ================= */

    #_insert(node, value) {
        if(!node) return new Node(value);
        if(value > node.value){
            node.right = this.#_insert(node.right,value);
        }
        else if(value < node.value){
            node.left = this.#_insert(node.left,value)
        }
        return node
    }

    #_delete(node, value) {

        // Recursive deletion helper
        // Must return updated subtree root
    }

    #_find_min(node) {
        if(!node.left) return node.value;
        return this.#_find_min(node.left)
    }

    #_find_max(node) {
        if(!node.right) return node.value;
        return this.#_find_max(node.right)
        // Must return maximum value in subtree
    }

    #_get_height(node) {
        if(!node) return 0;
        const leftHeight = this.#_get_height(node.left)
        const rightHeight = this.#_get_height(node.right)
        return Math.max(rightHeight,leftHeight) + 1
    }

    #_inorder(node, result) {
        if(!node) return result;
        node.left = this.#_inorder(node.left,result)
        result.push(node.value)
        node.right = this.#_inorder(node.right,result);
        
        return result;
    
    }

    #_preorder(node, result) {
        if(!node) return result;
        result.push(node.value);
        this.#_preorder(node.right,result)
        this.#_preorder(node.left,result);

        return result
    }

    #_postorder(node, result) {
        if(!node) return result;
        this.#_postorder(node.left,result)
        this.#_postorder(node.right,result)
        result.push(node.value)

        return result;
    }
}

const bst = new BST();
bst.insert(10);
bst.insert(0);
bst.insert(20);
bst.insert(30);
bst.insert(9);
bst.insert(2);
bst.insert(40);
bst.insert(23);


console.log(bst.size())
console.log(bst.contains(11))
console.log(bst.preorder_itr())