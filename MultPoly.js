let difficulty = 1;
let currentProblem = "";
let correctAnswer = "";

function generateProblem() {
    // Generate two random polynomials based on the difficulty level
    let poly1 = generatePolynomial(difficulty);
    let poly2 = generatePolynomial(difficulty);
    currentProblem = `${poly1} * ${poly2}`;
    
    // Calculate the correct answer
    correctAnswer = multiplyPolynomials(poly1, poly2);
    
    // Display the problem
    document.getElementById("problem").innerText = `Solve: ${currentProblem}`;
    document.getElementById("feedback").innerText = "";
}

function generatePolynomial(difficulty) {
    let terms = [];
    for (let i = 0; i < difficulty + 1; i++) {
        let coefficient = Math.floor(Math.random() * 10) + 1; // Coefficents of x from 1 to 10
        let exponent = Math.floor(Math.random() * 3) + 1; // Powers of x from 1 to 3
        terms.push(`${coefficient}x^${exponent}`);
    }
    return terms.join(" + ");
}

function multiplyPolynomials(poly1, poly2) {
    // A simple polynomial multiplication function (simplified for this case)
    // Split polynomials by " + " to get individual terms
    let terms1 = poly1.split(" + ");
    let terms2 = poly2.split(" + ");
    
    let result = [];
    terms1.forEach(term1 => {
        terms2.forEach(term2 => {
            let [coeff1, exp1] = term1.split('x^');
            let [coeff2, exp2] = term2.split('x^');
            
            coeff1 = parseInt(coeff1);
            coeff2 = parseInt(coeff2);
            exp1 = parseInt(exp1);
            exp2 = parseInt(exp2);
            
            let newCoeff = coeff1 * coeff2;
            let newExp = exp1 + exp2;
            
            result.push(`${newCoeff}x^${newExp}`);
        });
    });
    return result.join(" + ");
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.trim();
    if (userAnswer === correctAnswer) {
        document.getElementById("feedback").innerText = "Correct! Well done!";
        difficulty++; // Increase difficulty after a correct answer
        generateProblem();
    } else {
        document.getElementById("feedback").innerText = "Incorrect. Let's go through a tutorial.";
        startTutorial();
    }
}

function startTutorial() {
    // Show tutorial
    document.getElementById("tutorial").classList.remove("hidden");
    document.getElementById("tutorial-step").innerText = "Let's begin with multiplying simple polynomials.";
    // Hide problem input to focus on tutorial
    document.getElementById("problem").innerText = "";
    document.getElementById("answer").classList.add("hidden");
    document.getElementById("feedback").classList.add("hidden");
}

function nextTutorialStep() {
    // Step through the tutorial
    document.getElementById("tutorial-step").innerText = "Step 1: Multiply the coefficients and add the exponents.";
}

generateProblem(); // Initialize the first problem
