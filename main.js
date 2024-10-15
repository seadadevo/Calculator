function display(val) {
    document.getElementById('result').value += val;
    return val;
}

function solve() {
    let x = document.getElementById('result').value;

    if (isValidExpression(x)) {
        let y = calculate(x);
        document.getElementById('result').value = y;
        return y;
    } else {
        alert("not valid");
        document.getElementById('result').value = '';
    }
}

function isValidExpression(expression) {
    const regex = /^[0-9+\-*/().\s]+$/;
    return regex.test(expression);
}

function calculate(expression) {
    try {
        let result = new Function(`return ${expression}`)();
        return result;
    } catch (error) {
        alert("error");
        return '';
    }
}

function clearScreen() {
    document.getElementById('result').value = ""
}

