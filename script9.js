// string = `<>,<random characters>,<<<<>,<{!>}>,<!!>,<!!!>>,<{o"i!a,<{i<a>`
// input string loaded from another file

string = removeExclamation(string)

string = removeGarbage(string)

let sum = 0;
sum = getGroupsCount(string, sum)

// Part One
console.log("Part One: ", sum)


function removeExclamation(string){
    let newString = "";
    let exclamation = false;
    for (let idx = 0; idx < string.length; idx++){        
        if (!exclamation){
            newString = newString + string[idx];
            if (string[idx] === "!"){
                exclamation = true;
            }
        }
        else {
            exclamation = false;
        }        
    }
    return newString.replace(/!+/g, "");
}


function removeGarbage(string){
    let garbageSize = 0;
    let newString = "";
    let garbage = false;
    for (let idx = 0; idx < string.length; idx++){
        // for Part Two
        if (garbage  && string[idx] !== ">") {
            garbageSize++;
        }

        if (string[idx] === "<"){
            garbage = true;
        }
        if (!garbage){
            newString = newString + string[idx]
        }
        if (string[idx] === ">"){
            garbage = false
        } 
            
    }
    // Part Two
    console.log("Part Two: ", garbageSize)
    return newString;
}


function getGroupsCount(string, sum){
    let bracketIndex = 0;
    for (let idx = 0; idx < string.length; idx++){
        if (string[idx] == "{"){
            bracketIndex++
            sum = sum + bracketIndex;
        }
        if (string[idx] == "}"){
            bracketIndex--
        }
    }
    return sum;
}