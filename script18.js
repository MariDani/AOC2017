inputArray = input.split('\n');

const regex = /([a-z]{3})\s(\S{1})\s?(\S+)?/i


// Part One
let registers = [];
let values = [];
let soundsPlayed = [];
console.log("Part One: ", playSounds())


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


function getModifyValue(regValue, registers, values){
    let modValue = parseInt(regValue);
    if (isNaN(modValue)){
        const index = registers.indexOf(regValue)
        modValue = values[index];
    }
    return modValue;
}