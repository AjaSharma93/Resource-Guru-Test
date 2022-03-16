const assert = require("assert");

// In this function "flatten" I am using a combination of iterations, recursion and pass by reference to fill up the array
// It is possible to do it with just recursion and no pass by reference

function flatten(arr,flatArr){
    if(!arr || !Array.isArray(arr)) return [];
    if(!flatArr || !Array.isArray(flatArr)) flatArr = [];
    for(let i=0; i<arr.length;i++){
        if(Array.isArray(arr[i])) flatten(arr[i],flatArr)
        else flatArr.push(arr[i]);
    }
}

function tester(input){
    flatArr = [];
    flatten(input,flatArr);
    return flatArr;
}

assert.deepEqual(tester([ 1, [ 2, [ 3 ] ], 4 ]),[1,2,3,4]);
assert.deepEqual(tester([ 1, [ 2, [  ] ], 4 ]),[1,2,4]);
assert.deepEqual(tester([]),[]);
assert.deepEqual(tester([3,3,[3,1],3]),[3,3,3,1,3]);
assert.deepEqual(tester(),[]);
