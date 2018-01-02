inputArray = input.split('\n');

const regex = /([a-z]{3})\s(\S{1})\s?(\S+)?/i


// Part One
let registers = [];
let values = [];
let mulCount = 0;
console.log("Part One: ", doInstructions())


function doInstructions(){
    let idx = 0
    while (idx < inputArray.length){     
        const instruction = regex.exec(inputArray[idx]);
        // console.log(instruction);
        const registerName = instruction[2];
        // check if first value is not number
        if (isNaN(registerName)){
            // check if register exists, if not create register and assing 0 value
            if (registers.indexOf(registerName) < 0){
                registers.push(registerName);
                values.push(0);
            }    
        }        
        
        switch (instruction[1]){
            case "set": 
                let setIdx = registers.indexOf(registerName);
                values[setIdx] = getModifyValue((instruction[3]), registers, values);
                break
            case "sub":
                let subIdx = registers.indexOf(registerName);
                values[subIdx] = values[subIdx] - getModifyValue((instruction[3]), registers, values);
                break
            case "mul":
                let mulIdx = registers.indexOf(registerName);
                values[mulIdx] = values[mulIdx] * getModifyValue((instruction[3]), registers, values);
                mulCount++;
                break
            case "jnz":
                let jnzIdx;
                if (isNaN(registerName)){
                     jnzIdx = registers.indexOf(registerName);
                }
                else jnzIdx = parseInt(registerName);
                if (values[jnzIdx] != 0){
                    idx = idx + getModifyValue((instruction[3]), registers, values);
                    if (idx < 0 || idx > inputArray.length - 1){
                        return mulCount;
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