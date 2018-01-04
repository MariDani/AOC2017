let tape = [0];
let currentIdx = 0;
let stepCount = 0;
let state = "A";
const checkSumCount = 12459852;

runBlueprint()

// Part One
console.log("Part One:", tape.reduce((total, amount) => total + amount));


function runBlueprint(){
    while (stepCount < checkSumCount){
        switch (state) {
            case "A":
                if (tape[currentIdx] === 0){
                    tape[currentIdx] = 1;
                    moveRight()      
                    state = "B";          
                }
                // tape[currentIdx] === 1
                else {
                    moveLeft()
                    state = "E";  
                }  
                stepCount++;
                break;
    
            case "B":
                if (tape[currentIdx] === 0){
                    tape[currentIdx] = 1;
                    moveRight()
                    state = "C";
                }
                // tape[currentIdx] === 1
                else {
                    moveRight()                
                    state = "F";
                }        
                stepCount++;
                break;
    
            case "C":
                if (tape[currentIdx] === 0){
                    tape[currentIdx] = 1;
                    moveLeft()
                    state = "D";
                }
                // tape[currentIdx] === 1
                else {
                    tape[currentIdx] = 0;
                    moveRight()                
                    state = "B";
                }        
                stepCount++;
                break;
    
            case "D":
                if (tape[currentIdx] === 0){
                    tape[currentIdx] = 1;
                    moveRight()
                    state = "E";
                }
                // tape[currentIdx] === 1
                else {
                    tape[currentIdx] = 0;
                    moveLeft()                
                    state = "C";
                }        
                stepCount++;
                break;            
    
            case "E":
                if (tape[currentIdx] === 0){
                    tape[currentIdx] = 1;
                    moveLeft()
                    state = "A";
                }
                // tape[currentIdx] === 1
                else {
                    tape[currentIdx] = 0;
                    moveRight()                
                    state = "D";
                }        
                stepCount++;
                break;            
    
            case "F":
                if (tape[currentIdx] === 0){
                    tape[currentIdx] = 1;
                    moveRight()
                    state = "A";
                }
                // tape[currentIdx] === 1
                else {
                    moveRight()                
                    state = "C";
                }        
                stepCount++;
                break;
        }
    }
}


function moveRight(){
    currentIdx++;
    if (tape[currentIdx] == undefined){
        tape.push(0)
    }
}


function moveLeft(){
    currentIdx--;
    if (tape[currentIdx] == undefined){
        tape.unshift(0)
        currentIdx++;
    }
}