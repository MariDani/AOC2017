const factorA = 16807;
const factorB = 48271;

const divisor = 2147483647;

let startValueA = 883;
let startValueB = 879;


function calculate(){
    // Part One
    console.log("Part One: ", generatePairs1())

    // Part Two
    console.log("Part Two: ", generatePairs2())
}


function generatePairs1(){
    let lastValueA = startValueA;
    let lastValueB = startValueB;
    let matchCount = 0;
    for (let idx = 0; idx < 40000000; idx++){
        lastValueA = (lastValueA * factorA) % divisor
        lastValueB = (lastValueB * factorB) % divisor
        if (idx % 1000000 === 0) console.log(idx);
        if (createBinaryString(lastValueA).substring(16) == createBinaryString(lastValueB).substring(16)){
            matchCount++;
        }
    }
    return matchCount;
}


function generatePairs2(){
    let lastValueA = startValueA;
    let lastValueB = startValueB;
    let matchCount = 0;
    for (let idx = 0; idx < 5000000; idx++){
        do {
            lastValueA = (lastValueA * factorA) % divisor
        } while((lastValueA % 4) !=  0) 
        do {
            lastValueB = (lastValueB * factorB) % divisor
        } while((lastValueB % 8) !=  0) 
        if (idx % 1000000 === 0) console.log(idx);
        if (createBinaryString(lastValueA).substring(16) == createBinaryString(lastValueB).substring(16)){
            matchCount++;
        }
    }
    return matchCount;
}


// taken from https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
function createBinaryString (nMask) {
    // nMask must be between -2147483648 and 2147483647
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
         nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return sMask;
  }


calculate()