// Part One
partOne()


function partOne(){
    let registers = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0
    };
    console.log("Part One: ", doInstructions(registers));
}


function doInstructions(registers){
    let mulCount = 0;
    inputArray = input.split('\n');
    const regex = /([a-z]{3})\s(\S{1})\s?(\S+)?/i

    let idx = 0
    while (idx < inputArray.length){     
        const instruction = regex.exec(inputArray[idx]);
        const registerName = instruction[2];
        
        switch (instruction[1]){
            case "set": 
                registers[`${registerName}`] = getModifyValue((instruction[3]), registers);
                idx++;
                break
            case "sub":
                registers[`${registerName}`] = registers[`${registerName}`] - getModifyValue((instruction[3]), registers);
                idx++;
                break
            case "mul":
                registers[`${registerName}`] = registers[`${registerName}`] * getModifyValue((instruction[3]), registers);
                mulCount++;
                idx++;
                break
            case "jnz":
                let jnzIdx;
                if (isNaN(registerName)){
                     jnzIdx = registers[`${registerName}`];
                }
                else jnzIdx = parseInt(registerName);
                if (jnzIdx != 0){
                    idx = idx + getModifyValue((instruction[3]), registers);
                    if (idx < 0 || idx > inputArray.length - 1){
                        return mulCount;
                    }
                }
                else idx++;
                break
        }
    }
}


function getModifyValue(regValue, registers){
    let modValue = parseInt(regValue);
    if (isNaN(modValue)){
        modValue = registers[`${regValue}`];
    }
    return modValue;
}