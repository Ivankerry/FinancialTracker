// Initialize an array to hold the expenses
let expenses = [];

// DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseDescriptionInput = document.getElementById('expense-description');
const expenseList = document.getElementById('expense-list');
const totalExpensesDisplay = document.getElementById('total-expenses');
const categoryFilter = document.getElementById('category-filter');

// Event listener for form submission
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);
    const expenseCategory = expenseCategoryInput.value;
    const expenseDescription = expenseDescriptionInput.value;

    // Create a new expense object
    const expense = {
        name: expenseName,
        amount: expenseAmount,
        category: expenseCategory,
        description: expenseDescription
    };

    // Add the expense to the array
    expenses.push(expense);

    // Clear the form
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    expenseCategoryInput.value = '';
    expenseDescriptionInput.value = '';

    // Update the expense list and total
    updateExpenseList();
});

// Function to update the displayed list of expenses
function updateExpenseList() {
    // Clear the current list
    expenseList.innerHTML = '';

    // Filter expenses if a category is selected
    const filterCategory = categoryFilter.value;
    const filteredExpenses = filterCategory ? 
        expenses.filter(expense => expense.category === filterCategory) : 
        expenses;

    // Loop through the expenses and display them
    filteredExpenses.forEach(expense => {
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <strong>${expense.name}</strong><br>
            Amount: $${expense.amount}<br>
            Category: ${expense.category}<br>
            Description: ${expense.description || 'N/A'}
        `;
        expenseList.appendChild(expenseItem);

        // Add a temporary highlight effect when the item is added
        setTimeout(() => {
            expenseItem.classList.add('highlight');
            setTimeout(() => expenseItem.classList.remove('highlight'), 1000);
        }, 100);
    });

    // Update total expenses
    const totalExpenses = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
    totalExpensesDisplay.innerText = `Total Expenses: $${totalExpenses.toFixed(2)}`;
}

// Event listener for category filter
categoryFilter.addEventListener('change', updateExpenseList);
