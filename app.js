"use strict"; //Strict mode


// Creating a protoype for tasks 
// Variable Hoisting
var Task ={
    id: 0,
    name : "This is the task",
    description: "Task is as follows \n 1. abc. \n2.def",
    assignee: "user",
    priority: 0,
    status:"todo",
    setTask: function(id,name,description,assignee,priority,status){
        this.id=id;
        this.name=name;
        this.description=description;
        this.assignee=assignee;
        this.priority=priority;
        this.status=status;
    },
    createHTMLtask: function(){
        let htmlstring ="<div class=\"task\"\>"+
        this.name+" "+
        "<button id=\""+(this.id*10+1)+"\" onClick=\"priorityClick(this.id)\""+" class=\"incr\" type='button'>Incr</button>"+
        "<button id=\""+(this.id*10+2)+"\" onClick=\"priorityClick(this.id)\""+" class=\"decr\" type='button'>Decr</button>"+"<br>"+
        this.description+" <br>"+
        this.assignee+" Prio: "+this.priority+
        "</div><br><br><br><br><br>"
        return htmlstring;
    }
};


// For storing Task objects
// Arrays , Hoisting
var array=[]; 

// To initialize 3 phases with preloaded tasks on startup
// Function Hoisting
function initializeTodo(){  
    for(var i=0;i<15;i++){
        //Pure prototypal inheritance
        array[i]=Object.create(Task);
    }
    array[0].setTask(1,"task1","This is task 1 details","arjun",1,"todo");
    array[1].setTask(2,"task2","This is task 2 details","suraj",3,"todo");
    array[2].setTask(3,"task3","This is task 3 details","arjun",3,"todo");
    array[3].setTask(4,"task4","This is task 4 details","arjun",1,"progress");
    array[4].setTask(5,"task5","This is task 5 details","abhi",2,"progress");
    array[5].setTask(6,"task6","This is task 6 details","akash",3,"progress");
    array[6].setTask(7,"task7","This is task 7 details","suraj",1,"done");
    array[7].setTask(8,"task8","This is task 8 details","akash",2,"done");
    array[8].setTask(9,"task9","This is task 9 details","abhi",3,"done");
    array[9].setTask(10,"task10","This is task 10 details","abhi",4,"done");
    array[10].setTask(11,"task11","This is task 11 details","akash",5,"todo");
    array[11].setTask(12,"task12","This is task 12 details","suraj",6,"todo");
    array[12].setTask(13,"task13","This is task 13 details","akash",1,"todo");
    array[13].setTask(14,"task14","This is task 14 details","abhi",2,"todo");
    array[14].setTask(15,"task15","This is task 15 details","akash",4,"todo");
}
// To store largest value of priority of todo, progress and done 
// Variable Hoisting
var todoMaxPrio=6;
var progressMaxPrio=3;
var doneMaxPrio=4;

// To make changes on screen after each change
// Function Hoisting
function updateTodoPage(){
    todo="";
    progress="";
    done="";
    for(var i=0;i<array.length;i++){
        console.log(array[i]);
        if (array[i].status === "todo"){
            todo=todo+array[i].createHTMLtask();
        }else if (array[i].status === "progress"){
            progress=progress+array[i].createHTMLtask();
        }else if (array[i].status === "done"){
            done=done+array[i].createHTMLtask();
        }
        console.log("unknown status for ",i);   
    }

    console.log(todo,"\n",progress,"\n",done);
    document.getElementById("todo").innerHTML=todo;
    document.getElementById("progress").innerHTML=progress;
    document.getElementById("done").innerHTML=done;
}


// To change priority when the button clicked and route to corresponding function with task-id
// Function Hoisting
function priorityClick(clicked_id){
    var operation = clicked_id % 10;
    var taskid = (clicked_id -operation)/10;
    // console.log("Current operation: "+operation+": task "+taskid);
    if (operation===1){
        incrementPriority(taskid);
    }else if (operation===2){
        decrementPriority(taskid);
    }
}

// To increment priority of a task over the next one above
// Function Hoisting
function incrementPriority(taskid){
    console.log("increment Priority invoked for : "+taskid);
    var task ={};
    task = array[taskid-1];
    var oldp=task.priority;

    if (task.priority !== 1) {
        console.log("Incrementing priority");
        array[taskid-1].priority=oldp-1;
        for(var i=0;i<array.length;i++){
            if ( (array[i].status === array[taskid-1].status) && (array[i].priority === oldp-1) && (i!==(taskid-1)) ){
                array[i].priority=oldp;
            }
        }
    } else {
        alert("Already maximum priority");
    }
    updatePageWithPrio();
}


//No decrement if already lowest priority && number of task with same priority is = 1 
//Decrement value of priority of task with task id if maxPrio and more than one task exist with same prio






// To decrement priority of a task over the next one below
// Function Hoisting
function decrementPriority(taskid){
    console.log("decrement Priority invoked for : "+taskid);
    var task ={};
    task = array[taskid-1];
    var oldp=task.priority;
    var status=task.status;
    var maxPriorityOfStatus=maxPrio(taskid);

    if ((oldp===maxPriorityOfStatus) && (numberOfPrioStatus(status, oldp) === 1) ){
        alert("Already lowest priority and only one task exist");
    } else if ((oldp===maxPriorityOfStatus) && (numberOfPrioStatus(status, oldp) > 1)){
        array[taskid-1].priority=array[taskid-1].priority+1;
        incrementmaxPrio(status);
        console.log("Already was maxPriority but more than one exist with the max Prio");
    } else {
        array[taskid-1].priority=oldp+1;
        for(var i=0;i<array.length;i++){
            if ( (array[i].status === array[taskid-1].status) && (array[i].priority === oldp+1) && (i!==(taskid-1)) ){
                array[i].priority=oldp;
            }
        }

        console.log("Decrementing priority and interchanging the priority value with the below ones(lesser [priority])");
    }

    
    updatePageWithPrio();
}

// To make changes on screen after changing priority s=using buttons based on priority
// Function Hoisting
function updatePageWithPrio(){
    var todo="";
    var progress="";
    var done="";
    for(var i=1;i<=todoMaxPrio;i++){
        for(var j=0;j<array.length;j++){
            if ((array[j].status === "todo") && (array[j].priority === i)){
                todo=todo+array[j].createHTMLtask();
            } 
        }
    }
    for(var i=1;i<=progressMaxPrio;i++){
        for(var j=0;j<array.length;j++){
            if ((array[j].status === "progress") && (array[j].priority === i)){
                progress=progress+array[j].createHTMLtask();
            } 
        }
    }
    for(var i=1;i<=doneMaxPrio;i++){
        for(var j=0;j<array.length;j++){
            if ((array[j].status === "done") && (array[j].priority === i)){
                done=done+array[j].createHTMLtask();
            } 
        }
    }

    // console.log(todo,"\n",progress,"\n",done);
    document.getElementById("todo").innerHTML=todo;
    document.getElementById("progress").innerHTML=progress;
    document.getElementById("done").innerHTML=done;
}

// To get the maximum priority value existing in each phase or the task's status
// Function Hoisting
function maxPrio(taskid){
    var taskstatus="";
    taskstatus=array[taskid-1].status;
    if (taskstatus === "todo"){
        return todoMaxPrio;
    } else if (taskstatus === "progress"){
        return progressMaxPrio
    } else if (taskstatus === "done"){
        return doneMaxPrio;
    } else {
        console.log("Invalid status for the task");
    }
}

// To get the number of tasks with same priority in a specific phase with specific priority
// Function Hoisting
function numberOfPrioStatus(status, prio){
    var number=0;
    for (var i=0;i<array.length;i++){
        if ((array[i].status===status) && (array[i].priority===prio)){
            number = number+1;
        }
    }
    return number;
}

// To icrement maximum Priority values of each phase whenver required
// Function Hoisting
function incrementmaxPrio(taskstatus){
    if (taskstatus === "todo"){
        todoMaxPrio++;
    } else if (taskstatus === "progress"){
        progressMaxPrio++;
    } else if (taskstatus === "done"){
        doneMaxPrio++;
    } else {
        console.log("Invalid status for the task");
    }
}

// To create a new task from popup form
// Function Hoisting

function createNewTask(){
    var name = document.forms["popupform"]["name"].value;              
    var description = document.forms["popupform"]["description"].value;   
    var assignee = document.forms["popupform"]["assignee"].value; 
    var priority =  Number(document.forms["popupform"]["priority"].value); 
    console.log(name+" "+description+" "+assignee+" "+priority);
    var lastPos = array.length;
    array[lastPos]=Object.create(Task);
    array[lastPos].setTask(lastPos+1,name,description,assignee,priority,"todo");
    if (priority>todoMaxPrio){
        todoMaxPrio=priority;
    }
    updatePageWithPrio();
    alert("Creation success");
}