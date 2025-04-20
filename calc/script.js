let display = document.getElementById('display');


function appendValue(value) {
    display.value = display.value += value;
}


function clearDisplay() {
    display.value = '';
}


function deleteLast() {
    display.value = display.value.slice(0, -1);
}


function calculate() {
    try {
        // Handle the input as a string to avoid octal conversion
        display.value = eval(display.value.replace(/^0+/, ''));
    }
    catch {
        display.value = 'Error';
    }
}