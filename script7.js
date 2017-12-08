const regex = /([a-z]+)\s\D(\d+)\D(\s->\s(\S.+))?/s;

let structures = []
structures = loadStructures(input, regex, structures)

let nodeList = []
nodeList = createNodeList(structures, nodeList)

const root = findRoot(structures, nodeList)
console.log("Part One: ", root)


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