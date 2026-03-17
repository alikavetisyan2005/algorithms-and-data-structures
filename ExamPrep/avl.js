import Queue from "../Queue/queue";

class Node {
    value;
    left = null;
    right = null;
    height = 1;

    constructor(value = null) {
        this.left = null;;
        this.right = null;
        this.height = 1;
        this.value = value
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
        this.#root = null;
        this.#size = 0;
        // Must remove entire tree
        // Must set root = null
        // Must set size = 0
    }

    /* ================= Core AVL Operations ================= */

    insert(value) {
        this.#root = this.#insert(this.#root,value);
        this.#size++;
        // Must insert value using BST insertion rules
        // Must rebalance tree after insertion
        // Must update node heights
        // Must increase size if inserted
        // Must ignore duplicates (or follow chosen contract)
    }

    delete(value) {
        this.#root = this.#delete(this.#root,value);
        this.#size--;
        // Must remove node if exists
        // Must rebalance tree after deletion
        // Must update heights
        // Must decrease size if removed
    }

    search(value) {
        return this.#search(this.#root,value)
        // Must return true if value exists
        // Otherwise false
    }

    /* ================= Height / Min / Max ================= */

    getHeight() {
        if(!this.#root) return 0;
        return this.#root.height;
        // Must return height of entire tree
        // Empty tree height = 0
    }

    getMin() {
        return this.#getMin(this.#root);
        // Must return smallest value node
        // Traverse leftmost path
    }

    getMax() {
        return this.#getMax(this.#root)
        // Must return largest value node
        // Traverse rightmost path
    }

    /* ================= Traversals ================= */

    levelOrder() {
        if(!this.#root) return [];
        let res = [];
        let qu = new Queue();
        qu.enqueue(this.#root);
        while(!qu.is_empty()){
            let size = qu.size();
            for(let i = 0;i < size;i++){
                let node = qu.dequeue();
                res.push(node.value);
                if(node.left) qu.enqueue(node.left);
                if(node.right) qu.enqueue(node.right);
            }
        }
        return res;
        // Must perform BFS traversal using Queue
        // Must return values level by level
    }

    preorder_rec() {
        let res = []
        this.#preorder_rec(this.#root,res);
        return res
        // Traversal: root → left → right (recursive)
    }

    preorder_itr() {
        if(!this.#root) return [];
        let stack = [];
        let res = [];
        stack.push(this.#root);
        while(stack.length > 0){
            let node = stack.pop();
            res.push(node.value);
            if(node.right) stack.push(node.right);
            if(node.left) stack.push(node.left);
        }
        return res

        //5,2,7 [5,]  [7,2] 
        // Iterative preorder traversal using stack
    }

    inorder_rec() {
        let res = []
        
        this.#inorder_rec(this.#root);
        return res;
        // Traversal: left → root → right
        // Must return sorted values
    }

    inorder_itr() {
        if(!this.#root) return [];
        let stack = [];
        let current = this.#root;
        let res = [];
        while(current || stack.length > 0){
            while(current){
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            res.push(current.value);
            current = current.right;
        }  
        return res; 
        // Iterative inorder traversal using stack
    }

    postorder_rec() {
        let res = []
        return this.#postorder_rec(this.#root,res);
        return res;
        // Traversal: left → right → root
    }

    postorder_itr() {
        if(!this.#root) return [];
        let stack = [this.#root];
        let res = [];
        let output = [];
        while(stack.length > 0){
            let node = stack.pop();
            res.push(node.value);
            if(node.left) stack.push(node.left);
            if(node.right) stack.push(node.right);
        }

        while(res.length > 0){
            output.push(res.pop());
        }

        return output;
        // Iterative postorder traversal using two stacks
    }

    /* ================= AVL Balancing ================= */

    #insert(node, value) {
        if(!node){ 
            this.#size++;
            return new Node(value);
        }

        if(value < node.value){
            node.left = this.#insert(node.left,value);
        }
        if(value > node.value){
            node.right = this.#insert(node.right,value)
        }
        else{
            return node;
        }

        node.height = 1 + Math.max(this.#getHeight(node.left),this.#getHeight(node.left));
        this.#reBalance(node)

        return node;
        // Recursive BST insertion helper
        // Must return updated subtree root
        // Must update node height
        // Must rebalance subtree before returning
    }

    #delete(node, value) {
        if(!node) return node;

        if(value < node.value){
            node.left = this.#delete(node.left,value);
        }
        else if(value > node.value){
            node.right = this.#delete(node.right,value) 
        }

        else{
            if(!node.left || !node.right){
                node = node.left || node.right
            }

            const successor = this.findPredecessor(node.value);
            node.value =successor.value;
            node.right = this.#delete(node.right,successor.value)
        }

        node.height = this.#getHeight(node);
        this.#reBalance(node)

        return node;
        // Recursive deletion helper
        // Must handle:
        //   leaf node
        //   node with one child
        //   node with two children (successor replacement)
        // Must rebalance subtree
        // Must return updated subtree root
    }

    #reBalance(node) {
        const bf = this.#balanceFactor(node);
        if(bf > 1 && this.#balanceFactor(node.left) > 0){
            return this.#rotateRight(node);
        }
        if(bf > 1 && this.#balanceFactor(node.left) < 0){
            this.#rotateLeft(node.left);
            return this.#rotateRight(node);
        }

        if(bf < -1 && this.#balanceFactor(node.right) < 0){
            this.#rotateRight(node.right);
            return this.#rotateLeft(node);
        }
        if(bf < -1 && this.#balanceFactor(node.right) > 0){
            return this.#rotateLeft(node);
        }
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

        let x = node.right;
        let y = x.left;
        x.left = node;    
        node.right = y

        node.height = 1 + Math.max(this.#getHeight(node.left),this.#getHeight(node.right))
        x.height = 1 + Math.max(this.#getHeight(x.left),this.#getHeight(x.right))
        return x
        // Must perform left rotation:
        //        node                newRoot
        //          \       ->        /     \
        //        newRoot           node   T3
        //        /   \
        //      T2    T3
        // Must update heights
        // Must return new subtree root
    }

    #rotateRight(node) {
        let x = node.left;
        let y = x.right;
        x.right = node;
        node.right = y;

        return x
        // Must perform right rotation
        // Must update heights
        // Must return new subtree root
    }

    #getHeight(node) {
        if(node) return node.height;
        return 0;
        // Must return subtree height
        // Null node height = 0
    }

    /* ================= BST Helpers ================= */

    #getMin(node) {
        if(!node.left) return node;
        return this.#getMin(node.left);
        // Must return leftmost node in subtree
    }

    #getMax(node) {
        if(!node.right) return node;
        return this.#getMax(node.right);
        // Must return rightmost node in subtree
    }

    #search(node, value) {
        if(!node) return false;
        if(value === node.value) return true;
        if(value < node.value){
            this.#search(node.left,value);
        }
        else if(value > node.value){
            this.#search(node.right,value);
        }
        // Recursive BST search helper
        // Must return true if found
    }

    /* ================= DFS Helpers ================= */

    #preorder_rec(node, res) {
        if(!node) return;

        res.push(node.value);
        this.#preorder_rec(node.left);
        this.#preorder_rec(node.right);
        // Recursive preorder helper
    }

    #inorder_rec(node, res) {
        if(!node) return;

        this.#inorder_rec(node.left);
        res.push(node.value);
        this.#inorder_rec(node.right);
        // Recursive inorder helper
    }

    #postorder_rec(node, res) {
        if(!node) return;

        this.#postorder_rec(node.left);
        this.#postorder_rec(node.right)
        res.push(node.value);
        // Recursive postorder helper
    }

    /* ================= Advanced AVL Utilities ================= */

    isBalanced() {
        return Math.abs(this.#balanceFactor(this.#root)) <= 1
        // Must verify AVL invariant for all nodes:
        // |balanceFactor(node)| <= 1
    }

    validateBST() {
        // Must verify BST ordering property globally
    }

    findSuccessor(value) {
        if(!this.#root) return undefined;
        let current = this.#root;
        while(current){
            if(value < current.value){
                current = current
            }
        }
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