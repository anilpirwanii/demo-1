window.addEventListener('DOMContentLoaded', () => {

    const inputNumbers = document.querySelectorAll('.input-number');
    inputNumbers.forEach(input => {
        input.addEventListener('input', lowerBoundUpdate);
    });

    const gradeInput = document.getElementById('gradeInput');
    gradeInput.addEventListener('input', changeButtonState);

    createHistogram();
});

let initial_grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

let lowerBounds = {
    'A+': 95, 'A': 90, 'A-': 85, 'B+': 80, 'B': 75, 'B-': 70, 'C+': 65, 'C': 60, 'C-': 55, 'D': 50, 'F': 0,
}
let counts = {};

function changeButtonState() {
    let submitButton = document.getElementById('submitButton');
    let input = document.getElementById('gradeInput').value;
    if (isNaN(Number(input)) || input < 0 || input > 100) {
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    }
}

function lowerBoundUpdate() {
    console.log('lowerBoundUpdate');
    const input = this;
    const value = Number(input.value);
    const index = input.getAttribute('data-index');
    const feedback = document.querySelector(`.feedback[data-index="${index}"]`);
    if (isNaN(value) || value < 0 || value > 100) {
        input.classList.add('invalid');
        feedback.textContent = 'Please enter a number between 0 and 100.';
    } else {
        input.classList.remove('invalid');
        feedback.textContent = '';
    }
    let id = input.getAttribute('id').substring(3);
    lowerBounds[id] = value;
    cleanHistogram();
    createHistogram();
    console.log(lowerBounds);

}
function createHistogram() {
    counts = {};
    for (g in initial_grades) {
        updateCounts(initial_grades[g]);
    }
    updateHistogram();
}
function updateCounts(grade) {
    for (let key in lowerBounds) {
        if (grade >= lowerBounds[key]) {
            if (counts[key] != null) {
                counts[key] += 1;
            }
            else { counts[key] = 1; }
            break;
        }

    }
}
function updateHistogram() {
    for (let key in counts) {
        let bar_id = "histogram" + key;
        let histInner = document.getElementById(bar_id).querySelector(".hist-inner");
        histInner.style.width = counts[key] * 15 + "px";
        histInner.innerHTML = counts[key];
    }
}

function updateHistogramSubmit() {
    var inputValue = document.getElementById("gradeInput").value;
    initial_grades.push(inputValue);
    updateCounts(inputValue)
    updateHistogram()
}

function cleanHistogram() {
    for (let key in counts) {
        let bar_id = "histogram" + key;
        let histInner = document.getElementById(bar_id).querySelector(".hist-inner");
        histInner.style.width = "0px";
        histInner.innerHTML = "";
    }
}
