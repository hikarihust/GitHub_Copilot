// Month labels for the chart
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
const monthIds = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 
                  'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

let budgetChart = null;

// Validate inputs for negative numbers
function validateInputs() {
    const validationMessage = document.getElementById('validation-message');
    let hasErrors = false;
    let errorMessages = [];

    // Check all income and expense inputs
    const allInputs = document.querySelectorAll('.income-input, .expense-input');
    allInputs.forEach(input => {
        const value = parseFloat(input.value);
        if (input.value !== '' && (isNaN(value) || value < 0)) {
            hasErrors = true;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (hasErrors) {
        validationMessage.textContent = 'Please enter valid positive numbers. Negative values are not allowed.';
        validationMessage.style.display = 'block';
        return false;
    } else {
        validationMessage.style.display = 'none';
        return true;
    }
}

// Collect data from inputs
function collectData() {
    const incomeData = [];
    const expenseData = [];

    monthIds.forEach(monthId => {
        const incomeInput = document.getElementById(`income-${monthId}`);
        const expenseInput = document.getElementById(`expense-${monthId}`);
        
        // Treat empty fields as zero
        const income = incomeInput.value === '' ? 0 : parseFloat(incomeInput.value) || 0;
        const expense = expenseInput.value === '' ? 0 : parseFloat(expenseInput.value) || 0;
        
        incomeData.push(income);
        expenseData.push(expense);
    });

    return { incomeData, expenseData };
}

// Update or create the chart
function updateChart() {
    // Validate inputs first
    if (!validateInputs()) {
        return;
    }

    const { incomeData, expenseData } = collectData();
    const canvas = document.getElementById('budgetChart');
    const placeholder = document.getElementById('chart-placeholder');

    // Check if there's any data
    const hasData = incomeData.some(val => val > 0) || expenseData.some(val => val > 0);

    if (!hasData) {
        // Show placeholder, hide chart
        placeholder.style.display = 'block';
        canvas.style.display = 'none';
        if (budgetChart) {
            budgetChart.destroy();
            budgetChart = null;
        }
        return;
    }

    // Hide placeholder, show chart
    placeholder.style.display = 'none';
    canvas.style.display = 'block';

    // Destroy existing chart if it exists
    if (budgetChart) {
        budgetChart.destroy();
    }

    // Create new chart
    const ctx = canvas.getContext('2d');
    budgetChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: '#28a745',
                    borderColor: '#28a745',
                    borderWidth: 1
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: '#dc3545',
                    borderColor: '#dc3545',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Income vs Expenses'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Event listeners
window.onload = function() {
    // Add input validation listeners
    const allInputs = document.querySelectorAll('.income-input, .expense-input');
    allInputs.forEach(input => {
        input.addEventListener('input', validateInputs);
    });

    // Listen for tab changes
    const chartTab = document.getElementById('chart-tab');
    chartTab.addEventListener('shown.bs.tab', function() {
        updateChart();
    });
};