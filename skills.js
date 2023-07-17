function calculateNumbers() {
    var firstNumber = document.getElementById('firstNumber').value;
    var secondNumber = document.getElementById('secondNumber').value;
    var result = parseInt(firstNumber) * parseInt(secondNumber);
    document.getElementById('result').value = result;
}