partOne()
partTwo()


function partOne(){
    let programs = "abcdefghijklmnop".split('');
    input.split(",").forEach((danceMove) => letsDance(danceMove, programs));

    // Part One
    console.log("Part One:", programs.join(""))
}


function partTwo(){
    let programs = "abcdefghijklmnop".split('');
    let startPoint = programs.join("");
    let iterations = 1000000000;

    for (let idx = 0; idx < iterations; idx++){
        input.split(",").forEach((danceMove) => letsDance(danceMove, programs));
        if (programs.join("") === startPoint){
            const repeatCount = idx + 1;
            idx = Math.floor(iterations/repeatCount) * repeatCount - 1;
        }
    }

    // Part Two
    console.log("Part Two:", programs.join(""))
}


function letsDance(danceMove, programs){
        switch (danceMove.charAt(0)){
            case "s":
                const spinCount = parseInt(danceMove.match(/\d+/g));
                programs.unshift(...programs.splice(-spinCount, spinCount))
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