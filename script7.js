function solvePrograms(data) {
    
    // loop through each row of the data (program)
    let programs = [];
    programs = createAllPrograms(programs, data)


    // find only those programs which have subtowers
    let subtowersPrograms = [];
    subtowersPrograms = findsubtowersPrograms(programs, subtowersPrograms);

    // find bottom program
    const bottomProgram = findBottomProgram(subtowersPrograms)
    // First Part solution
    console.log("Bottom program is: ", bottomProgram);

    checkWeightBalance(bottomProgram, programs);

}

function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        dynamicTyping: true,
        delimiter: " ",
        complete: function(results) {
            callBack(results.data);
        }
    });
}

parseData("day7input.csv", solvePrograms);



function createAllPrograms(programs, data){
    for (let programIdx = 0; programIdx < data.length; programIdx++){
        programs[programIdx] = {};
        const program = data[programIdx];

        // extract program's name
        programs[programIdx].name = program[0];

        // extract program's weight
        const weight = program[1];
        programs[programIdx].weight = parseInt(weight.substr(1,2));

        // determine if program has sub-towers
        if (program[2]){
            programs[programIdx].subtowers = []
            for (let idx = 3; idx < program.length; idx ++){
                const subtowerName = program[idx];
                programs[programIdx].subtowers[idx-3] = subtowerName.replace(",","");
            }
        }
    }
    return programs;
}


function findsubtowersPrograms(programs, subtowersPrograms){
    for (let idx = 0; idx < programs.length; idx++){
        if (programs[idx].subtowers){
            subtowersPrograms.push(programs[idx])
        }
    }
    return subtowersPrograms;
}


function findBottomProgram(subtowersPrograms){
    // create array with names of subtowers
    let subtowers = [];
    for (let idx = 0; idx < subtowersPrograms.length; idx++){
        for (let subtowerIdx = 0; subtowerIdx < subtowersPrograms[idx].subtowers.length; subtowerIdx++){
            subtowers.push(subtowersPrograms[idx].subtowers[subtowerIdx])
        }
    }

    for (let idx = 0; idx < subtowersPrograms.length; idx++){
        const name = subtowersPrograms[idx].name;
        if (!subtowers.includes(name)){
            return name
        }
    }    
}


function checkWeightBalance(program, programs){
    let programsStructure = getProgramObject(program, programs);
    programsStructure = createProgramsStructure(programsStructure, programs);

    console.log(programsStructure);

    let weightSum = [];

    for (let idx = 0; idx < programsStructure.subtowers.length; idx ++){
        weightSum[idx] = programsStructure.subtowers[idx].weight
        weightSum[idx] = getProgramsWeight(weightSum[idx], programsStructure.subtowers[idx], programs)
    }

    console.log(weightSum)
}


function getProgramObject(program, programs){
    for (let idx = 0; idx < programs.length; idx++){
        if (program === programs[idx].name){
            const currentProgram = programs[idx]
            programs.splice(idx, 1);
            return currentProgram;
        }
    }
}


function createProgramsStructure(parentProgram, programs){
    if (parentProgram.subtowers){
        for (let idx = 0; idx < parentProgram.subtowers.length; idx++){
            parentProgram.subtowers[idx] = getProgramObject(parentProgram.subtowers[idx], programs)
            parentProgram.subtowers[idx] = createProgramsStructure(parentProgram.subtowers[idx], programs)
        } 
    }   
    return parentProgram
}


function getProgramsWeight(weightSum, parentProgram, programs){
    if (parentProgram.subtowers){
        for (let idx = 0; idx < parentProgram.subtowers.length; idx ++){
            weightSum = weightSum + parentProgram.subtowers[idx].weight
            weightSum = getProgramsWeight(weightSum, parentProgram.subtowers[idx], programs)
        }
    }
    return weightSum;
}