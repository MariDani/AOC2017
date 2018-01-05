// (0)
// 0 (1)
// 0 (2) 1
// 0 2 (3) 1


// Part One
console.log("Part One:", PartOne())


// Part Two
console.log("Part Two:", PartTwo())


function PartOne(){
    const numSteps = 348;  
    let buffer = [0];
    let position = 0;
    const insertions = 2017;

    for (let idx = 1; idx <= insertions; idx++){
        position = (position + numSteps) % buffer.length;
        position++;
        buffer.splice(position, 0, idx);        
    }
    return buffer[position+1]
}


function PartTwo(){
    const numSteps = 348;
    let position = 0;
    let length = 1;
    let value = 0;
    const insertions = 50000000;

    for (length; length <= insertions; length++){
        position = (position + numSteps) % length + 1;
        if (position === 1) value = length;
    }
    return value
}

