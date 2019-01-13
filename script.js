var arr = [];

function backup() {
    if (localStorage.getItem("arr") !== null) {
        arr = JSON.parse(localStorage.getItem("arr"));
        for (var i = 0; i < arr.length; i++) {
            createCard(arr[i]);
        }
    }
}

$(document).ready(function () {
    backup();

    $("#imgAdd").click(function () {
        addNewTask();
    });
    $("#imgDelete").click(function () {
        $("textarea[name='taskData']").val('');
        $("input[name='taskDate']").val('');
        $("input[name='tasktime']").val('');
    });
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
    var taskData = $("textarea[name='taskData']").val();
    var taskDate = $("input[name='taskDate']").val();
    var tasktime = $("input[name='tasktime']").val();
    if (checkTask(taskData)) {
        if (checkTask(taskDate)) {
            const cardData = createObj(taskData, taskDate, tasktime);
            arr.push(cardData);
            createCard(cardData);
            localStorage.setItem("arr", JSON.stringify(arr));
        } else {
            alert("Operation failed!\nPlease insert date.");
        }
    } else {
        alert("Operation failed!\nPlease insert task.");
    }
    console.log(arr);  //for check
}
function createCard(cardData) {
    var $cardItem = $("<div class='cardItem'></div>");
    var $deleteCard = $("<i class='fas fa-times'> </i>");
    $deleteCard.click(function () {
        this.parentElement.remove();
        for(var i=0;i<arr.length;i++){
            if(arr[i].key === cardData.key){
            arr.splice(i,1);
            localStorage.setItem("arr", JSON.stringify(arr));
            }
        }
    })
    debugger;
    $cardItem.append($deleteCard);
    $cardItem.append("<p class='cardText'>" + cardData.taskData + "</p >" +
        "<p class='cardDate'>" + cardData.taskDate + "</p>" +
        "<p class='cardTime'> " + cardData.tasktime + "</p>");
    $("#cardContainer").append($cardItem);
}

