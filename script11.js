// let path = ["se","sw","se", "sw", "sw"]
// input loaded from separe file
let path = input.match(/([a-z]+)/g)

let newPosition = createNewPosition(path)

console.log("Part One: ", calculateDistance(newPosition))


function createNewPosition(path){
    let position = {
        x: 0,
        y: 0
    }
    let maxDistance = 0;

    for (let idx = 0; idx < path.length; idx++){        
        switch (path[idx]){
            case "ne":
                position.x = position.x + 1;
                position.y = position.y - 1;
                break;
            case "se":
                position.x = position.x + 1;
                break;
            case "s":
                position.y = position.y + 1;
                break;
            case "sw":
                position.x = position.x - 1;
                position.y = position.y + 1;
                break;            
            case "nw":
                position.x = position.x - 1;
                break;  
            case "n":
                position.y = position.y - 1;
                break;                       
        }  
        let currentDistance = calculateDistance(position)
        if (currentDistance > maxDistance){
            maxDistance = currentDistance
        }
    }
    console.log("Part Two: ", maxDistance)
    return position;
}


function calculateDistance(currentPosition){
    let origin = {
        x: 0,
        y: 0
    };    
    let x = Math.abs(currentPosition.x);
    let y =  Math.abs(currentPosition.y);
    let numSteps = 0
    while (x > 0) {
        x--;
        y--;
        numSteps++;
    }
    while (y > 0){
        y--;
        numSteps++;
    }
    return numSteps;
}
