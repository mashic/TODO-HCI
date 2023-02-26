
//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");
const todaysdate = document.querySelector("#todaysDate");
const day1Btn = document.getElementById("1");
const day2Btn = document.getElementById("2");
const day3Btn = document.getElementById("3");
const day4Btn = document.getElementById("4");
const day5Btn = document.getElementById("5");
const day6Btn = document.getElementById("6");
const day7Btn = document.getElementById("7");
const dodajNoviBtn = document.querySelector("#dodajNovi");
const notesIcon= document.querySelector(".fa-sticky-note");
const calendarIcon= document.querySelector(".fa-calendar");
const cogIcon= document.querySelector(".fa-cog");

//event listeners

//if page is loaded, call the function
document.addEventListener('DOMContentLoaded', getTodos);
dodajNoviBtn.addEventListener('click', dodajNoviRedirect);


// todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// filterOption.addEventListener('click',filterTodo);


addTodaysDate();

//functions

function aktiviraj(id){
    var element=document.getElementById(id);
    $('span.active').removeClass('active');
    element.classList.add("active");
    todoList.innerHTML="";
    getTodos();
}


function dodajNoviRedirect() {
    location.href = "/noviZadatak.html";
}

function addTodaysDate() {
    var date = new Date();
    var dayNumber = date.getDay();
    var mjesec = date.getMonth();
    var danUMjesecu = date.getDate();
    let mjeseciUGodini = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
    let daniUSedmici = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'];
    // todaysdate.innerHTML=daniUSedmici[dayNumber-1]+", "+ mjesec[mjeseciUGodini-1];
    todaysdate.innerHTML = daniUSedmici[dayNumber - 1] + ", " + danUMjesecu + ". " + mjeseciUGodini[mjesec];
    day1Btn.innerHTML = danUMjesecu ;
    day2Btn.innerHTML = danUMjesecu + 1;
    day3Btn.innerHTML = danUMjesecu + 2;
    day4Btn.innerHTML = danUMjesecu + 3;
    day5Btn.innerHTML = danUMjesecu + 4;
    day6Btn.innerHTML = danUMjesecu + 5;
    day7Btn.innerHTML = danUMjesecu + 6;
    //oznacava aktivan danas
    day1Btn.classList.add("active");
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        // var datum = new Date();
        // var danUMjesecu = datum.getDate();
        const oznaceni= document.querySelector(".active");
        if(oznaceni!=null)
        {

            if (/*todo.date.day == danUMjesecu || */todo.date.day == oznaceni.innerHTML || todo.date.day==0 || todo.date.day==null) {
                //todo div creation
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todo');
                //title creation
                const title = document.createElement('div');
                title.classList.add('todo-title');
                todoDiv.appendChild(title);
                title.innerText = todo.title;
                //li creation
                const newTodo = document.createElement('li');
                newTodo.classList.add('todo-item');
                newTodo.innerText = todo.todo;
                //appends newTodo item to the main div
                todoDiv.appendChild(newTodo);
                //date creation
                const date = document.createElement('div');
                date.classList.add('todo-date');
                todoDiv.appendChild(date);
                if (todo.date.day == null) {
                date.innerText = "Date not set";
            }
            else {
                date.innerText = todo.date.day + "." + todo.date.month + "." + todo.date.year + ".";
            }
            //category creation
            const category = document.createElement('div');
            category.classList.add('todo-categ');
            todoDiv.appendChild(category);
            category.innerText = todo.kategorija;
            //check button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check" ></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            // //delete button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);
            //append to list
            todoList.appendChild(todoDiv);
        }
        }
    });
}


function deleteCheck(event) {
    const item = event.target;
    const todo = item.parentElement;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        //animation
        todo.classList.add('fall');
        removeFromLocalStorage(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }


    //checkmark
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    if (item.classList[0] === 'complete-btn') {
        todo.classList.toggle('completed');
        // todos.forEach(function (tudu) {
        //     if (tudu.title == todo.firstChild.innerText) {
        //         if (tudu.done == 1) {
        //             const arr = [
        //                 {
        //                     title: tudu.title,
        //                     todo: tudu.todo,
        //                     date: { day: tudu.date.day, month: tudu.date.month, year: tudu.date.year },
        //                     kategorija: tudu.kategorija,
        //                     done: 0
        //                 }];
        //                 saveToLocalStorage(arr[0]);
        //                removeItemFromLocalStorage(tudu);

        //         }
        //         else if (tudu.done == 0) {
        //             const arr = [
        //                 {
        //                     title: tudu.title,
        //                     todo: tudu.todo,
        //                     date: { day: tudu.date.day, month: tudu.date.month, year: tudu.date.year },
        //                     kategorija: tudu.kategorija,
        //                     done: 1
        //                 }];
        //                 saveToLocalStorage(arr[0]);
        //                removeItemFromLocalStorage(tudu);

        //         }
        //     }
        // });
    }
}

function removeItemFromLocalStorage(todo)
{
        //animation
        removeFromLocalStorage(todo);
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":

                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}


function saveToLocalStorage(todo)
{
    //check if there are items in already
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}



// function getTodos() {
//     let todos;
//     if (localStorage.getItem("todos") === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem("todos"));
//     }
//     todos.forEach(function (todo) {
//         //todo div creation
//         const todoDiv = document.createElement('div');
//         todoDiv.classList.add('todo');
//         if(todo.done==1)
//         {
//             todoDiv.classList.toggle("completed");
//         }
//         //title creation
//         const title = document.createElement('div');
//         title.classList.add('todo-title');
//         todoDiv.appendChild(title);
//         title.innerText=todo.title;
//         //li creation
//         const newTodo = document.createElement('li');
//         newTodo.classList.add('todo-item');
//         newTodo.innerText = todo.todo;
//         //appends newTodo item to the main div
//         todoDiv.appendChild(newTodo);
//         //date creation
//         const date = document.createElement('div');
//         date.classList.add('todo-date');
//         todoDiv.appendChild(date);
//         if(todo.date.day==null)
//         {
//             date.innerText="Date not set";
//         }
//         else{
//             date.innerText=todo.date.day+"."+todo.date.month+"."+todo.date.year+".";
//         }
//         //category creation
//         const category = document.createElement('div');
//         category.classList.add('todo-categ');
//         todoDiv.appendChild(category);
//         category.innerText=todo.kategorija;
//         //check button
//         const completedButton = document.createElement('button');
//         completedButton.innerHTML = '<i class="fas fa-check" ></i>';
//         completedButton.classList.add("complete-btn");
//         todoDiv.appendChild(completedButton);
//         //delete button
//         const trashButton = document.createElement('button');
//         trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
//         trashButton.classList.add("trash-btn");
//         todoDiv.appendChild(trashButton);
//         //append to list
//         todoList.appendChild(todoDiv);
//     });
// }

function removeFromLocalStorage(todo) {
    //check if there are items in already
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}





