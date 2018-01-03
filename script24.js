let inputArray = input.split('\n');

const regex = /(\d+)\/(\d+)/i;

let components = [];
let visited = [];
for (let idx = 0; idx < inputArray.length; idx++){
    const component = regex.exec(inputArray[idx])
    components[idx] = [parseInt(component[1]), parseInt(component[2])];
    visited[idx] = false;
}

let stack = [[0,0]];
let strongestBridge = 0;
let currentLength = 0;
let longestBridge = 0;
let longestBridgeStrength = 0;
let value = 0;
let reachedBottom = false;
let searchIdx = 0;


searchTree()

// Part One
console.log("Part One:", strongestBridge);


// Part Two
console.log("Part Two:", longestBridgeStrength);


function searchTree(){
    // go down the first tree branch
    searchTreeDown()
    updateStrongestBridge()
    updateLongestBridge()

    // search from bottom of the tree up
    while (currentLength > 0){
        // get value of the connecting value for the last component
        const valueIndex = stack[0].indexOf(value);
        if (valueIndex === 0) {
            value = stack[0][1];
        }
        else {
            value = stack[0][0];
        }
        searchIdx = components.indexOf(stack[0]) + 1; 
        stack.shift();
        reachedBottom = false;
        // find next value in same level
        [value, reachedBottom] = depthFirstSearch(value, searchIdx);
        // go down 
        searchTreeDown()
        updateStrongestBridge()
        updateLongestBridge()
    }
}


function searchTreeDown(){
    while (!reachedBottom){
        [value, reachedBottom] = depthFirstSearch(value, 0);
    }
}


function depthFirstSearch(value, searchIdx){
    let foundValue = false;
    let idx = searchIdx;
    while (!foundValue && idx < components.length){
        if (components[idx].includes(value) && !stack.includes(components[idx])){
            foundValue = true;
            // add component to stack
            stack.unshift(components[idx]);
            // get value of the second part of the component
            const valueIndex = components[idx].indexOf(value);
            if (valueIndex === 0) {
                value = components[idx][1];
            }
            else {
                value = components[idx][0];
            }
        }
        idx++;
    }
    return [value, !foundValue]
}


function calculateLenght(stack){
    let sum = 0;
    for (let idx = 0; idx < stack.length; idx++){
        sum = sum + stack[idx][0] + stack[idx][1]
    }
    return sum;
}


function changeToUnvisited(){
    for (let idx = 0; idx < lastRow.length; idx++){
        visited[components.indexOf(lastRow[idx])] = false;
    }
    lastRow = [];
}


function updateLongestBridge(){
    if (stack.length == longestBridge){
        longestBridge = stack.length;
        if (calculateLenght(stack) > longestBridgeStrength){
            longestBridgeStrength = calculateLenght(stack);
        }
    } else if (stack.length > longestBridge){
        longestBridge = stack.length;
        longestBridgeStrength = calculateLenght(stack);
    }
}

function updateStrongestBridge(){
    currentLength = calculateLenght(stack)
    if (currentLength > strongestBridge){
        strongestBridge = currentLength;
    }
}