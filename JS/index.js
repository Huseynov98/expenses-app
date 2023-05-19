const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STORAGE_LABEL_LIMIT = 'limit';
const STORAGE_LABEL_EXPENSES = 'expenses';

const inputNode = document.getElementById('expenseInput');
const categorySelectNode = document.getElementById('categorySelect');
const addButtonNode = document.getElementById('addButton');
const clearButtonNode = document.getElementById('clearButton');
const totalValueNode = document.getElementById('totalValue');
const statusNode = document.getElementById('statusText');
const historyList = document.getElementById('historyList');
const changeLimitBtn = document.getElementById('changeLimitbtn');

const limitNode = document.getElementById('limitValue');
let limit = parseInt(limitNode.innerText);


function initLimit() {
    const limitFromStorage = parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT));
    if (!limitFromStorage) {
        return;
    }
    limitNode.innerText = localStorage.getItem('limit');
    limit = parseInt(limitNode.innerText);

}

initLimit();


const expenseFormStorageString = localStorage.getItem(STORAGE_LABEL_EXPENSES);
const expensesFromStorage = JSON.parse(expenseFormStorageString);
let expenses = [];
if (Array.isArray(expensesFromStorage)) {
    expenses = expensesFromStorage;
}
debugger;
render();

function getTotal()  {
    let sum = 0;
    expenses.forEach(function (expense) {
        sum += expense.amount;
    });

    return sum;
}

function renderStatus() {
    const total = getTotal(expenses);
    totalValueNode.innerText = total;

    if (total <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = 'stats__statusText_positive';
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} руб)`;
        statusNode.className = 'stats__statusText_negative';
    }
}

function renderHistory() {
    historyList.innerHTML = "";
    expenses.forEach(function (expense) {
        const historyItem = document.createElement('li');
        historyItem.className = 'rub';
        historyItem.innerText = `${expense.category} - ${expense.amount}`;
        
        historyList.appendChild(historyItem);
    });
}

function render  () {
    renderStatus();
    renderHistory();
}

function getExpenseFromUser() { 
    return parseInt(inputNode.value);
} 

function getSelectedCategory() {
    return categorySelectNode.value;
}


const clearInput = (input) => {
    inputNode.value = '';
};


function addButtonHandler() {
    const currentAmount = getExpenseFromUser();
    if (!currentAmount) {
        alert('Не задана сумма');
        return;  
    } 

    const currentCategory = getSelectedCategory();

    if (currentCategory === "Категория") {
        alert('Не задана категория');
        return;
    }

    const newExpense = {amount: currentAmount, category: currentCategory};

    expenses.push(newExpense);
    saveExpensesToStorage();


    render();
    clearInput(inputNode);
}


function saveExpensesToStorage() {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
}

function clearButtonHandler() {
    expenses = [];
    render();
}

function changeLimitHandler() {
    const newLimit = prompt('Новый лимит');

    const newLimitValue = parseInt(newLimit);


    if (!newLimitValue) {
        return;
    }

    limitNode.innerText = newLimitValue;
    limit = newLimitValue;
    localStorage.setItem(STORAGE_LABEL_LIMIT, newLimitValue);


    render();
}

addButtonNode.addEventListener('click', addButtonHandler);
clearButtonNode.addEventListener('click', clearButtonHandler);
changeLimitBtn.addEventListener('click', changeLimitHandler);



