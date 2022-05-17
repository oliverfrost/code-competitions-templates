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
    let isTestCaseLine = false;
    let testCaseHolder = {customersAmount: null, productsAmount: null, products: []};

    rl.on('line', (line) => {
        if (problem.amount === 0) {
            // Get number of test cases from first line
            problem.amount = Number(line)
        } else {
            if (!isTestCaseLine) {
                const [customersAccount, productsAmount] = line.split(' ').map(n => Number(n));
                testCaseHolder.customersAmount = customersAccount;
                testCaseHolder.productsAmount = productsAmount;

                isTestCaseLine = true;
            } else {
                const products = line.split(' ').map(n => Number(n)).sort((a, b) => a - b);

                testCaseHolder.products.push(products);

                if (testCaseHolder.products.length === testCaseHolder.customersAmount) {
                    problem.testCases.push(testCaseHolder);
                    isTestCaseLine = false;
                    testCaseHolder = {customersAccount: null, productsAmount: null, products: []};
                }
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
        const result = calculateButtonPushesCount(testCases[i]);

        console.log(`Case #${i + 1}: ${result}`);
    }
}

const calculateButtonPushesCount = (testCase) => {
    const {customersAmount, productsAmount, products} = testCase;

    let result = 0;
    let combinedArray = [0];

    let latestMax = 0;

    for (let i = 0; i < products.length; i++) {
        if (i === 0) {
            combinedArray.push(...products[0]);
            latestMax = products[0][productsAmount - 1]
        } else {
            const min = products[i][0];
            const max = products[i][productsAmount - 1];

            if (Math.abs(latestMax - min) > Math.abs(latestMax - max)) {
                products[i] = products[i].sort((a, b) => b - a);
                latestMax = min;
            } else {
                latestMax = max;
            }

            combinedArray.push(...products[i]);
        }
    }

    // console.log('CA: ', combinedArray);

    for (let j = 1; j < combinedArray.length; j ++) {
        result += Math.abs(combinedArray[j] - combinedArray[j - 1]);
    }

    return result;
}

