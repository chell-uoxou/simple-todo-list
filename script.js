var taskId = 0

function getTaskTitleInput() {
    return document.getElementById("taskTitleInput").value
}

function clearTaskTitleInput() {
    document.getElementById("taskTitleInput").value = ""

}

function createTaskListElement(task) {
    var listElement = document.createElement('li')

    var checkbox = document.createElement('')

}

function onClickAddButton() {
    console.log("created new task: " + getTaskTitleInput());

    if (getTaskTitleInput() == "") {
        window.alert("なんか書け")
    } else {
        addTask(getTaskTitleInput())
    }

    clearTaskTitleInput()

}

// // 指定されたtaskを画面上のリストに追加する
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
    taskId++

    var checkBoxId = 'taskDoneCheckbox_' + taskId       // taskDoneCheckbox_1

    // inputタグ （＝チェックボックス自体）
    var checkBoxHtml = document.createElement('input')  // ただのinputタグを作る
    checkBoxHtml.setAttribute('type', 'checkbox')       // つくった新しいinputタグの「type」属性に "checkbox" を指定
    checkBoxHtml.setAttribute('id', checkBoxId)         // つくった新しいinputタグの「id」属性に "checkbox" を指定
    checkBoxHtml.checked = false                        // つくった新しいinputタグの「checked」属性に true を指定


    // やりたいこと
    // 1. チェックボックスが変更されたことを検知
    // 2. チェックボックスの状態を取得。
    // 2. 対応するlabelも取得（制御したいから）
    // 3. チェックが入ってたら、class属性に"done"を設定
    // 3. 入ってなかったら、class属性に""を設定



    var onChangeCheckBox = function (event) {
        //console.log(event);
        // console.log(event.target.checked);
        // console.log(event.target.nextElementSibling);
        // console.log(event.target);
        // console.log(event.target.nextElementSibling.children[1]);

        let labelHTML = event.target.nextElementSibling
        let span1stHTML = labelHTML.children[0]
        let span2ndHTML = labelHTML.children[1]
        let deleteButtonHTML = labelHTML.children[2]

        if (event.target.checked) {
            console.log("チェックされたよ");
            span1stHTML.setAttribute('class', 'done')
            span2ndHTML.setAttribute('class', "")
        } else {
            span1stHTML.setAttribute('class', "")
            span2ndHTML.setAttribute('class', 'hidden')
        }
    }

    checkBoxHtml.addEventListener("change", onChangeCheckBox)

    // labelタグ （＝チェックボックスの隣にある文字）
    var checkBoxLabelHtml = document.createElement('label') // ただのlabelタグを作る

    let spanHTML = document.createElement('span')
    spanHTML.innerHTML = task

    let doneMassageHTML = document.createElement('span')
    doneMassageHTML.innerHTML = "[完了]"
    doneMassageHTML.setAttribute('class', 'hidden')

    let deleteButtonHTML = document.createElement('button')
    let trashIconHTML = document.createElement('i')
    trashIconHTML.setAttribute('class', 'fa-solid fa-trash')
    deleteButtonHTML.appendChild(trashIconHTML)

    let onDeleteButtonClick = function(event){
        console.log(event);
        console.log(event.currentTarget.parentElement);
        let parent = event.currentTarget.parentElement.parentElement
        parent.remove()
    }

    // deleteButtonHTML.addEventListener('click', onDeleteButtonClick) 
    deleteButtonHTML.onclick = onDeleteButtonClick

    checkBoxLabelHtml.appendChild(spanHTML)
    checkBoxLabelHtml.appendChild(doneMassageHTML)
    checkBoxLabelHtml.appendChild(deleteButtonHTML)

    // checkBoxLabelHtml.innerText = task                   // 作った新しいlabelタグで囲われた中のテキストを「みそきん買う」を指定
    checkBoxLabelHtml.setAttribute('for', checkBoxId)       // 作った新しいinputタグの「id」属性に "checkbox" を指定

    var listHtml = document.createElement('li')
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

    document.getElementById("taskList").appendChild(listHtml)
}


addTask("みそきん買う")