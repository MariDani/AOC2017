let regex = /(\d+):\s(\d+)/s;

let inputArray = input.split('\n')

var firewall = [];
var range = [];
var down = [];


function calculate(){
    [firewall, range, down] = createFirewall(inputArray);

    let packetDelay = 0;
    let passed = false;
    let lastFirewall = firewall.slice() 
    let lastDown = down.slice()

    // Part One
    console.log("Part One: ", goThroughFirewall1());


    do {
        passed = !goThroughFirewall2()    
        if (packetDelay % 100000 === 0) console.log(packetDelay);
        firewall = lastFirewall.slice();
        down = lastDown.slice();
        moveScanners()
        packetDelay++;
        lastFirewall = firewall.slice();
        lastDown = down.slice();
    }
    while (!passed)


    // Part Two
    console.log("Part Two: ", packetDelay - 1); // one was added after packet path was checked
}


function goThroughFirewall1(){
    let severity = 0;
    for (let packetPosition = 0; packetPosition < firewall.length; packetPosition++){
        if (firewall[packetPosition] != undefined && firewall[packetPosition] === 1){
            severity = severity + (range[packetPosition] * packetPosition);
        }    
        moveScanners();
    }
    return severity;     
}


function goThroughFirewall2(){
    let caught = false;
    for (let packetPosition = 0; packetPosition < firewall.length; packetPosition++){
        if (firewall[packetPosition] != undefined && firewall[packetPosition] === 1){
            caught = true;
        }    
        moveScanners();
    }
    return caught
}


function createFirewall(inputArray){
    let firewall = [];
    let range = [];
    let down = [];
    for (let idx = 0; idx < inputArray.length; idx++){
        const layer = regex.exec(inputArray[idx]);
        const layerDepth = layer[1];
        const layerRange = layer[2];
        firewall[layerDepth] = 1;
        range[layerDepth] = parseInt(layerRange);
        down[layerDepth] = true;
    }   
    return [firewall, range, down];
}


function moveScanners(){
    for (let idx = 0; idx < firewall.length; idx++){
        if (firewall[idx] != undefined){
            if (down[idx]){
                firewall[idx]++;
            }
            else {
                firewall[idx]--;
            }
            if (firewall[idx] >= range[idx] || firewall[idx] <= 1){
                down[idx] = !down[idx]
            }
        }
    }
}


calculate()