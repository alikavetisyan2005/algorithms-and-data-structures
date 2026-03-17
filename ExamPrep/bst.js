import Queue from "../Queue/queue.js"

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        // Must create tree node storing value
        // Must initialize:
        //   left child = null
        //   right child = null
    }
}

class BST {
    #root;
    #size;

    constructor() {
        this.#root = null;
        this.#size = 0;
        // Must create empty tree
        // root = null
        // size = 0
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
        // Must return number of nodes in tree
    }

    is_empty() {
        return this.#size === 0;
        // Must return true if tree has no nodes
    }

    clear() {
        this.#root = null;
        this.#size = 0;
        // Must remove all nodes
        // Must set root = null
        // Must set size = 0
    }

    /* ================= Insert / Delete ================= */


    insert(value) {
        let newNode = new Node(value)
        if(!this.#root){ 
            this.#root = newNode;
            this.#size++;
            return;
        }
        let current = this.#root;
        while(true){
            if(value < current.value){
                if(!current.left){
                    current.left = newNode;
                    break;
                }
                    current = current.left;
            }
            else if(value > current.value){
                if(!current.right) {
                    current.right = newNode;
                    break
                }
                
                    current = current.right;

            }
            else{
                return;
            }
        }

        this.#size++;
        // Must insert value preserving BST property:
        // left subtree values < node value
        // right subtree values > node value
        // Must ignore duplicates OR handle based on design contract
        // Must increase size if node inserted
    }

    delete(value) {
        
        this.#root = this.#_delete(this.#root,value);
        

        // Must remove node with given value if exists
        // Must preserve BST structure
        // Must correctly handle 3 cases:
        //   1) Leaf node
        //   2) Node with one child
        //   3) Node with two children
        // Must decrease size if node removed
    }

    contains(value) {
        if(!this.#root) return;
        let current = this.#root;
        while(current){
            if(value === current.value) return true;
            else if(value < current.value){
                current = current.left;
            }
            else{
                current = current.right;
            }
        }
        return false;

         // Must return true if value exists in tree
        // Otherwise false
    }

    /* ================= Height & Depth ================= */

    get_height() {
        
        return this.#_get_height(this.#root)
        // Must return height of tree
        // Height = number of levels
        // Empty tree height = 0
    }

    get_depth(value) {
        if(!this.#root) return;
        // if(this.#root.value === value) return 0;
        let current = this.#root;
        let depth = 0;
        while(current){
            if(value === current.value){
                depth++;
                return depth;
            }
            else if(value < current.value){
                current = current.left
            }
            else{
                current = current.right;
            }

            depth++;
        }

        return -1
        // Must return distance from root to node
        // Root depth = 0
        // If value not found → return -1
    }

    /* ================= Min / Max ================= */

    find_min() {
        if(this.is_empty()) return undefined;
        if(!this.#root) return;
        let current = this.#root;
        while(current.left){
            current = current.left;
        }
        return current.value;
        // Must return smallest value in tree
        // If empty → return undefined or throw
        // Must traverse leftmost path
    }

    find_max() {
        if(this.is_empty()) return undefined;
        if(!this.#root) return;
        let current = this.#root;
        while(current.right){
            current = current.right;
        }

        return current.value;
        // Must return largest value in tree
        // If empty → return undefined or throw
        // Must traverse rightmost path
    }

    /* ================= Traversals ================= */

    level_order() {
        if(!this.#root) return;
        let q = new Queue();
        q.enqueue(this.#root);
        let res = [];
        while(!q.is_empty()){
            let level = q.size();
            for(let i = 0;i < level;i++){
                let node = q.dequeue();
                res.push(node.value);
                if(node.left) q.enqueue(node.left);
                if(node.right) q.enqueue(node.right);
        }
        }
        return res;

        // Must return array of values using BFS
        // Must use queue
        // Order: level by level from root
    }

    inorder_rec() {
        return this.#_inorder(this.#root,[]);
        // Must return values in sorted order
        // Traversal: left → root → right
        // Recursive implementation
    }

    inorder_itr() {
        if(!this.#root) return;
        let stack = [];
        let res = [];
        let current = this.#root;
        while(current || stack.length > 0){
            while(current){
                stack.push(current);
                current = current.left;
            }
            current = stack.pop()
            res.push(current.value);
            current = current.right;
        }

        return res
        // Must perform inorder traversal using stack
        // Must return sorted values 
    }

    preorder_rec() {
        return this.#_preorder(this.#root,[]);
        // Traversal: root → left → right
        // Recursive implementation
    }

    preorder_itr() {
        if(!this.#root) return;
        let stack = [this.#root];
        let res = [];
        while(stack.length > 0){
            let node = stack.pop();
            res.push(node.value)
            if(node.right) stack.push(node.right);
            if(node.left) stack.push(node.left);
        }

        return res;
        // Iterative preorder traversal using stack
    }

    postorder_rec() {
        return this.#_postorder(this.#root,[]);
        // Traversal: left → right → root
        // Recursive implementation
    }

    postorder_itr() {
        if(!this.#root) return;
        const stack = [this.#root];
        let res = [];
        let output = [];
        while(stack.length > 0){
            let node = stack.pop();
            res.push(node.value);
            if(node.left) res.push(node.left);
            if(node.right) res.push(node.right);
        }

        while(res.length > 0){
            output.push(res.pop().value)
        }

        return output;
        // Iterative postorder traversal
        // May use two stacks
    }

    /* ================= Advanced Operations ================= */

    find_successor(value) {
        let successor = null;

        let current = this.#root;
        while(current){
            if(current.value === value){
                return this.find_min(current.right);
            }
            else if(value < current.value){
                current = current.left;
            }
            else{
                current = current.right;
            }
        }

        return null;
        // Must return inorder successor of node
        // Smallest value greater than given value
        // If none → return null
    }

    find_predecessor(value) {
        if(!this.#root) return;
        let current = this.#root
        while(current){
            if(current.value === value){
                return this.find_max(current.left);
            }
            else if(value < current.value){
                current = current.left;
            }
            else{
                current = current.right;
            }
        }

        return null;
        // Must return inorder predecessor of node
        // Largest value smaller than given value
    }

    is_balanced() {
        return Math.abs(this.#_get_height(this.#root.left) - this.#_get_height(this.#root.right)) <= 1
        // Must return true if tree is height-balanced
        // |height(left) - height(right)| <= 1 for all nodes
    }

    validate_BST() {
        // Must verify tree satisfies BST property
        // All nodes in left subtree < node < right subtree
    }

    /* ================= Utilities ================= */

    toArray() {
        if(!this.#root) return [];
        let stack = [];
        let res = [];
        let current = this.#root;
        while(current || stack.length > 0){
            while(current){
                stack.push(current);
                current = current.left;
            }
            current = stack.pop()
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
        if(!node) {
            this.#size++;
            return new Node(value);
        }

        if(value < node.value){
            node.left = this.#_insert(node.left,value);
        }
        else if(value > node.value){
            node.right = this.#_insert(node.right,value);
        }
        else{
            return;
        }

        return node;


        // Recursive insertion helper
        // Must return updated subtree root
    }

    #_delete(node, value) {
        if(!node) return node;
        if(value < node.value){
            node.left = this.#_delete(node.left,value);
        }
        else if(value > node.value){
            node.right = this.#_delete(node.right,value);

        }

        else{
            if(!node.left || !node.right){

            }
        }
        // Recursive deletion helper
        // Must return updated subtree root
    }

    #_find_min(node) {
        if(!node.left) return node;

        return this.#_find_min(node.left);
        // Must return minimum value in subtree
    }

    #_find_max(node) {
        if(!node.right) return node;
        return this.#_find_max(node.right);
        // Must return maximum value in subtree
    }

    #_get_height(node) {
        if(!node) return 0;

        let left = this.#_get_height(node.left) ;
        let right = this.#_get_height(node.right);

        return Math.max(left,right) + 1

        // Must compute subtree height recursively
    }

    #_inorder(node, result) {

        if(!node) return;

        this.#_inorder(node.left,result)
        result.push(node.value);
        this.#_inorder(node.right,result)

        return result;
        // Recursive inorder traversal helper
    }

    #_preorder(node, result) {
        if(!node) return;

        result.push(node.value);
        this.#_preorder(node.left,result)
        this.#_preorder(node.right,result)

        return result;
        // Recursive preorder traversal helper
    }

    #_postorder(node, result) {
        if(!node) return;

        this.#_postorder(node.left,result);
        this.#_postorder(node.right,result);
        result.push(node.value);

        return result
        // Recursive postorder traversal helper
    }
}