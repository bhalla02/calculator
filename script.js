document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = "";
    let currentOperator = "";
    let prevInput = "";
    let calculationDone = false;

    buttons.forEach((button) => {
        button.addEventListener("click", () => handleButtonClick(button.textContent));
    });

    function handleButtonClick(value) {
        if (value >= "0" && value <= "9") {
            if (calculationDone) {
                currentInput = value;
                calculationDone = false;
            } else {
                currentInput += value;
            }
            updateDisplay(prevInput + " " + currentOperator + " " + currentInput);
        } else if (value === ".") {
            if (!currentInput.includes(".")) {
                currentInput += value;
                updateDisplay(prevInput + " " + currentOperator + " " + currentInput);
            }
        } else if (value === "C") {
            clearCalculator();
        } else if (value === "+" || value === "-" || value === "*" || value === "/") {
            if (currentInput !== "") {
                prevInput = currentInput;
                currentInput = "";
                currentOperator = value;
                updateDisplay(prevInput + " " + currentOperator);
            }
        } else if (value === "=") {
            if (currentInput !== "" && prevInput !== "" && currentOperator !== "") {
                performCalculation();
            }
        }
    }

    function updateDisplay(value) {
        display.textContent = value;
    }

    function clearCalculator() {
        currentInput = "";
        currentOperator = "";
        prevInput = "";
        calculationDone = false;
        updateDisplay("0");
    }

    function performCalculation() {
        const num1 = parseFloat(prevInput);
        const num2 = parseFloat(currentInput);
        let result = 0;

        switch (currentOperator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
        }

        updateDisplay(result);
        currentInput = result.toString();
        prevInput = "";
        currentOperator = "";
        calculationDone = true;
    }
});
