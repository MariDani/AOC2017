function solveMaze(data) {
    let dataArray = [];
    for (let idx = 0; idx < data.length; idx++){
        dataArray.push(data[idx][0])
    }

    currentIdx = 0;
    stepsCount = 0;

    while (currentIdx < dataArray.length) {
        if (dataArray[currentIdx] === 0){
            //currentIdx is not changing
            dataArray[currentIdx]++;
        }
        else {
            let newIdx = currentIdx + dataArray[currentIdx];

            // First part
            dataArray[currentIdx]++; 

            // Second part
            // if (dataArray[currentIdx] >= 3) {
            //     dataArray[currentIdx]--; 
            // }
            // else {            
            //     dataArray[currentIdx]++; 
            // }

            currentIdx = newIdx;
        }
        stepsCount++;
    }
    console.log("Steps count is: ", stepsCount)
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

parseData("example5.csv", solveMaze);
