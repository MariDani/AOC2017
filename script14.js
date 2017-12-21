let disk = []

// free 0
// used 1

for (let rowIdx = 0; rowIdx < 8; rowIdx++){
    disk[rowIdx] = [];
    for (let colIdx = 0; colIdx < 8; colIdx++){
        disk[rowIdx][colIdx] = 0;
    }
}

let keyString = "flqrgnkx-1"

let numberStr = []

for (let idx = 0; idx < keyString.length; idx++){
    numberStr.push(keyString.charCodeAt(idx))
}
console.log(numberStr)

numberStr = createDenseHash(numberStr)
console.log(numberStr)

let bin = ""

for(let idx = 0 ; idx < numberStr.length; idx++){
    bin = bin + hex2bin(numberStr[idx]);
}

console.log(bin)

function hex2bin(hex){
    return ("0000" + (parseInt(hex, 16)).toString(2)).substr(-4);
}



function createDenseHash(newList){
    let denseHash = [];
    let posIdx = 0
    for (let idx = 0; idx < 16; idx++){
        for (let listIdx = 0 + 16 * posIdx ; listIdx < 16 + 16 * posIdx; listIdx++){
            denseHash[idx] = denseHash[idx]^newList[listIdx]
        }
        posIdx++
    }
    return denseHash;
}