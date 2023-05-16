var taskId = 0

function getTaskTitleInput() {
    return document.getElementById("taskTitleInput").value
}

function createTaskListElement(task) {
    var listElement = document.createElement('li')

    var checkbox = document.createElement('')

}

function onClickAddButton() {
    console.log("created new task: " + getTaskTitleInput());

    var taskTitle = getTaskTitleInput()

    var succeed = addTask(getTaskTitleInput(taskTitle))

    if (succeed) {
        document.getElementById("taskTitleInput").value = ""
    }

}

// 
// function addTask(task) {
//     document.getElementById("taskList").innerHTML +=
//         '<li> ' + task + '</li>'
// }

// 目標：
// <input type="checkbox" id="taskDoneCheckbox_1" checked>
// <label for="taskDoneCheckbox_1">みそきん買う</label>
//
// jsのDOM制御に書き換えた クール・バージョン
function addTask(task) {
    var checkBoxId = 'taskDoneCheckbox_' + taskId       // taskDoneCheckbox_1

    // inputタグ （＝チェックボックス自体）
    var checkBoxHtml = document.createElement('input')  // ただのinputタグを作る
    checkBoxHtml.setAttribute('type', 'checkbox')       // つくった新しいinputタグの「type」属性に "checkbox" を指定
    checkBoxHtml.setAttribute('id', checkBoxId)         // つくった新しいinputタグの「id」属性に "checkbox" を指定
    checkBoxHtml.checked = false                        // つくった新しいinputタグの「checked」属性に false を指定
    checkBoxHtml.addEventListener('change', function () {
        this.parentElement.setAttribute('class',
            this.checked ? 'line-through' : ''
        );
    })

    // labelタグ （＝チェックボックスの隣にある文字）
    var checkBoxLabelHtml = document.createElement('label') // ただのlabelタグを作る
    checkBoxLabelHtml.innerText = task                      // 作った新しいlabelタグで囲われた中のテキストを「みそきん買う」を指定
    checkBoxLabelHtml.setAttribute('for', checkBoxId)       // 作った新しいinputタグの「id」属性に "checkbox" を指定

    var listHtml = document.createElement('li')             // 大元となるliタグを作る
    console.log("1. ", listHtml.outerHTML);
    // <li>
    // </li>

    listHtml.appendChild(checkBoxHtml)
    console.log("2. ", listHtml.outerHTML);
    // <li>
    //     <input type="checkbox" id="taskDoneCheckbox_1" checked></input>
    // </li>

    listHtml.appendChild(checkBoxLabelHtml)
    console.log("3. ", listHtml.outerHTML);
    // <li>
    //     <input type="checkbox" id="taskDoneCheckbox_1" checked></input>
    //     <label for="taskDoneCheckbox_1">みそきん買う</label>
    // </li>

    console.log("added list html:", listHtml)

    taskId++
    document.getElementById("main-list").appendChild(listHtml)

    return true
}

window.document.onkeydown = function (event) {
    if (event.key === 'Enter') {
        document.getElementById("addTaskButton").click()
    }
}


const input = document.getElementById("taskTitleInput")

// SafariっぽいUAのとき、compositionend イベントの直後かどうか判定できるようにする
const isSafari = navigator.userAgent.includes("Safari/") && navigator.userAgent.includes("Version/");

let isCompositionFinished = true;

input.addEventListener("keydown", (e) => {
    if (isSafari && isCompositionFinished) {
        isCompositionFinished = false;
        return;
    }
    if (e.key !== "Enter" || e.isComposing) {
        return;
    }

    e.preventDefault();

    const text = e.target.value;

    const li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);

    e.target.value = "";
});

input.addEventListener("compositionstart", () => {
    isCompositionFinished = false;
});

input.addEventListener("compositionend", () => {
    isCompositionFinished = true;
});
