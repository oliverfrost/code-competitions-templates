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

    rl.on('line', (line) => {
        if (problem.amount === 0) {
            // Get number of test cases from first line
            problem.amount = Number(line)
        } else {
            const digits = line.split(' ').map(d => Number(d));

            problem.testCases.push(digits)
        }
    }).on('close', () => {
        solveProblem(problem)
        process.exit()
    })
}

readInput();

const solveProblem = (problem) => {
    const {amount, testCases} = problem;

    for (let [index, testCase] of testCases.entries()) {
        console.log(`Case #${index + 1}:`);
        const [rows, columns] = testCase;

        let result = '';

        const firstLine = Array(columns).fill('+-');
        firstLine.push('+\n');
        firstLine[0] = '..';
        result += firstLine.join('');

        let internalLine = Array(columns).fill('+-');
        internalLine.push('+\n');
        internalLine = internalLine.join('');

        for (let i = 0; i < rows; i++) {
            const rowLine = Array(columns).fill('|.');
            rowLine.push('|\n');

            if (i === 0) {
                rowLine[0] = '..';
            }

            result += rowLine.join('');

            if (i === rows - 1) {
                result += internalLine.substring(0, internalLine.length - 1);
            } else {
                result += internalLine;
            }
        }

        console.log(result);
    }
}

