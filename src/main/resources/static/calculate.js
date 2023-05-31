window.addEventListener('DOMContentLoaded', () => {

    var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
        49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

    const inputNumbers = document.querySelectorAll('.input-number');
        
    inputNumbers.forEach(input => {
        input.addEventListener('input', () => {
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
        });
    });

    for (g in grades) {
        updateHistogram(grades[g])
    }
});

function updateHistogram(value) {
    let bar = 0;
    if (value >= 95) {
        bar = 1
    }
    else if (value >= 90) {
        bar = 2
    }
    else if (value >= 85) {
        bar = 3
    }
    else if (value >= 80) {
        bar = 4
    }
    else if (value >= 75) {
        bar = 5
    }
    else if (value >= 70) {
        bar = 6
    }
    else if (value >= 65) {
        bar = 7
    }
    else if (value >= 60) {
        bar = 8
    }
    else if (value >= 55) {
        bar = 9
    }
    else if (value > 50) {
        bar = 10
    }
    else if (value <= 50) {
        bar = 11
    }

    let bar_id = "histogram" + bar;
    let histInner = document.getElementById(bar_id).querySelector(".hist-inner");
    let current_width = histInner.style.width;
    if (current_width == null) {
        histInner.style.width = 20 + "px"
    } else {
        width_number = Number(current_width.slice(0, -2)) + 20
        histInner.style.width = width_number + "px"
    }
    
}

function updateHistogramSubmit(){
    var inputValue = document.getElementById("myInput").value;
    updateHistogram(inputValue)
    // if (isNaN(inputValue) || inputValue < 0 || inputValue > 100) {
    //     input.classList.add('invalid');
    //     feedback.textContent = 'Please enter a number between 0 and 100.';
    // } else {
    //     input.classList.remove('invalid');
    //     feedback.textContent = '';
    // }
  }