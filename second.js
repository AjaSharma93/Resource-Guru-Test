const assert = require("assert");

// JSON config of operators will support extensibility
const cases = { "+": "+", "-": "-", "x": "*", "÷": "/" }
// ES6 way to declare classes, we could also use ES5, or typescript.
class Node {
    constructor(operator, value, left = null, right = null) {
        this.operator = operator;
        this.value = value;
        this.left = left;
        this.right = right;
    }

    result() {
        // eval() does provide a shorthand for evaluating arithmetic operations.
        // this.operator==="" could also be used as the condition in this case.
        if (Object.keys(cases).includes(this.operator)) return eval(`${this.left.result()} ${cases[this.operator]} ${this.right.result()}`);
        return this.value;
    }

    toString() {
        return (Object.keys(cases).includes(this.operator)) ? `(${this.left.toString()} ${this.operator} ${this.right.toString()})` : this.value.toString();
    }
}

// Using a JSON config with a recursive builder will make the functionality reusable.
let treeConfig = {
    operator: "÷",
    left: {
        operator: "+",
        left: {
            value: 7
        },
        right: {
            operator: "x",
            left: {
                operator: "-",
                left: {
                    value: 3
                },
                right: {
                    value: 2
                }
            },
            right: {
                value: 5
            }
        }
    },
    right: { value: 6 }
}

function treeBuilder(treeConfig) {
    let left = treeConfig.left || null, right = treeConfig.right || null, value, operator;
    operator = treeConfig.operator || "";
    value = treeConfig.value || null;
    if ( left && left.constructor && left.constructor === ({}).constructor) left = treeBuilder(treeConfig.left);
    if (right && right.constructor && right.constructor === ({}).constructor) right = treeBuilder(treeConfig.right);
    return new Node(operator, value, left, right);
}

tree = treeBuilder(treeConfig)
assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());