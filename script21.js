// input from separate file
let rules = input.split('\n');

const regex = /(\#*\.*\#*\.*)\/?(\#*\.*\#*\.*)\/?(\#*\.*\#*\.*)\/?\s=>\s(\#*\.*\#*\.*\#*\.*)\/?(\#*\.*\#*\.*\#*\.*)\/?(\#*\.*\#*\.*\#*\.*)\/?(\#*\.*\#*\.*\#*\.*)\/?/i;

[inputRules, outputRules] = createRules()

let image = [];
image[0] = [".", "#", "."];
image[1] = [".", ".", "#"];
image[2] = ["#", "#", "#"];


let newImage = []; 

for (let iterations = 0; iterations < 18; iterations++){
    newImage = [];
    if (image[0].length % 2 === 0 && image.length % 2 === 0){
        // here the image must be divided to squares 2x2 so they can be converted to 3x3 by enhancement rules
        for (let row = 0; row < image.length; row = row + 2){
            // create matrix with 2 rows
            let row2x = [image[row], image[row+1]];
            for (let idx = 0; idx < row2x[0].length; idx = idx + 2){
                // make 2x2 squares out of the row
                let square2x2 = [row2x[0].slice(idx, idx + 2), row2x[1].slice(idx, idx + 2)];
                let outputRule = findMatchingRule(square2x2) 
                outputRuletoNewImage(outputRule, row, idx)
            }        
        }
    }
    else {
        // here the image must be divided to squares 3x3 so they can be converted to 4x4 by enhancement rules
        for (let row = 0; row < image.length; row = row + 3){
            // create matrix with 3 rows
            let row3x = [image[row], image[row+1], image[row+2]];
            for (let idx = 0; idx < row3x[0].length; idx = idx + 3){
                // make 3x3 squares out of the row
                let square3x3 = [row3x[0].slice(idx, idx + 3), row3x[1].slice(idx, idx + 3), row3x[2].slice(idx, idx + 3)];
                let outputRule = findMatchingRule(square3x3)
                outputRuletoNewImage(outputRule, row, idx)
            }        
        }
    }
    image = newImage;
    if (iterations == 4){
        // Part One
        calculateOnPixels(newImage)
    }
}

// Part Two
calculateOnPixels(newImage)


function createRules(){
    let inputRules = [];
    let outputRules = [];    
    for (let idx = 0;  idx < rules.length; idx++){
        const rule = regex.exec(rules[idx]);
        inputRules[idx] = [];
        for (let row = 0; row < 3; row++){
            if (rule[row + 1] != ""){
                inputRules[idx][row] = rule[row + 1].split("");
            }        
        }
        outputRules[idx] = [];
        for (let row = 0; row < 4; row++){
            if (rule[row + 4] != ""){
                outputRules[idx][row] = rule[row + 4].split("");
            }        
        }
    }
    return [inputRules, outputRules]
}


function findMatchingRule(square){
    // get size of the square
    const squareSize = square.length;
    for (let idx = 0; idx < inputRules.length; idx++){
        // find only those rules which apply to squareSize ( 2 or 3) input
        if (inputRules[idx].length === squareSize){
                        
            // firstly, rotate
            let matchesRule = rotate(square, inputRules[idx])
            // secondly, flip and rotate
            if (!matchesRule){
                square = flip(square)
                matchesRule = rotate(square, inputRules[idx])
            }
            if (matchesRule){
                // console.log("matches")
                return outputRules[idx]
            }
            else {
                // console.log("dont match")
            }
        }
    }
}


function isEqual(pattern, rule){
    for (let row = 0; row < pattern.length; row++){
        for (let col = 0; col < pattern.length; col++){
            if (pattern[row][col] != rule[row][col]) {
                return false
            }
        }
    }
    return true;
}


function rotate90(pattern){
    let rotatedPattern = [];
    for (let col = 0; col < pattern.length; col++){
        rotatedPattern[col] = [];
        for (let row = pattern.length - 1; row >= 0; row--){
            rotatedPattern[col].push(pattern[row][col]);
        }
    }
    return rotatedPattern
}


function flip(pattern){
    let flipedPattern = [];
    for (let row = 0; row < pattern.length; row++){
        flipedPattern[row] = [];
        for (let col = pattern.length - 1; col >= 0; col--){
            flipedPattern[row].push(pattern[row][col]);
        }
    }
    return flipedPattern
}


function rotate(square, rule){
    let matchesRule = isEqual(square, rule)
    let rotate = 0;
    while (!matchesRule && rotate < 360){
        square = rotate90(square);
        matchesRule = isEqual(square, rule)
        rotate = rotate + 90;
    }
    return matchesRule
}


function outputRuletoNewImage(rule, row, idx){
    ruleSize = rule.length;
    let startImageRow;
            if (ruleSize == 3){
                startImageRow = row / 2 * ruleSize;
            }
            else {
                //equal 4
                startImageRow = row / 3 * ruleSize;
            }
    
    if (row == 0){
        if (idx == 0){
            for (let ruleRow = 0; ruleRow < rule.length; ruleRow++){
                newImage[ruleRow] = rule[ruleRow].slice(); 
            }
        }
        else {
            for (let ruleRow = 0; ruleRow < rule.length; ruleRow++){
                for (let ruleCol = 0; ruleCol < rule.length; ruleCol++){
                    newImage[ruleRow].push(rule[ruleRow][ruleCol]);
                }            
            }
        }
    }
    
    else {
        if (idx == 0){
            for (let ruleRow = 0; ruleRow < rule.length; ruleRow++){
                newImage[ruleRow + startImageRow] = rule[ruleRow].slice();    
            }

        }
        else {
            for (let ruleRow = 0; ruleRow < rule.length; ruleRow++){
                for (let ruleCol = 0; ruleCol < rule.length; ruleCol++){
                    newImage[ruleRow + startImageRow].push(rule[ruleRow][ruleCol]); 
                } 
            }
        }
    }
}


function calculateOnPixels(image){
    let string = "";
    for (let row = 0; row < image.length; row++){
        for (let col = 0; col < image.length; col++){
            string = string + image[row][col];
        } 
    }
    string = string.replace(/\./gi, "");
    console.log("Result", string.length);
}