//Selectors
const toDoList = document.querySelector(".todo-list");
const addToDoBtn = document.querySelector(".addToDoBtn");
const toDoInput = document.querySelector(".add .todo");
const filterToDo = document.querySelector(".filter-todos");

//Event Listeners
document.addEventListener("DOMContentLoaded", loadFromLocal);
addToDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterToDo.addEventListener("click", filterToDos);
filterToDo.addEventListener("change", filterToDos);
addToDoBtn.addEventListener("click", filterToDos);

//Functions
function addToDo(e) {
    e.preventDefault();

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    const newToDo = document.createElement("li");
    newToDo.innerText = toDoInput.value;

    const completedBtn = document.createElement("button");
    completedBtn.classList.add("complete-btn");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    toDoDiv.appendChild(newToDo);
    toDoDiv.appendChild(completedBtn);
    toDoDiv.appendChild(trashBtn);
    if (!(toDoInput.value === "")) {
        toDoList.appendChild(toDoDiv);
        saveToLocal(toDoInput.value);
    }
    toDoInput.value = "";
}

function deleteCheck(e) {
    const btn = e.target;
    const toDoItem = btn.parentElement;
    if (btn.classList[0] === "trash-btn") {
        toDoItem.classList.add("deleted");
        deleteFromLocal(toDoItem.querySelector("li").innerText);
        document.addEventListener("transitionend", () => {
            toDoItem.remove();
        });
    } else if (btn.classList[0] === "complete-btn") {
        toDoItem.classList.toggle("completed");
    }
}

function filterToDos(e) {
    toDos = toDoList.childNodes;
    toDos.forEach((todo) => {
        switch (document.querySelector(".filter-todos").value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "complete":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

//Local Storage Functions
function saveToLocal(val) {
    let toDos;
    if (localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    toDos.push(val);
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function deleteFromLocal(val) {
    let toDos = JSON.parse(localStorage.getItem("toDos"));
    toDos.splice(toDos.indexOf(val), 1);
    if (toDos.length != 0) {
        localStorage.setItem("toDos", JSON.stringify(toDos));
    } else {
        localStorage.removeItem("toDos");
    }
}

function loadFromLocal() {
    let toDos;
    if (localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    toDos.forEach((toDo) => {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo");
        const newToDo = document.createElement("li");
        newToDo.innerText = toDo;

        const completedBtn = document.createElement("button");
        completedBtn.classList.add("complete-btn");
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';

        const trashBtn = document.createElement("button");
        trashBtn.classList.add("trash-btn");
        trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

        toDoDiv.appendChild(newToDo);
        toDoDiv.appendChild(completedBtn);
        toDoDiv.appendChild(trashBtn);
        toDoList.appendChild(toDoDiv);
    });
}
