// let memoryBank = [0,2,7,0];
let memoryBank = [0,5,10,0,11,14,13,4,11,8,8,7,1,4,12,11];
let cyclesCount = 0;
let redistributionCycles = [];
redistributionCycles.push(memoryBank.toString())
let infiniteLoop = false;

while (!infiniteLoop){  
    let maxIdx = findMaxIdx(memoryBank);
    memoryBank = blockRedistribution(maxIdx, memoryBank);    
    findDuplicateCycle(memoryBank);    
    redistributionCycles.push(memoryBank.toString());
    cyclesCount++;
}

console.log("Part One: ", cyclesCount);

function findMaxIdx(currentMemoryBank){
    let maxIndex = 0;
    let max = currentMemoryBank[0];
    for (let idx = 0; idx < currentMemoryBank.length; idx++){
        if (currentMemoryBank[idx] > max){
            maxIndex = idx;
            max = currentMemoryBank[idx]
        }
    }
    return maxIndex;
}

function blockRedistribution(index, currentMemoryBank){
    let maxBlock = currentMemoryBank[index];
    let nextBlockIdx = index;
    currentMemoryBank[index] = 0;

    while (maxBlock > 0){        
        nextBlockIdx = nextIndex(nextBlockIdx, currentMemoryBank.length);
        currentMemoryBank[nextBlockIdx]++;
        maxBlock--;        
    }
    return currentMemoryBank;
}

function nextIndex(currentIndex, size) {
    return (currentIndex + 1) % size;
}

function findDuplicateCycle(currentMemoryBank){
    if (redistributionCycles.length > 1){
        let a = currentMemoryBank.toString()
        for (let idx = 0; idx < redistributionCycles.length; idx++){
            let b = redistributionCycles[idx].toString()
            if (a === b){
                infiniteLoop = true;
                console.log("Part Two: ", redistributionCycles.length - idx)
            }
        }
    }
}