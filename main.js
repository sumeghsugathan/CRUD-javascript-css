let todoInput = document.getElementById("todo-input");
let addBtn = document.getElementById("add-btn");
let itemList = document.getElementById("todo-item-list");
let inputData;
let inputDataArr = [];

function setLocalStorage() {
  localStorage.setItem("todoInput", JSON.stringify(inputDataArr));
}
function getLocalStorage() {
  if (localStorage.getItem("todoInput")) {
    inputDataArr = JSON.parse(localStorage.getItem("todoInput"));
    buildUI();
  } else {
    console.log("no data");
  }
}
function buildUI() {
    itemList.textContent=""
  inputDataArr.forEach((item) => {
    //create DOM elements now
    let li = document.createElement("li");
    let spanEl = document.createElement("span");
    li.appendChild(spanEl);
    spanEl.innerText = item;
    li.style.cssText = "animation-name : slideIn;";
    itemList.appendChild(li);
    todoInput.value = "";
    todoInput.focus();

    //create trash btn
    let trashBtn = document.createElement("i");
    trashBtn.classList.add("fas", "fa-trash");
    li.appendChild(trashBtn);

    //create edit button
    let editBtn = document.createElement("i");
    editBtn.classList.add("fas", "fa-edit");
    li.appendChild(editBtn);
  });
}
//step 2
//add items
function addItems(event) {
  inputData = todoInput.value;
  inputDataArr.push(inputData);
  //set to Local storage
  setLocalStorage();
  buildUI();

  //get from  local storage
}
function deleteItems(event) {
  if (event.target.classList[1] === "fa-trash") {
    let item = event.target.parentElement;
    item.classList.add("slideOut");
    item.addEventListener("transitionend", function () {
      item.remove();
    });
  }
}
function editItem(event) {
  if (event.target.classList[1] === "fa-edit") {
    let editedValue = prompt("please add new twxt");
    let item = event.target.parentElement;

    let spanEl = item.querySelector("span");
    spanEl.innerText = editedValue;

    console.log(spanEl);
  }
}

//step 1
//add an event listener to the button

addBtn.addEventListener("click", addItems);
itemList.addEventListener("click", deleteItems);
itemList.addEventListener("click", editItem);
//

getLocalStorage();
