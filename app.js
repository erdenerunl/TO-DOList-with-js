var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
}).add({
    targets: '.ml2',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 2000
});

const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('.form-control');
const todoList = document.createElement('ul');
todoList.className = 'list-group';
const formWrapper = document.querySelector('.form-wrapper'); 
const cardBody = document.querySelector('#cardbody');
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear-todos');


window.onload = function() {
    eventListeners();
}


function eventListeners() {
    form.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded', loadAllTodosToUI);
    formWrapper.addEventListener('click' , deleteTodo);
    filter.addEventListener('keyup' , filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}


function clearAllTodos(){
    if (confirm("Are you sure ?")){

        while ( todoList.firstElementChild != null){
            todoList.firstElementChild.remove();
        }
        localStorage.removeItem("todos");
    }

}


function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('.list-group-item');

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1){
            listItem.style.display = "none";
        }else {
            listItem.style.display = "flex";
        }

    })
}







function deleteTodo(e){

    if (e.target.className === 'fa fa-remove'){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert('success','Successfully!');
    }
}

function deleteTodoFromStorage(deletetodos){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodos){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addtodoToUI(todo);
    })
}




function addTodo(e) {
    const newTodo = todoInput.value.trim();
    
    if (newTodo === "") {
        showAlert('danger', 'You should add something!');
    }else {
        addtodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert('success', 'Done!');
    }


    

    e.preventDefault()
}





function showAlert(type,message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.padding = '4px';
    alert.style.height = '32px';
    form.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    }, 2000);
}



function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}



function addtodoToUI(newTodo) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.style.display = 'flex';
    listItem.style.justifyContent = 'space-between';
    listItem.appendChild(document.createTextNode(newTodo));

    const link = document.createElement('a');
    link.className = 'delete-item';
    link.href = '#';
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    listItem.appendChild(link);
    todoList.appendChild(listItem);
    formWrapper.appendChild(todoList);
    todoInput.value = "";

}
