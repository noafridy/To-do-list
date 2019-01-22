var arr = [];

function backup() {
    if (localStorage.getItem("arr") !== null) {
        arr = JSON.parse(localStorage.getItem("arr"));
        for (let card of arr) {
            addCard(card);
        }
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    backup();
});

function createKeyForCard() {   
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function createObj(taskData, taskDate, tasktime) {
    return {
        taskData: taskData,
        taskDate: taskDate,
        tasktime: tasktime,
        key: createKeyForCard()   
    }
}

function checkTask(taskTemp) {
    if (taskTemp) {
        return true;
    } else {
        return false;
    }
}

function addNewTask() {
    const taskData = document.forms["addTaskNew"]["taskData"].value;
    const taskDate = document.forms["addTaskNew"]["taskDate"].value;
    const tasktime = document.forms["addTaskNew"]["tasktime"].value;
    if (checkTask(taskData)) {
        if (checkTask(taskDate)) {
            const cardData = createObj(taskData, taskDate, tasktime);
            arr.push(cardData);
            addCard(cardData);
            localStorage.setItem("arr", JSON.stringify(arr));
        } else {
            alert("Operation failed!\nPlease insert date.");
        }
    } else {
        alert("Operation failed!\nPlease insert task.");
    }
    console.log(arr);  //for check
}

function deleteNewTask() {
    document.forms["addTaskNew"]["taskData"].value = "";
    document.forms["addTaskNew"]["taskDate"].value = "";
    document.forms["addTaskNew"]["tasktime"].value = "";
}

function addCard(cardItem) {
    const cardContainer = document.getElementById("cardContainer");
    const div = document.createElement("div");
    div.innerHTML = "<i class='fas fa-times' onclick='removeCard(event)' data-key=" + cardItem.key + "> </i>" +
        "<p class='cardText'>" + cardItem.taskData + "</p >" +
        "<p class='cardDate'>" + cardItem.taskDate + "</p>" +
        "<p class='cardTime'> " + cardItem.tasktime + "</p>";
    div.className += "cardItem";
    cardContainer.append(div);
}

function removeCard(event) {
    const target = event.target;
    const key = target.dataset.key;
    target.parentElement.remove();
    for (let i = 0; i < arr.length; i++) {
        if (key == arr[i].key) {
            arr.splice(i, 1);
            localStorage.setItem("arr", JSON.stringify(arr));
            return;
        }
    }
}