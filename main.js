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

        let num1 = parseFloat(prompt('Ingrese el primer número:'));
        if (isNaN(num1)) {
            alert('Ingrese un número válido.');
            return;
        }

        let num2 = parseFloat(prompt('Ingrese el segundo número:'));
        if (isNaN(num2)) {
            alert('Ingrese un número válido.');
            return;
        }

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
