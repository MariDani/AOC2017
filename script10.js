// let list = [0, 1, 2, 3, 4];
// let inputLength = [3, 4, 1, 5];

let list = [];
for (let idx = 0; idx < 256; idx++){
    list.push(idx);
}

let inputLength = [63,144,180,149,1,255,167,84,125,65,188,0,2,254,229,24];

let currentPosition = 0;
let skipSize = 0;


for (let idx = 0; idx < inputLength.length; idx++){
    // console.log("Starting list ", list)
    console.log("NEW CYCLE * * * * * * ")
    console.log("length ", inputLength[idx])
    console.log("current position num ", list[currentPosition])
    let sublist = [];
    
    sublist = createSublist(sublist, list, inputLength[idx], currentPosition)
    console.log("inverted sublist ", sublist)

    let position = currentPosition
    for (let sublistIdx = 0; sublistIdx < sublist.length; sublistIdx++){
        list[position] = sublist[sublistIdx]
        position++;
        if (position >= list.length){
            position = 0;
        }
    }
    console.log("Ending List", list)
    console.log("current pos", currentPosition)
    let newPosition = inputLength[idx] + skipSize;
    console.log("new pos", newPosition)
    while (newPosition > 0){        
        currentPosition++;
        newPosition--;
        if (currentPosition >= list.length){
            currentPosition = 0;
        }
    }
    console.log("current pos", currentPosition)
    console.log("current position num ", list[currentPosition])
    skipSize++;
    console.log("skip size ", skipSize)
}


// Part One
console.log("Part One ", list[0]*list[1])


function createSublist(sublist, list, length, currentPosition){
    let currentLength = currentPosition;
    for (let idx = 0; idx < length; idx++) {
        sublist.push(list[currentLength])
        currentLength++;
        if(currentLength >= list.length){
            currentLength = 0
        }
    }
    sublist = invertOrder(sublist);
    return sublist;
}


function invertOrder(array){
    let newArray = [];
    for (let idx = array.length - 1; idx >= 0; idx--){
        newArray.push(array[idx])
    }
    return newArray;
}

