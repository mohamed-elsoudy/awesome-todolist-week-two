// main variables
let input = document.querySelector('input');
let addBtn = document.getElementById('add');
let tasksParent = document.querySelector(".tasks");
let taskDiv = document.querySelectorAll(".task");


window.onload = () => {
    resetTasksNumber();
    input.focus();
    JSON.parse(window.localStorage.getItem("task")).forEach((task) => {
        if (window.localStorage.getItem("task")) {
            addNewTask(task.value, task.id, task.done)
        }
    })
        
}
let tasksArray = [];
if (window.localStorage.getItem("task")) {
    tasksArray = JSON.parse(window.localStorage.getItem("task"))
}

// add button functionality
addBtn.onclick = () => {
    if (input.value !== "") {        
        let obj = {
            id: Date.now(),
            done: false,
            value: input.value,
        }
        tasksArray.push(obj)
        addNewTask(input.value, obj.id);
        window.localStorage.setItem("task", JSON.stringify(tasksArray));
    }
}

// handle tasks changes 
tasksParent.addEventListener("click", function (e) {
    if (e.target.innerHTML == "x") {
        tasksArray.forEach((t) => {
            if (t.id == e.target.parentElement.parentElement.getAttribute("data-num")) {
                tasksArray.splice(tasksArray.indexOf(t), 1)
            }
        })
        window.localStorage.setItem("task", JSON.stringify(tasksArray));
        deletetask(e.target.parentElement.parentElement);
        }

    else if (e.target.innerHTML == "Done") {
        tasksArray.forEach((t) => {
            if (t.id == e.target.parentElement.parentElement.getAttribute("data-num")) {
                t.done == true ? tasksArray[tasksArray.indexOf(t)].done = false : tasksArray[tasksArray.indexOf(t)].done = true;
            }   
        })
        window.localStorage.setItem("task", JSON.stringify(tasksArray));
        doneTask(e.target.parentElement.parentElement, e.target.parentElement.parentElement.children[0]);
        }

    else if (e.target.innerHTML == "Edit") {
        tasksArray.forEach((t) => {
            if (t.id == e.target.parentElement.parentElement.getAttribute("data-num")) {
                editTask(e.target.parentElement.parentElement, e.target.parentElement.parentElement.children[0], tasksArray.indexOf(t));
                e.target.parentElement.parentElement.children[0].addEventListener("input", () => {
                    t.value = e.target.parentElement.parentElement.children[0].textContent;
                    window.localStorage.setItem("task", JSON.stringify(tasksArray));
                })
            }   
        })
    } 

})

// All functions
// this function used to reset the tasks number in the app header
function resetTasksNumber () {
    let tasksCount = document.querySelectorAll(".task").length;
    let dynamicTasksNumber = document.querySelector('.count');
    dynamicTasksNumber.innerHTML = tasksCount;
}

// inside task functions (delete, done, edit)
function deletetask (added) {
    added.innerHTML = "REMOVED";
    added.classList.add('removed');
    setTimeout(()=> {
        added.remove();
        resetTasksNumber();
    } ,1000)
}
function doneTask (addedT, p) {
    if(addedT.classList.contains("done")) {
        p.classList.remove('done');
        addedT.classList.remove("done");
    } else {            
        addedT.classList.add("done")
        p.classList.add('done');
    }
    resetTasksNumber();
}
function editTask(added, p, tArray) {
    p.setAttribute('contenteditable', 'true');
    resetTasksNumber();
    p.focus();
    p.addEventListener("input", function() {
        if (p.innerHTML.length == 0) {
            added.remove();
        }
    });
}
function addNewTask (pcontent, id, completed) {
        let addedtask = document.createElement("div");
        let control = document.createElement("div");
        let pargraph = document.createElement("p");
        let spanx = document.createElement("span");
        let spanEdit = document.createElement("span");
        let spanDone = document.createElement("span");
        
        addedtask.className = "task";
        addedtask.setAttribute("data-num", id);
        control.className = "control";
        if (completed) {
            addedtask.classList.add("done");
            pargraph.className = "done"
        }
        pargraph.appendChild(document.createTextNode(pcontent));
        spanx.appendChild(document.createTextNode("x"));
        spanEdit.appendChild(document.createTextNode("Edit"));
        spanDone.appendChild(document.createTextNode("Done"));
        tasksParent.appendChild(addedtask);
        addedtask.appendChild(pargraph);
        addedtask.appendChild(control);
        control.appendChild(spanx);
        control.appendChild(spanDone);
        control.appendChild(spanEdit); 
        resetTasksNumber();
}

