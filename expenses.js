const allSideMenu = document.querySelectorAll('#sidebar .side-menu li a');  
allSideMenu.forEach(item=> {
    const li = item.parentElement;
    item.addEventListener('click', function () {
        allSideMenu.forEach(i=> {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');
menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
})
let totalAmount = document.getElementById('total-amount');
let userAmount = document.getElementById('user-amount');

const checkAmountButton = document.getElementById('check-amount');
const totalAmountButton = document.getElementById('total-amount-button');
const productTitle = document.getElementById('product-title');
const errorMessage = document.getElementById('budget-error');
const productTitleError = document.getElementById('product-title-error');
const amount = document.getElementById('amount');
const expenditureValue = document.getElementById('expenditure-value');
const balanceValue = document.getElementById('balance-amount');
const list = document.getElementById('list');

let tempAmount = 0;
totalAmountButton.addEventListener('click', () => {
    tempAmount = parseInt(totalAmount.value);
    if (isNaN(tempAmount) || tempAmount <= 0) {
        errorMessage.classList.remove('hide');
    } else {
        errorMessage.classList.add('hide');
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - parseInt(expenditureValue.innerText || 0);
        totalAmount.value = '';
    }
});

const disableButtons = (bool) => {
    let editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((element) => {
        element.disabled = bool;
    });
};

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = parseInt(balanceValue.innerText) || 0;
    let currentExpense = parseInt(expenditureValue.innerText) || 0;
    let parentAmount = parseInt(parentDiv.querySelector('.amount').innerText) || 0;
    if (edit) {
        let parentText = parentDiv.querySelector('.product').innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = currentBalance + parentAmount;
    expenditureValue.innerText = currentExpense - parentAmount;
    parentDiv.remove();
};

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement('div');
    sublistContent.classList.add("sublist-content", "flex-space");
    let productElement = document.createElement('p');
    productElement.classList.add('product');
    productElement.textContent = expenseName;
    let amountElement = document.createElement('p');
    amountElement.classList.add('amount');
    amountElement.textContent = expenseValue;
    sublistContent.appendChild(productElement);
    sublistContent.appendChild(amountElement);
    let editButton = document.createElement('button');
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = '24px';
    editButton.addEventListener('click', () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement('button');
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = '24px';
    deleteButton.addEventListener('click', () => {
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    list.appendChild(sublistContent);
};

checkAmountButton.addEventListener('click', () => {
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove('hide');
        return;
    } else {
        productTitleError.classList.add('hide');
    }
    let expenditure = parseInt(userAmount.value);
    if (isNaN(expenditure) || expenditure <= 0) {
        alert("Please enter a valid amount for expenditure.");
        return;
    }
    disableButtons(false);
    let totalExpenditure = parseInt(expenditureValue.innerText) || 0 + expenditure;
    expenditureValue.innerText = totalExpenditure;
    const totalBalance = tempAmount - totalExpenditure;
    balanceValue.innerText = totalBalance;
    listCreator(productTitle.value, userAmount.value);
    productTitle.value = '';
    userAmount.value = '';
});
