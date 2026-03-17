
const Red = "Red";
const Black = "Black";

class TreeNode{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = Red;
    }
}

class RbTree{
    #root;
    #nill;
    constructor(){
        this.#nill = new TreeNode(0);
        this.#nill.color = Black;
        this.#nill.left = this.#nill;
        this.#nill.right = this.#nill;
        this.#root = this.#nill;
    }

    insert(value){
        let newNode = new TreeNode(value);
        let parentNode = this.#nill;
        let current = this.#root;
        while(current !== this.#nill){
            parentNode = current;
            if(value < current.value){
                current = current.left;
            }
            else if(value > current.value){
                current = current.right;
            }
            else{
                return;
            }
        }

        newNode.parent = parentNode;
        if(parentNode === this.#nill){
            this.#root = newNode;
        }
        else if(newNode.value < parentNode.value){
            parentNode.left = newNode;
        }
        else{
            parentNode.right = newNode;
        }
        newNode.left = this.#nill;
        newNode.right = this.#nill;
        newNode.color = Red;
        this.insertFixup(newNode);
        return newNode
    }

    insertFixup(node){
        while(node.parent.color === Red){
            let gp = node.parent.parent;
            if(node.parent === gp.left){
                let uncle = gp.right;
                if(uncle.color === Red){
                    node.parent.color = Black;
                    uncle.color = Black
                    gp.color = Red;
                    node = gp;
                }
                else{
                    if(node === node.parent.right){
                        node = node.parent;
                        this.leftRotate(node);
                    }
                    node.parent.color = Black
                    gp.color = Red;
                    this.rightRotate(gp)
                }
            }
            else{
                let uncle = gp.left;
                if(uncle.color === Red){
                    node.parent.color = Black;
                    uncle.color = Black
                    gp.color = Red;
                    node = gp;
                }
                else{
                    if(node === node.parent.left){
                        node = node.parent
                        this.rightRotate(gp)
                    }
                    node.parent.color = Black;
                    gp.color = Red;
                    this.leftRotate(gp);
                }
            }
        }

        this.#root.color = Black;
    }

}
