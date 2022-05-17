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
    let testCaseHolder = {pancakeAmount: null, levels: null};

    rl.on('line', (line) => {
        if (problem.amount === 0) {
            // Get number of test cases from first line
            problem.amount = Number(line)
        } else {
            if (lineCounter % 2 !== 0) {
                testCaseHolder.pancakeAmount = Number(line);
            } else {
                testCaseHolder.levels = line.split(' ').map(n => Number(n));
                problem.testCases.push(testCaseHolder);
                testCaseHolder = {pancakeAmount: null, levels: null};
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

    for (let i = 0; i < testCases.length; i++) {
        let result = calculateMaxPaidPancakes(testCases[i]);

        console.log(`Case #${i + 1}: ${result}`);
    }
}

const calculateMaxPaidPancakes = (testCase) => {
    const {pancakeAmount, levels} = testCase;

    // if all pancakes are equal
    if ((new Set(levels)).size === 1) {
        return pancakeAmount;
    }

    const pancakes = [];
    let levelIndex = 0;

    // fill queue of pancakes
    for (let i = 0; i < pancakeAmount; i++) {
        pancakes.push(levels[levelIndex]);
        levelIndex++;

        if (levelIndex === levels.length) {
            levelIndex = 0;
        }
    }

    let result = 0;
    let left = 0;
    let right = pancakes.length - 1;
    let maxLevel = 0;

    // console.log('Pancakes: ', pancakes, pancakeAmount);

    while (left <= right) {
        const leftPancake = pancakes[left];
        const rightPancake = pancakes[right];
        let pancakeLevel = 0;

        if (leftPancake < rightPancake) {
            pancakeLevel = pancakes[left];
            // console.log('Left', pancakeLevel);
            left++;
        } else {
            pancakeLevel = pancakes[right];
            // console.log('Right', pancakeLevel);
            right--;
        }

        if (pancakeLevel >= maxLevel) {
            // console.log('Pancake level counted: ', pancakeLevel, maxLevel);
            result++;
            maxLevel = pancakeLevel;
        }
    }

    return result;
}
