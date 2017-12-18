// (0)
// 0 (1)
// 0 (2) 1
// 0 2 (3) 1



// Part One
[buffer, position] = spinlock1()
console.log("Part One: ", buffer[position+1])


function spinlock1(){
    const numSteps = 348    
    let buffer = [0]
    let position = 0;

    for (let idx = 1; idx <= 2017; idx++){
        position = (position + numSteps) % buffer.length;
        position++;
        buffer.splice(position, 0, idx);        
    }
    return [buffer, position]
}