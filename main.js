class Calculator {
    constructor() {
        this.previousValues = [];
    }

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

    displayPreviousValues() {
        if (this.previousValues.length === 0) {
            console.log('No hay valores anteriores almacenados.');
            return;
        }

        console.log('Valores anteriores:');
        this.previousValues.forEach((value, index) => {
            console.log(`${index}: ${value}`);
        });
    }

    initCalculator() {
        const operations = ['Sumar', 'Restar', 'Multiplicar', 'Dividir'];
        const operationFunctions = [this.add, this.subtract, this.multiply, this.divide];
        const operationSymbols = ['+', '-', '×', '÷'];

        this.displayPreviousValues();

        let usePreviousValue = false;
        if (this.previousValues.length > 0) {
            usePreviousValue = prompt('¿Desea usar un valor anterior?\n1. Sí\n2. No') === '1';
        }

        let num1;
        if (usePreviousValue) {
            this.displayPreviousValues();

            let previousValueIndex = parseInt(prompt('Seleccione un valor anterior por su índice:\n' + this.previousValues.map((value, index) => `${index}: ${value}`).join('\n')));
            if (isNaN(previousValueIndex) || previousValueIndex < 0 || previousValueIndex >= this.previousValues.length) {
                alert('Índice no válido.');
                return;
            } else {
                num1 = this.previousValues[previousValueIndex];
            }
        } else {
            num1 = parseFloat(prompt('Ingrese el primer número:'));
            if (isNaN(num1)) {
                alert('Ingrese un número válido.');
                return;
            }
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
        this.previousValues.push(result);

        console.log(`Resultado: ${num1} ${operationSymbols[operationChoice - 1]} ${num2} = ${result}`);
        alert(`Resultado: ${num1} ${operationSymbols[operationChoice - 1]} ${num2} = ${result}`);
    }
}

const calculator = new Calculator();
calculator.initCalculator();

//Permito iniciar la calculadora al clickear el boton.
document.getElementById('startCalculator').addEventListener('click', () => {
    calculator.initCalculator();
});