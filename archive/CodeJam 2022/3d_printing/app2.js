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

    let testCaseHolder = [];

    rl.on('line', (line) => {
        if (problem.amount === 0) {
            // Get number of test cases from first line
            problem.amount = Number(line)
        } else {
            const [cyan, magenta, yellow, black] = line.split(' ').map(d => Number(d));

            testCaseHolder.push({cyan, magenta, yellow, black});

            if (testCaseHolder.length === 3) {
                problem.testCases.push(testCaseHolder);
                testCaseHolder = [];
            }
        }
    }).on('close', () => {
        solveProblem(problem)
        process.exit()
    })
}

readInput();

const solveProblem = (problem) => {
    const inkNeeded = 1000000;

    function getResult(minCyan, minMagenta, minBlack, minYellow, index) {
        let sum = minCyan + minMagenta + minBlack + minYellow;
        const min = [minCyan, minMagenta, minYellow, minBlack];
        if (sum < inkNeeded) {
            console.log(`Case #${index + 1}: IMPOSSIBLE`);
        } else {
            for (let i=0;i<min.length;i++) {
                if (sum === inkNeeded) {
                    console.log(`Case #${index + 1}: ${min[0]} ${min[1]} ${min[2]} ${min[3]}`);
                    return;
                }

                if (sum > inkNeeded && sum - min[i] <= inkNeeded) {
                    min[i] -= (sum - inkNeeded);
                    console.log(`Case #${index + 1}: ${min[0]} ${min[1]} ${min[2]} ${min[3]}`);
                    return;
                } else {
                    sum -= min[i];
                    min[i] = 0;
                }
            }

            console.log(`Case #${index + 1}: ${min[0]} ${min[1]} ${min[2]} ${min[3]}`);
            return;
        }
    }

    for (let [index, testCase] of problem.testCases.entries()) {
        const minCyan = Math.min(...testCase.map(p => p.cyan));
        const minMagenta = Math.min(...testCase.map(p => p.magenta));
        const minYellow = Math.min(...testCase.map(p => p.yellow));
        const minBlack = Math.min(...testCase.map(p => p.black));

        getResult(minCyan, minMagenta, minBlack, minYellow, index);
    }
}

