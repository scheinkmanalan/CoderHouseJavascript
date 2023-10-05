function getValidNumber(promptMessage) {
    let num = parseFloat(prompt(promptMessage));
    while (isNaN(num)) {
        alert('Ingrese un número válido.');
        num = parseFloat(prompt(promptMessage));
    }
    return num;
}

class Calculator {
    constructor() {}

    add(num1, num2) {
        return num1 + num2;
    }

    subtract(num1, num2) {
        return num1 - num2;
    }

    multiply(num1, num2) { 
        return num1 * num2;
    }

    divide(num1, num2) {
        if (num2 === 0) {
            alert('No se puede dividir por cero.');
            return 'Error';
        }
        return num1 / num2;
    }

    initCalculator() {
        const operations = ['Sumar', 'Restar', 'Multiplicar', 'Dividir'];
        const operationFunctions = [this.add, this.subtract, this.multiply, this.divide];
        const operationSymbols = ['+', '-', '×', '÷'];

        let num1 = getValidNumber('Ingrese el primer número:');
        let num2 = getValidNumber('Ingrese el segundo número:');

        let operationChoice = prompt('Seleccione una operación:\n1. Sumar\n2. Restar\n3. Multiplicar\n4. Dividir');
        operationChoice = parseInt(operationChoice);

        if (isNaN(operationChoice) || operationChoice < 1 || operationChoice > 4) {
            alert('Ingrese una opción válida.');
            return;
        }

        const result = operationFunctions[operationChoice - 1](num1, num2);

        console.log(`Resultado: ${num1} ${operationSymbols[operationChoice - 1]} ${num2} = ${result}`);
        alert(`Resultado: ${num1} ${operationSymbols[operationChoice - 1]} ${num2} = ${result}`);
    }
}

const calculator = new Calculator();
calculator.initCalculator();
