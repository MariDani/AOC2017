
let number = 2;
let spiralIdx = 1;
let adding = true;
let stepsArray = [0,0];

for (let idx = 3; idx <= 603; idx = idx + 2){
    
    let maxSteps = idx - 1;
    let minSteps = spiralIdx;
    let steps = idx - 2;

    while (number <= idx * idx){
        number++;
        stepsArray.push(steps);
        if (!adding) {
            steps--;
            if (steps <= minSteps) {
                adding = true;
            }
        }
        else {
            steps++;
            if (steps >= maxSteps) {
                adding = false;
            }
        }
        
        
    }
    spiralIdx++;
    adding = false;
}

console.log(stepsArray[1]);
console.log(stepsArray[12]);
console.log(stepsArray[23]);

console.log(stepsArray[1024]);

console.log(stepsArray[361527]);