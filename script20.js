let pointsList = input.split('\n');

const regex = /p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/i;


partOne()


partTwo()


function partTwo(){
    let points = createPoints()
    // change state of points
    for (let idx = 0; idx < 500; idx++){
        checkCollision(points)
        updateStates(points)
    }
    console.log("Part Two: ", points.length)
}


function partOne(){
    let points = createPoints()
        
    // change state of points
    for (let idx = 0; idx < 500; idx++){
        updateStates(points)
    }
    // calculate distances
    let distances = calculateDistances(points)
    
    console.log("Part One: ", distances.indexOf(Math.min(...distances)))
}


function createPoints(){ 
    let points = [];
    for (let idx = 0; idx < pointsList.length; idx++){
        const properties = regex.exec(pointsList[idx]);
        let point = {
            p : [parseInt(properties[1]), parseInt(properties[2]), parseInt(properties[3])],
            v : [parseInt(properties[4]), parseInt(properties[5]), parseInt(properties[6])],
            a : [parseInt(properties[7]), parseInt(properties[8]), parseInt(properties[9])]
        }
        points.push(point);
    }
    return points
}


function updateStates(points){
    for (let idx = 0; idx < points.length; idx++){
        let point = points[idx];
        point.v[0] = point.v[0] + point.a[0];
        point.v[1] = point.v[1] + point.a[1];
        point.v[2] = point.v[2] + point.a[2];
        point.p[0] = point.p[0] + point.v[0];
        point.p[1] = point.p[1] + point.v[1];
        point.p[2] = point.p[2] + point.v[2];
    }
}


function calculateDistances(points){
    let distances = [];
    for (let idx = 0; idx < points.length; idx++){
        let point = points[idx];
        let distance = Math.abs(point.p[0]) + Math.abs(point.p[1]) + Math.abs(point.p[2]);
        distances.push(distance);
    }
    return distances
}


function checkCollision(points){
    let positions = [];
    for (let idx = 0; idx < points.length; idx++){
        positions.push(points[idx].p[0] + "," + points[idx].p[1] + "," + points[idx].p[2]);
    }

    for (let posIdx = 0; posIdx < positions.length; posIdx++){
        let duplicates = [];
        let position = positions[posIdx];
        let idx = positions.lastIndexOf(position);
        while (idx != -1) {
            duplicates.push(idx);
            idx = (idx > 0 ? positions.lastIndexOf(position, idx - 1) : -1);
        }
        if (duplicates.length > 1){
            for (let duplIdx = 0; duplIdx < duplicates.length; duplIdx++){
                points.splice(duplicates[duplIdx],1);
                positions.splice(duplicates[duplIdx],1);
            }
        }
    }
}