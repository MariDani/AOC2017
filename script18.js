// Part One
console.log("Part One:", partOne())

// Part Two
console.log("Part Two:", partTwo())

function partTwo(){
    inputArray = input.split('\n');

    let program0 = {
        registers: [],
        values : [],
        queueRcv: [],
        id: 0,
        sndCount: 0,
        idx: 0,
        terminated: false
    }

    let program1 = {
        registers: [],
        values : [],
        queueRcv: [],
        id: 1,
        sndCount: 0,
        idx: 0,
        terminated: false
    }    

    runPrograms(program0, program1.queueRcv)      
    runPrograms(program1, program0.queueRcv)
    
    while ((program0.queueRcv.length > 0 || program1.queueRcv.length > 0) && !program0.terminated && !program0.terminated){
        runPrograms(program0, program1.queueRcv)  
        runPrograms(program1, program0.queueRcv)
    }

    return program1.sndCount
}

function runPrograms(program, queueSnd){ 
    let idx = program.idx;
    let registers = program.registers;
    let values = program.values;
    let queueRcv = program.queueRcv;
    const regex = /([a-z]{3})\s(\S{1})\s?(\S+)?/i;

    while (idx < inputArray.length){
        program.idx = idx;
        const instruction = regex.exec(inputArray[idx]);
        // console.log(instruction);
        const registerName = instruction[2];
        // check if register is not a number
        if (isNaN(registerName)){
            // check if register exists, if not create register and assing 0 value
            if (registers.indexOf(registerName) < 0){
                registers.push(registerName);
                values.push(program.id);
            } 
        }           
        switch (instruction[1]){
            case "snd": 
                if (isNaN(registerName)){
                    queueSnd.push(values[registers.indexOf(registerName)]);
                }
                else queueSnd.push(parseInt(registerName));
                program.sndCount++;
                break;
            case "set": 
                let setIdx = registers.indexOf(registerName);
                values[setIdx] = getModifyValue((instruction[3]), registers, values);
                break;
            case "add":
                let addIdx = registers.indexOf(registerName);
                values[addIdx] = values[addIdx] + getModifyValue((instruction[3]), registers, values);
                break;
            case "mul":
                let mulIdx = registers.indexOf(registerName);
                values[mulIdx] = values[mulIdx] * getModifyValue((instruction[3]), registers, values);
                break;
            case "mod":
                let modIdx = registers.indexOf(registerName);
                values[modIdx] = values[modIdx] % getModifyValue((instruction[3]), registers, values);
                break;
            case "rcv":
                if (queueRcv.length > 0){
                    let rcvIdx = registers.indexOf(registerName);
                    values[rcvIdx] = queueRcv.shift();
                }  
                else {  
                    return 
                }
                break;
            case "jgz":
                if (isNaN(registerName)){
                    let jgzIdx = registers.indexOf(registerName);
                    if (values[jgzIdx] > 0){
                        idx = idx + getModifyValue((instruction[3]), registers, values);
                        if (idx < 0 || idx > inputArray.length - 1){
                            program.terminated = true;
                            return 
                        }
                        idx--;
                    }
                }
                else {
                    if (parseInt(registerName) > 0){
                        idx = idx + getModifyValue((instruction[3]), registers, values);
                        if (idx < 0 || idx > inputArray.length - 1){
                            program.terminated = true;
                            return 
                        }
                        idx--;
                    }
                }
                break;
        }
        idx++;
    }
}


function partOne(){
    inputArray = input.split('\n');
    const regex = /([a-z]{3})\s(\S{1})\s?(\S+)?/i;

    let registers = [];
    let values = [];
    let soundsPlayed = [];

    let idx = 0;
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
                break;
            case "set": 
                let setIdx = registers.indexOf(registerName);
                values[setIdx] = getModifyValue((instruction[3]), registers, values);
                break;
            case "add":
                let addIdx = registers.indexOf(registerName);
                values[addIdx] = values[addIdx] + getModifyValue((instruction[3]), registers, values);
                break;
            case "mul":
                let mulIdx = registers.indexOf(registerName);
                values[mulIdx] = values[mulIdx] * getModifyValue((instruction[3]), registers, values);
                break;
            case "mod":
                let modIdx = registers.indexOf(registerName);
                values[modIdx] = values[modIdx] % getModifyValue((instruction[3]), registers, values);
                break;
            case "rcv":
                let rcvIdx = registers.indexOf(registerName);
                if (values[rcvIdx] != 0){                    
                    return soundsPlayed[soundsPlayed.length-1]
                }
                break;
            case "jgz":
                let jgzIdx = registers.indexOf(registerName);
                if (values[jgzIdx] > 0){
                    idx = idx + getModifyValue((instruction[3]), registers, values);
                    if (idx < 0 || idx > inputArray.length - 1){
                        return
                    }
                    idx--;
                }
                break;
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