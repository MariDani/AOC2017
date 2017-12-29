const regex = /([a-z]+)\s\D(\d+)\D(\s->\s(\S.+))?/s;

let structures = []
structures = loadStructures(input, regex, structures)

let nodeList = []
nodeList = createNodeList(structures, nodeList)

const root = findRoot(structures, nodeList)
// Part One
console.log("Part One: ", root)


// Part Two
let unstableDisk = "";
let newUnstableDisk = root;
let towers = [];
let towersWeight = [];
let weightDifference;

balanceTowers()

console.log("Part Two:", getWeight(newUnstableDisk) - weightDifference);


function balanceTowers(){
    while (unstableDisk !== newUnstableDisk){
        unstableDisk = newUnstableDisk;
        towers = [];
        towersWeight = [];
        towers = childrenToArray(unstableDisk);
        for (let idx = 0; idx < towers.length; idx++){
            let results = searchQueue(towers[idx]); 
            towersWeight.push(calculateWeight(results));
        }    
        newUnstableDisk = findUnstableDiskName(unstableDisk, towers, towersWeight)
    }
}


function findUnstableDiskName(unstableDisk, towers, towersWeight){
    let stableWeight;
    let unstableWeight;
    for (let idx = 0; idx < towersWeight.length - 1; idx++){
        if (towersWeight.indexOf(towersWeight[idx], idx+1) < 0){
            unstableDisk = towers[idx];
            unstableWeight = towersWeight[idx];
        }
        else stableWeight = towersWeight[idx];
    }
    if (!isNaN(unstableWeight)){
        weightDifference = unstableWeight - stableWeight;
    }    
    return unstableDisk
}


function calculateWeight(array){
    let sum = 0;
    for (let idx = 0; idx < array.length; idx++){
        sum = sum + getWeight(array[idx]);
    }
    return sum;
}


function getWeight(disk){
    for (let idx = 0; idx < structures.length; idx++){
        if (disk === structures[idx][1]){
            return parseInt(structures[idx][2]);
        }
    }
}


function searchQueue(start){
    let results = [];
    let queue = [start];
    while (queue.length > 0) {
        for (let idx = 0; idx < structures.length; idx++){
            if (queue[0] === structures[idx][1]){
                const children = childrenToArray(structures[idx][1])
                for (let childIdx = 0; childIdx < children.length; childIdx++){
                    const childName = children[childIdx];
                    if(!queue.includes(childName) && !results.includes(childName)){
                        queue.push(childName);
                    }
                }
            }
        }
    
        if(!results.includes(queue[0])){        
            results.push(queue[0]);
        }
        queue.shift();
    }  
    return results
}


function childrenToArray(disk){
    let array = [];
    for (let idx = 0; idx < structures.length; idx++){
        if (structures[idx][1] === disk) {
            const regex2 = /[a-z]+/g;
            if (structures[idx][4] != undefined) {
                array = structures[idx][4].match(regex2);
            }
            return array
        }
    }
}


function loadStructures(input, regex, structures){
    let inputArray = [];
    inputArray = input.split('\n')
    for (let idx = 0; idx < inputArray.length; idx++){
        structures.push(regex.exec(inputArray[idx]))
    }
    return structures;
}


function createNodeList(structures, nodeList){
    for (let idx = 0; idx < structures.length; idx++){
        const structure = structures[idx]
        if (structure[4] != undefined){
            const childRegex = /([a-z]+)+?/g;
            let nodes = structure[4].match(childRegex);
            for (let idx = 0; idx < nodes.length; idx++){
                nodeList.push(nodes[idx])
            }
        }
    }
    return nodeList
}


function findRoot(structures, nodeList){
    for (let idx = 0; idx < structures.length; idx++){
        const structure = structures[idx]
        if (structure[4] != undefined){
            if (!nodeList.includes(structure[1])){
                return structure[1]
            }
            
        }
    }
}