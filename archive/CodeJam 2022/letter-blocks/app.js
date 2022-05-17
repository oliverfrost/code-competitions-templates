const readInput = () => {
    const readline = require('readline')
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    })

    let problem = {
        amount: 0,
        testCases: []
    }

    let lineCounter = 0;
    let testCaseHolder = {
        towersAmount: 0,
        towers: []
    };

    rl.on('line', (line) => {
        if (problem.amount === 0) {
            // Get number of test cases from first line
            problem.amount = Number(line)
        } else {
            if (lineCounter % 2 === 0) {
                testCaseHolder.towers = line.split(' ');

                problem.testCases.push(testCaseHolder);
                testCaseHolder = {
                    towersAmount: 0,
                    towers: []
                };
            } else {
                testCaseHolder.towersAmount = Number.parseInt(line);
            }
        }

        lineCounter++;
    }).on('close', () => {
        solveProblem(problem)
        process.exit()
    })
}

readInput();

const solveProblem = (problem) => {
    const {amount, testCases} = problem;

    for (let [index, testCase] of testCases.entries()) {
        console.log(`TC #${index + 1}`, testCase.towers);
        const result = combineStringFromTowers(testCase.towers, 0);
        console.log(`Case #${index + 1}: ${result}`);
    }
}

// 5
// BA BB AA CB

const combineStringFromTowers = (towers, towerIndex) => {
    if (towerIndex >= towers.length) {
        return '';
    }

    const tower = towers[towerIndex];
    const endingChar = tower.charAt(tower.length - 1);
    let result = '';

    const possibleSolutions = towers.filter((t, i) => {
        if (i === towerIndex) {
            return false;
        }

        return t.charAt(0) === endingChar;
    });

    if (!possibleSolutions.length) {
        console.log('Combinations not found. Next: ', towerIndex + 1);
        result += combineStringFromTowers(towers, towerIndex + 1);
    } else {
    }

    console.log('Final result: ', result);

    return result === '' ? 'IMPOSSIBLE' : result;
}


// [BA, BB, AA, CB] --> CBBBBAAA

/**
 * BA -> AA --> BAAA --> IMPOSSIBLE
 * BB --> BA --> AA ==> BBBAAA  -> IMPOSSIBLE
 * AA --> IMPOSSIBLE
 *
 * 2 opts:
 * CB --> BA --> AA   --> IMPOSSIBLE/INVALID
 * CB --> BB --> BA --> AA (+)
 *
 */


//
// func combine(towers, towerIndex = 0) {
//
//     let tower
//     let endingChar
//
//     let result = ''
//
//     let possibleOptions = [];
//
//     if (possibleOptions) {
//
//     } else {
//         if (towerIndex < towers.length) {
//             result = combine(towers, towerIndex + 1) // go to next tower
//         }
//     }
//
//     return result;
//
// }


// if (!towers.length) {
//     return '';
// }
// if (towerIndex >= towers.length) {
//     return '';
// }
//
// const tower = towers[towerIndex];
// const endingChar = tower.charAt(tower.length - 1);
//
// let result = '';
//
// console.log(`Initial WORD: ${tower}`);
//
// const possibleSolutions = towers.filter((t, i) => {
//     if (i === towerIndex) {
//         return false;
//     }
//
//     return t.charAt(0) === endingChar;
// });
//
// if (!possibleSolutions.length) {
//     console.log('Possible solutions not found. Next:', towerIndex + 1);
//     result = combineStringFromTowers(towers, towerIndex + 1);
// } else {
//     console.log('Possible solutions:', possibleSolutions);
//
//     for (let sol of possibleSolutions) {
//         let tows = [...towers];
//         const solIndex = tows.findIndex(t => t === sol);
//
//
//         tows[towerIndex] = tows[towerIndex] + sol;
//
//         tows.slice(solIndex, 1);
//
//         let ps = combineStringFromTowers(tows, 0);
//
//         console.log('PS', ps);
//     }
//
//
//     // result = tower + combineStringFromTowers(, 0);
// }
//
// return result;