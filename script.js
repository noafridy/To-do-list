var arr = [];

function backup() {
    if (localStorage.getItem("arr") !== null) {
        arr = JSON.parse(localStorage.getItem("arr"));
        for (var i = 0; i < arr.length; i++) {
            addCard(arr[i]);
        }
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    backup();
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function createObj(taskData, taskDate, tasktime) {
    return {
        taskData: taskData,
        taskDate: taskDate,
        tasktime: tasktime,
        key: uuidv4()
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

function addCard(cardItem) {
    var cardContainer = document.getElementById("cardContainer");
    var div = document.createElement("div");
    div.innerHTML = "<i class='fas fa-times' onclick='removeCard(event)' data-key=" + cardItem.key + "> </i>" +
        "<p class='cardText'>" + cardItem.taskData + "</p >" +
        "<p class='cardDate'>" + cardItem.date + "</p>" +
        "<p class='cardTime'> " + cardItem.time + "</p>";
    div.className += "cardItem";
    cardContainer.append(div);

    // var cardContainer = document.getElementById("cardContainer");
    // var div = document.createElement("div");
    // var text = document.createElement("p");
    // var date = document.createElement("p");
    // var time = document.createElement("p");
    // text.innerHTML = card.taskData;
    // date.innerHTML = card.taskDate;
    // time.innerHTML = card.tasktime;
    // div.className += "card";
    // text.className+="cardText";
    // date.className+="cardDate";
    // time.className+="cardTime";
    // div.appendChild(text);
    // div.appendChild(date);
    // div.appendChild(time);
    // cardContainer.append(div);
}

function removeCard(event) {
    //var cardToRemove = this.parentElement;
    var target = event.target;
    var key = target.dataset.key;
    target.parentElement.remove();
    for (var i=0;i<arr.length;i++){
        if(key==arr[i].key){
            arr.splice(i, 1); 
            localStorage.setItem("arr", JSON.stringify(arr));
            return; 
        }
    }

    // this.parentElement.remove(this);
}