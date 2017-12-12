let regex = /(\S+)\s<->\s(.+)/s;

let inputArray = [];
inputArray = input.split('\n')


let list = [];
for (let idx = 0; idx < inputArray.length; idx++){
    list.push(regex.exec(inputArray[idx]))
}   

let results = [];
// Part One
console.log("Part One: ", searchQueue(0, results).length)


// Part Two
let groupCount = 1;
for (let idx = 0; idx < list.length; idx++){
    const programId = parseInt(list[idx][1]);
    if (!results.includes(programId)){
        results = searchQueue(programId, results);
        groupCount++;
    }
}
console.log("Part Two: ", groupCount)


function searchQueue(start, results){
    let queue = [start];
    while (queue.length > 0) {
        for (let idx = 0; idx < list.length; idx++){
            const programId = parseInt(list[idx][1])
            if (queue[0] === programId){
                const children = childrenToArray(list[idx][2])
                for (let childIdx = 0; childIdx < children.length; childIdx++){
                    const childName = parseInt(children[childIdx])
                    if(!queue.includes(childName) && !results.includes(childName)){
                        queue.push(childName)
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


function childrenToArray(children){
    let array = children.match(/(\d+)/g)
    return array
}

