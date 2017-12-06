function getValidPassphrases(data) {
    for (let phrase = 0; phrase < data.length; phrase++){
        let phraseRow = data[phrase];

        // loop for Second part solution
        for( let string = 0; string < phraseRow.length; string ++) {
            phraseRow[string] = phraseRow[string].split('').sort().join('');
        }

        findDuplicates(data[phrase]);
    }
    console.log(validCount)
}

function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        dynamicTyping: true,
        delimiter: " ",
        complete: function(results) {
            callBack(results.data);
        }
    });
}

parseData("example4.csv", getValidPassphrases);


let passPhrase = ["aa", "bb", "cc", "dd"]
let validCount = 0;

function findDuplicates(row) {
    
    let result = [];

    row.forEach(function(element, index) {
    
    // Find if there is a duplicate or not
    if (row.indexOf(element, index + 1) > -1) {
        
        // Find if the element is already in the result array or not
        if (result.indexOf(element) === -1) {
        result.push(element);
        }
    }
    });
    if (result.length === 0) {
        validCount++;
    }
    return result;
}
    

