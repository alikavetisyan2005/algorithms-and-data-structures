import Queue from "../Queue/queue.js";
import Stack from "../Stack/stack.js";
class Node {
    value;
    left = null;
    right = null;
    height = 1;

    constructor(value = null) {
        this.left = null;
        this.right = null;
        this.height = 1;
        // Must create AVL node storing value
        // Must initialize:
        // left = null
        // right = null
        // height = 1 (leaf node height)
    }
}

class AVL {
    #root;
    #size = 0;

    constructor() {
        this.#root = null;
        this.#size = 0;
        // Must create empty AVL tree
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
        this.#root = null
        this.#size = 0;
        // Must remove entire tree
        // Must set root = null
        // Must set size = 0
    }

    /* ================= Core AVL Operations ================= */

    insert(value) {
        this.#root = this.#insert(this.#root,value)
        // Must insert value using BST insertion rules
        // Must rebalance tree after insertion
        // Must update node heights
        // Must increase size if inserted
        // Must ignore duplicates (or follow chosen contract)
    }

    delete(value) {
        // Must remove node if exists
        // Must rebalance tree after deletion
        // Must update heights
        // Must decrease size if removed
    }

    search(value) {
        return this.#search(this.#root, value);

    }

    /* ================= Height / Min / Max ================= */

    getHeight() {
        if(!this.#root) return;
        return this.#root.height
        // Must return height of entire tree
        // Empty tree height = 0
    }

    getMin() {
        if(!this.#root) return null;
        let node = this.#root;
        while(node.left){
            node = node.left;
        }
        return node.value
    }

    getMax() {
        if(!this.#root) return null;
        let node = this.#root
        while(node.right){
            node = node.right;
        }
        return node.value;
    }

    /* ================= Traversals ================= */

    levelOrder() {
        if(!this.#root) return [];
        let queue = new Queue();
        queue.enqueue(this.#root);
        let res = [];
        while(!queue.is_empty()){
            let size = queue.size();
            let level = [];
            for(let i = 0;i < size;i++){
                let node = queue.dequeue();
                level.push(node.value);
                if(node.left) queue.enqueue(node.left);
                if(node.right) queue.enqueue(node.right);
            }
            res.push(level);
        }
        return res
    }

    preorder_rec() {
        return this.#preorder_rec(this.#root,[])
        // Traversal: root → left → right (recursive)
    }

    preorder_itr() {
        if(!this.#root) return [];
        let res = [];
        let stack = new Stack();
        stack.push(this.#root)
        while(!stack.is_empty()){
            let node = stack.pop();
            res.push(node.value);
            if(node.left) stack.push(node.right);
            if(node.right) stack.push(node.left);
        }
        return res
    }

    inorder_rec() {
        return this.#inorder_rec(this.#root,[]);
        
    }

    inorder_itr() {
        if(!this.#root) return [];
        let res = [];
        let stack = new Stack();
        let current = this.#root;

        while(current || !stack.is_empty()){
            while(current){
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            res.push(current.value);
            current = current.right
        }

        return output;
    }

    postorder_rec() {
        this.#postorder_rec(this.#root,[]);
    }

    postorder_itr() {
        if(!this.#root) return [];
        let stack = new Stack();
        let res = new Stack();
        let output = [];
        stack.push(this.#root);
        while(!stack.is_empty()){
            let node = stack.pop();
            res.push(node.value);
            if(node.left) stack.push(node.left);
            if(node.right) stack.push(node.right);
        }

        while(!res.is_empty()){
            output.push(res.pop())
        }
        return res
        
    }

    /* ================= AVL Balancing ================= */

    #insert(node, value) {
        if(!node) return new Node(value);

        if(value < node.value){
            node.left = this.#insert(node.left,value)
        }
        else if(value > node.value){
            node.right = this.#insert(node.right,value);
        }
        else{
            return node;
        }

        node.height = 1 + Math.max(this.#getHeight(node.left),this.#getHeight(node.right));

        const bf = this.#balanceFactor(node);
        if(bf > 1 && value < node.left.value){
            return this.#rotateRight(node)
        }
        if(bf < -1 && value > node.right.value){
            return this.#rotateLeft(node)
        }

        if(bf > 1 && value > node.left.value){
            node.left = this.#rotateLeft(node.left);
            return this.#rotateRight(node);
        }
        if(bf < -1 &&  value < node.right.value){
            node.right = this.#rotateRight(node.right);
            return this.#rotateLeft(node)
        }
        
    }

    #delete(node, value) {
        // Recursive deletion helper
        // Must handle:
        //   leaf node
        //   node with one child
        //   node with two children (successor replacement)
        // Must rebalance subtree
        // Must return updated subtree root
    }

    #reBalance(node) {
        
        // Must compute balance factor
        // Must perform rotations when needed:
        //   LL → rotateRight
        //   RR → rotateLeft
        //   LR → rotateLeft + rotateRight
        //   RL → rotateRight + rotateLeft
        // Must return new subtree root
    }

    #balanceFactor(node) {
        return this.#getHeight(node.left) - this.#getHeight(node.right);
        // Must return:
        // height(left subtree) - height(right subtree)
    }

    #rotateLeft(node) {

        let newRoot = node.right;
        let x = newRoot.left;
        newRoot.left = node;
        node.right = x;


        node.height = 1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));
        newRoot.height = 1 + Math.max(this.#getHeight(newRoot.left),this.#getHeight(newRoot.right))
        return newRoot;
    }

    #rotateRight(node) {
        let newRoot = node.left;
        let x = newRoot.right;
        newRoot.right = node;
        node.left = x;

        node.height = 1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));
        newRoot.height = 1 + Math.max(this.#getHeight(newRoot.left),this.#getHeight(newRoot.right))
        return newRoot;
    }

    #getHeight(node) {
        if(!node) return 0;
        return node.height;
    }

    /* ================= BST Helpers ================= */

    #getMin(node) {
        if(!node) return null;
        if(!node.left) return node.value;
        this.#getMin(node.left);
    }

    #getMax(node) {
        if(!node) return null;
        if(!node.right) return node.value;
        this.#getMax(node.right);
        // Must return rightmost node in subtree
    }

    #search(node, value) {
        if(!node) return false;
        if(node.value === value) return true;
        if(value < node.value){
            return this.#search(node.left,value);
        }
        else {
            return this.#search(node.right.value)
        }
    }

    /* ================= DFS Helpers ================= */

    #preorder_rec(node, res) {
        if(!node) return res;

        res.push(node.value);
        this.#preorder_rec(node.left.res);
        this.#preorder_rec(node.right,res);

        return res
        
    }

    #inorder_rec(node, res) {
        if(!node) return res;

        this.#inorder_rec(node.left,res);
        res.push(node.value);
        this.#inorder_rec(node.right,res);

        return res
        // Recursive inorder helper
    }

    #postorder_rec(node, res) {
        if(!node) return res;

        this.#inorder_rec(node.left,res);
        this.#inorder_rec(node.right,res);
        res.push(node.value);
        return res
        // Recursive postorder helper
    }

    /* ================= Advanced AVL Utilities ================= */

    isBalanced() {
        this.#isBalanced(this.#root)
        // Must verify AVL invariant for all nodes:
        // |balanceFactor(node)| <= 1
    }
    #isBalanced(node){
        if(!node) return true;
        const bf = Math.abs(this.#balanceFactor(node));
        if(bf > 1){
            return false;
        }
        return this.#isBalanced(node.left) && this.#isBalanced(node.right)
    }
    validateBST() {
        // Must verify BST ordering property globally
    }

    findSuccessor(value) {
        // Must return inorder successor
    }

    findPredecessor(value) {
        // Must return inorder predecessor
    }

    toArray() {
        // Must return sorted array (inorder traversal)
    }

    clone() {
        // Must deep copy entire AVL tree
        // Must not share nodes
    }

    equals(otherTree) {
        // Must return true if:
        // same structure AND same values
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        // Must iterate values in sorted order (inorder)
    }

    values() {
        // Must return iterator of values
    }

    entries() {
        // Must return iterator of [index, value] in sorted order
    }
}