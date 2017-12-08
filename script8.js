let regex = /([a-z]+)\s([a-z]+)\s(\S+)\s[a-z]+\s(([a-z]+)\s\S+\s\S+)/s;

let inputArray = [];
inputArray = input.split('\n')

let instructions = [];
for (let idx = 0; idx < inputArray.length; idx++){
    instructions.push(regex.exec(inputArray[idx]))
}   

let registers = {}

let anyLargestValue = 0

for (let idx = 0; idx < instructions.length; idx++){
    const instruction = instructions[idx]
    // define registerName if not already defined
    defineRegister(instruction[1])
    defineRegister(instruction[5])

    const increment = parseInt(instruction[3]);
    const regCondition = "registers." + instruction[4]
    if (eval(regCondition)) {
        modifyRegValue(instruction[1], instruction[2], increment)
    }
}

// Part One
console.log("Part One ", getFinalLargestValue(registers))

// Part Two
console.log("Part Two: ", anyLargestValue)


function defineRegister(regName){
    if (registers[regName] == undefined){
        registers[regName] = 0  
    }
}


function modifyRegValue(regName, operator, increment){
    
    if (operator === "inc"){
        registers[regName] = registers[regName] + increment
    }
    else if (operator == "dec"){
        registers[regName] = registers[regName] - increment
    }
    else {
        console.log("Operator is different to inc or dec")
    }
    if (registers[regName] > anyLargestValue){
        anyLargestValue = registers[regName]
    }
}


function getFinalLargestValue(registers){
    let largestValue = {name: "", value: 0}
    
    Object.entries(registers).forEach(([name, value]) => {
            if (value > largestValue.value){
                largestValue.name = name;
                largestValue.value = value;
            }
        }
    );    
    return largestValue;
}

