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
    let isN = false;

    rl.on('line', (line) => {
        if (problem.amount === 0) {
            // Get number of test cases from first line
            problem.amount = Number(line)
        } else {
            if (!isN) {
                isN=true;
            }
            else {
                const s = line.split(' ').map(d => Number(d));
                testCaseHolder.push(...s);

                problem.testCases.push(testCaseHolder);
                testCaseHolder = [];
                isN=false;
            }
        }
    }).on('close', () => {
        solveProblem(problem)
        process.exit()
    })
}

readInput();

const solveProblem = (problem) => {
    function getResult(s, index) {
        s.sort(function (a,b){return a-b});
        let res=0;
        for(let i of s){
            if(i>res) res++;
        }

        console.log(`Case #${index + 1}: ${res}`);
    }

    for (let [index, testCase] of problem.testCases.entries()) {
        getResult(testCase, index);
    }
}

