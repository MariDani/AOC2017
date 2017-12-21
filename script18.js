inputArray = input.split('\n');

const regex = /([a-z]{3})\s(\S{1})\s?(\S+)?/i


// Part One
let registers = [];
let values = [];
let soundsPlayed = [];
console.log("Part One: ", playSounds())


// Part Two
// let programs0 = [];
// let values0 = [];
// let queueFrom0 = [];
// let queueFrom1 = [];
// let idx0 = 0;
// let sendCount0 = 0;
// let idx1 = 0;
// let sendCount1 = 0;
// let programs1 = [];
// let values1 = [];
// let waiting0 = false;
// [waiting0, idx0, sendCount0] = runPrograms(idx0, sendCount0, programs0, values0, 0, queueFrom0, queueFrom1)
// let waiting1 = false;
// [waiting1, idx1, sendCount1]  = runPrograms(idx1, sendCount1, programs1, values1, 1, queueFrom1, queueFrom0)

// while (waiting0 && queueFrom1.length > 0){
//     runPrograms(idx0, sendCount0, programs0, values0, 0, queueFrom0, queueFrom1)
//     while(waiting1 && queueFrom0.length > 0){
//         runPrograms(idx1, sendCount1, programs1, values1, 1, queueFrom1, queueFrom0)
        
//     }
// }





function playSounds(){
    let idx = 0
    while (idx < inputArray.length){
        const instruction = regex.exec(inputArray[idx]);
        // console.log(instruction);
        const registerName = instruction[2];
        // check if register exists, if not create register and assing 0 value
        if (registers.indexOf(registerName) < 0){
            registers.push(registerName);
            values.push(0);
        }    
        switch (instruction[1]){
            case "snd": 
                soundsPlayed.push(values[registers.indexOf(registerName)]);
                break
            case "set": 
                let setIdx = registers.indexOf(registerName);
                values[setIdx] = getModifyValue((instruction[3]), registers, values);
                break
            case "add":
                let addIdx = registers.indexOf(registerName);
                values[addIdx] = values[addIdx] + getModifyValue((instruction[3]), registers, values);
                break
            case "mul":
                let mulIdx = registers.indexOf(registerName);
                values[mulIdx] = values[mulIdx] * getModifyValue((instruction[3]), registers, values);
                break
            case "mod":
                let modIdx = registers.indexOf(registerName);
                values[modIdx] = values[modIdx] % getModifyValue((instruction[3]), registers, values);
                break
            case "rcv":
                let rcvIdx = registers.indexOf(registerName);
                if (values[rcvIdx] != 0){                    
                    return soundsPlayed[soundsPlayed.length-1]
                }
                break
            case "jgz":
                let jgzIdx = registers.indexOf(registerName);
                if (values[jgzIdx] > 0){
                    idx = idx + getModifyValue((instruction[3]), registers, values);
                    if (idx < 0 || idx > inputArray.length - 1){
                        return
                    }
                    idx--;
                }
                break
        }
        idx++;
    }
}



// function runPrograms(idx, sendCount, registers, values, id, toQueue, fromQueue){
//     while (idx < inputArray.length){
//         const instruction = regex.exec(inputArray[idx]);
//         const registerName = instruction[2];
//         if (registers.indexOf(registerName) < 0){
//             registers.push(registerName);
//             values.push(id);
//         }    
//         switch (instruction[1]){
//             case "snd": 
//                 toQueue.push(values[registers.indexOf(registerName)]);                
//                 sendCount++
//                 break
//             case "set": 
//                 let setIdx = registers.indexOf(registerName);
//                 values[setIdx] = getModifyValue((instruction[3]), registers, values);
//                 break
//             case "add":
//                 let addIdx = registers.indexOf(registerName);
//                 values[addIdx] = values[addIdx] + getModifyValue((instruction[3]), registers, values);
//                 break
//             case "mul":
//                 let mulIdx = registers.indexOf(registerName);
//                 values[mulIdx] = values[mulIdx] * getModifyValue((instruction[3]), registers, values);
//                 break
//             case "mod":
//                 let modIdx = registers.indexOf(registerName);
//                 values[modIdx] = values[modIdx] % getModifyValue((instruction[3]), registers, values);
//                 break
//             case "rcv":
//                 let rcvIdx = registers.indexOf(registerName);
//                 if (fromQueue.length > 0){
//                     values[rcvIdx] = fromQueue.shift()
//                     break
//                 }
//                 else {
//                     console.log("waiting for data in queue")
//                     console.log(id, ": ", sendCount)
//                     return [true, idx, sendCount];
//                 }
                
//             case "jgz":
//                 let jgzIdx = parseInt(registerName);
//                 if (isNaN(jgzIdx)){ 
//                     let jgzIdx = registers.indexOf(registerName);
//                     if (values[jgzIdx] > 0){
//                         idx = idx + getModifyValue((instruction[3]), registers, values);
//                         if (idx < 0 || idx > inputArray.length - 1){
//                             return [false, idx, sendCount]
//                         }
//                         idx--;
//                     }
//                 }
//                 else if (jgzIdx > 0){
//                     idx = idx + getModifyValue((instruction[3]), registers, values);
//                     if (idx < 0 || idx > inputArray.length - 1){
//                         return [false, idx, sendCount]
//                     }
//                     idx--;
//                 }                
//                 break
//         }
//         idx++;
//     }
//     return [false, idx, sendCount]
// }


function getModifyValue(regValue, registers, values){
    let modValue = parseInt(regValue);
    if (isNaN(modValue)){
        const index = registers.indexOf(regValue)
        modValue = values[index];
    }
    return modValue;
}