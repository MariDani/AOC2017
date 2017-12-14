let regex = /(\d+):\s(\d+)/s;

let inputArray = input.split('\n')

// Part One
console.log("Part One: ", goThroughFirewall("severity"));


// let packetDelay = 0;
// let caught = true;

// while (caught){
//     let delayedTime = goThroughFirewall("delay", packetDelay)
//     debugger
//     if (delayedTime == undefined){
//         packetDelay++
//     }
//     else {
//         // Part Two
//         console.log("Part Two: ", delayedTime);        
//         caught = false;
//     }
// }


function goThroughFirewall(task, delay){
    let packetPosition = 0;
    let firewall = [];
    firewall = createFirewall();
    let severity = 0;
    let delayed = false;
    let idx = 0;
    let elapsedTime = 0;
    while (idx < firewall.length){
        if (firewall[packetPosition] != undefined){
            if (firewall[packetPosition].scanner === 1) {
                // you are caught now
                if (task === "severity") {
                    severity = severity + (firewall[packetPosition].range * firewall[packetPosition].depth)
                }           
                if (task === "delay" && delayed){
                    return
                }         
            }        
        }    
        moveScanners(firewall);
        debugger
        packetPosition++;
        idx++;             
        elapsedTime++

        if (task === "delay" && !delayed) {
            if (idx >= firewall.length){
                idx = 0;
            }
            if (elapsedTime - 1 === delay){
                delayed = true;
                idx = 0;
                packetPosition = 0;
            }
        }         
    }
    if (task === "severity"){
        return severity;             
    }
    if (task === "delay"){
        return delay
    }
}


function createFirewall(){
    let firewall = [];
    for (let idx = 0; idx < inputArray.length; idx++){
        const layer = regex.exec(inputArray[idx]);
        const layerDepth = layer[1];
        const layerRange = layer[2];
        firewall[layerDepth] = {
            depth: layerDepth,
            range: layerRange,
            scanner: 1,
            scannerDown: true
        }
    }   
    return firewall;
}


function moveScanners(firewall){
    for (let idx = 0; idx < firewall.length; idx++){
        if (firewall[idx] != undefined){
            if (firewall[idx].scannerDown){
                firewall[idx].scanner++;
            }
            else {
                firewall[idx].scanner--;
            }
            if (firewall[idx].scanner >= firewall[idx].range || firewall[idx].scanner <= 1){
                firewall[idx].scannerDown = !firewall[idx].scannerDown
            }
        }
    }
}