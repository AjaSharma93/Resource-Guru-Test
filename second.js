const assert = require("assert");

const cases = {"+":"+","-":"-","x":"*","÷":"/"}
// ES6 way to declare classes, we could also use ES5, or typescript.
class Node{
    constructor(operator, value, left=null, right=null){
        this.operator = operator;
        this.value = value;
        this.left = left;
        this.right = right;
    }

    result(){
        // eval() does provide a shorthand for evaluating arithmetic operations.
        // this.operator==="" could also be used as the condition in this case.
        if(['+', '-', "x", "÷"].includes(this.operator)) return eval(`${this.left.result()} ${cases[this.operator]} ${this.right.result()}`);
        return this.value;
    }

    toString(){
        return (['+', '-', "x", "÷"].includes(this.operator)) ? `(${this.left.toString()} ${this.operator} ${this.right.toString()})` : this.value.toString();
    }
}

const tree = new Node(
    "÷",
    null,
    new Node(
        "+",
        null,
        new Node("", 7),
        new Node(
            "x",
            null,
            new Node("-", null, new Node("", 3), new Node("", 2)),
            new Node("", 5)
        )
    ),
    new Node("", 6)
);


assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());