var arr = [];

function backup() {
    if (localStorage.getItem("arr") !== null) {
        arr = JSON.parse(localStorage.getItem("arr"));
        for(var i=0; i<arr.length; i++){
            addCard(arr[i]);
        }
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    backup();
});

function createObj(taskData, taskDate, tasktime) {
    return {
        taskData: taskData,
        taskDate: taskDate,
        tasktime: tasktime
    }
}

function checkTask(taskTemp) {
    if (taskTemp) {
        return taskTemp;
    } else {
        return false;
    }
}

function addNewTask() {
    var taskData = document.forms["addTaskNew"]["taskData"].value;
    var taskDate = document.forms["addTaskNew"]["taskDate"].value;
    var tasktime = document.forms["addTaskNew"]["tasktime"].value;
    if (checkTask(taskData)) {
        if (checkTask(taskDate)) {
            const cardData = createObj(taskData, taskDate, tasktime);
            arr.push(cardData);
            addCard(cardData);
            localStorage.setItem("arr", JSON.stringify(arr));
        } else {
            alert("Operation failed!\nPlease insert your date.");
        }
    } else {
        alert("Operation failed!\nPlease insert task.");
    }
    console.log(arr);  //for check
}

function deletNewTask() {
    document.forms["addTaskNew"]["taskData"].value = "";
    document.forms["addTaskNew"]["taskDate"].value = "";
    document.forms["addTaskNew"]["tasktime"].value = "";
}

function addCard(card) {
    var cardContainer = document.getElementById("cardContainer");
    var div = document.createElement("div");
    var text = document.createElement("p");
    var date = document.createElement("p");
    var time = document.createElement("p");
    text.innerHTML = card.taskData;
    date.innerHTML = card.taskDate;
    time.innerHTML = card.tasktime;
    div.className += "card";
    text.className+="cardText";
    date.className+="cardDate";
    time.className+="cardTime";
    div.appendChild(text);
    div.appendChild(date);
    div.appendChild(time);
    cardContainer.append(div);
}