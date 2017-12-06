function calculateSum(data) {
    
    let sum = 0;
    
    for (let row = 0; row <= data.length - 1; row++){
        const currentRow = data[row];

        // First Part
        // sum = firstPart(sum, currentRow);
        
        // Second Part
        sum = secondPart(sum, currentRow)

    }

    console.log(sum);
}

function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        delimiter: "\t",
        dynamicTyping: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}

parseData("day2input.csv", calculateSum);

function firstPart(sum, array){
    sum = sum + Math.max(...array) - Math.min(...array);
    return sum;
}


function secondPart(sum, array){
    for (let compare = 0; compare < array.length - 1; compare++){
        for (let compareWith = compare + 1; compareWith <= array.length - 1; compareWith++){
            if (array[compare] < array[compareWith]){
                if (array[compareWith] % array[compare] == 0) {
                    sum = sum + (array[compareWith] / array[compare])
                }
            }
            else {
                if (array[compare] % array[compareWith] == 0) {
                    sum = sum + (array[compare] / array[compareWith])
                }
            }
        }
    }
    return sum;
}