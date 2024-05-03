const addExpenseBtn = document.querySelector(".addExpense");
const addingExpenseWin = document.querySelector("#addingExpense");
const cross_Cancel = document.querySelector(".cross-Cancel");
const inputs = document.querySelectorAll(".inputs");
const expenseOuter2 = document.querySelector(".expenseOuter2");

let total = 0;

upDateTotal();

class Expense {
    constructor() {
        this.name = '';
        this.cost = 0;
        this.date = '';
    }
}


addExpenseBtn.addEventListener("click", () => {
    addingExpenseWin.classList.toggle("moreInfoActive");
    addExpenseBtn.style.display = "none";
});

cross_Cancel.addEventListener("click", () => {
    addingExpenseWin.classList.toggle("moreInfoActive");
    addExpenseBtn.style.display = "flex";
    inputs.forEach((element) => {
        element.value = "";
    });
});
// this is the cancel button after clicking add contacts button
document.querySelector(".cancelButton").addEventListener("click", () => {
    cross_Cancel.click();
});

inputs.forEach((element) => {
    element.addEventListener("keyup", (event) => {
        if(event.keyCode === 13) {
            document.querySelector(".saveButton").click();
        }
    });
})


function getDate(dateStr) {
    let s1 = dateStr.substring(0, 4);
    let s2 = dateStr.substring(5, 7);
    let s3 = dateStr.substring(8, 10);
    dateStr = s3+"-"+s2+"-"+s1;
    return dateStr;
}

function deleteItem(event) {
    toBeDeletedClass = event.target.className;
    toBeDeleted = event.target;
    if(toBeDeletedClass === "Delete") {
        toBeDeleted = toBeDeleted.parentNode;
        expenseOuter2.removeChild(toBeDeleted);
        total-=Number(String(toBeDeleted.children[1].textContent).substring(1));
    }
    else {
        toBeDeleted = toBeDeleted.parentNode.parentNode;
        expenseOuter2.removeChild(toBeDeleted);
        total-=Number(String(toBeDeleted.children[1].textContent).substring(1));
    }
    upDateTotal();
} 

function upDateTotal() {
    document.querySelector("#totalExpense").textContent = `Your total Expense: ₹${total}`;
}

document.querySelector(".saveButton").addEventListener("click", () => {
    let currExpense = new Expense();
    currExpense.name = String(document.querySelector("#addName").value).trim();
    currExpense.cost = Number(document.querySelector("#addPrice").value);
    currExpense.date = getDate(String(document.querySelector("#addDate").value));

    total+=currExpense.cost;

    if(!currExpense.name) {
        alert("Please enter all the required fields!");
        return;
    }

    const expenseContainer = document.createElement("div");
    expenseContainer.className = "expenseContainer";

    const p1 = document.createElement("p");
    p1.textContent = currExpense.name;
    const p2 = document.createElement("p");
    p2.textContent = `₹${currExpense.cost}`;
    const p3 = document.createElement("p");
    p3.textContent = currExpense.date;

    const deleteBtn = document.createElement("div");
    deleteBtn.className = "Delete"
    const deleteI = document.createElement("i");
    deleteI.className = "fa-solid fa-trash";
    deleteBtn.appendChild(deleteI);

    expenseContainer.appendChild(p1);
    expenseContainer.appendChild(p2);
    expenseContainer.appendChild(p3);
    expenseContainer.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", deleteItem);

    upDateTotal();

    expenseOuter2.appendChild(expenseContainer);
    cross_Cancel.click();
});
