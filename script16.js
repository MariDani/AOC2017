// let programs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
let programs = ["a", "b", "c", "d", "e"];
let startPrograms = programs.slice();

inputArray = input.split(",");

const regex = /([psx])(\S).?(\S)?/g;

// Part One
console.log("Part One:", letsDance().join(""))

console.log(startPrograms)
console.log(programs)

let dance = []
for (let idx = 0; idx <startPrograms.length; idx++){
    dance.push(programs.indexOf(startPrograms[idx])-idx)
} 


let lastPrograms = programs.slice()
for (let idx = 0; idx < startPrograms.length; idx++){
    let newPos = lastPrograms.indexOf(startPrograms[idx]) + dance[idx]
    if (newPos < 0){
        newPos = startPrograms.length + newPos;
    }
    if (newPos > startPrograms.length - 1){ 
        newPos = newPos - startPrograms.length;
    }
    programs[newPos] = startPrograms[idx]
}
console.log(programs)


function letsDance(){
    for (let idx = 0; idx < inputArray.length; idx++){
        let danceMove = inputArray[idx];
        switch (danceMove.charAt(0)){
            case "s":
                const spinCount = parseInt(danceMove.match(/\d+/g));
                let spined = programs.splice(programs.length - spinCount, spinCount);
                for (let spinIdx = spined.length - 1; spinIdx >= 0; spinIdx--){
                    programs.unshift(spined[spinIdx])
                }
                break;
            case "x":
                const exchange = danceMove.match(/\d+/g);
                const pos1 = programs[exchange[0]];
                const pos2 = programs[exchange[1]];
                programs[exchange[0]] = pos2;
                programs[exchange[1]] = pos1;
                break;
            case "p":
                danceMove = danceMove.substr(1);
                const partner = danceMove.match(/[a-p]+/g);
                const partner1Idx = programs.indexOf(partner[0]);
                const partner2Idx = programs.indexOf(partner[1]);
                programs[partner2Idx] = partner[0];
                programs[partner1Idx] = partner[1];
                break;    
        }

    }
    return programs
}