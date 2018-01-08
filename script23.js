// Part One
partOne()

// Part Two
partTwo()


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
                        return console.log("Part One:", mulCount);
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


// I made this part two thanks to BOT-Brad's solution https://www.reddit.com/user/BOT-Brad 
// and peasant trip's solution https://www.reddit.com/user/peasant-trip
function partTwo(){
    let reg = {
        b: 81,
        c: 0,
        d: 0,
        f: 0,
        g: 0,
        h: 0
    }
    reg["b"] = reg["b"] * 100 + 100000
    reg["c"] = reg["b"] + 17000
    do {
        reg["f"] = 1
        reg["d"] = 2        
        for (reg["d"]; reg["d"] * reg["d"] < reg["b"]; reg["d"]++) {
            if (reg["b"] % reg["d"] === 0) {
                reg["f"] = 0
                break
            }
        }
        if (reg["f"] === 0) reg["h"]++
        reg["g"] = reg["b"] - reg["c"]
        reg["b"] += 17
    } while (reg["g"] !== 0)
    
    return console.log("Part Two:", reg["h"])
}