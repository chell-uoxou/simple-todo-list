let taskId = 0

function getTaskTitleInput() {
    return document.getElementById("taskTitleInput").value
}

function clearTaskTitleInput() {
    document.getElementById("taskTitleInput").value = ""

}

function createTaskListElement(task) {
    let listElement = document.createElement('li')

    let checkbox = document.createElement('')

}

function onSubmitAddTaskForm(event) {
    event.preventDefault()

    console.log("created new task: " + getTaskTitleInput());

    if (getTaskTitleInput() == "") {
        window.alert("なんか書け")
    } else {
        addTask(getTaskTitleInput())
    }

    clearTaskTitleInput()

}

document.getElementById("addTaskForm").addEventListener("submit", onSubmitAddTaskForm)

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
    let checkBoxId = 'taskDoneCheckbox_' + taskId       // taskDoneCheckbox_1
    let doneMessage = '完了'

    let onChangeCheckBox = function (event) {
        let checkBox = event.target
        let span1stHTML = checkBox.nextElementSibling
        let span2ndHTML = span1stHTML.nextElementSibling

        if (event.target.checked) {
            console.log("チェックされたよ");
            span1stHTML.classList.add('done')
            span2ndHTML.classList.remove('hidden')
        } else {
            span1stHTML.classList.remove('done')
            span2ndHTML.classList.add('hidden')
        }
    }

    let onDeleteButtonClick = function (event) {
        console.log(event);
        console.log(event.currentTarget.parentElement);
        let parent = event.currentTarget.parentElement.parentElement
        parent.remove()
    }

    // checkbox
    let checkBoxHtml = document.createElement('input')          // ただのinputタグを作る
    checkBoxHtml.setAttribute('type', 'checkbox')               // 作った新しいinputタグの「type」属性に "checkbox" を指定
    checkBoxHtml.setAttribute('id', checkBoxId)                 // 作った新しいinputタグの「id」属性に "checkbox" を指定
    checkBoxHtml.setAttribute('class', 'form-check-input')      // 作った新しいinputタグの「class」属性に "form-check-input" を指定
    checkBoxHtml.addEventListener("change", onChangeCheckBox)   // 作った新しいinputタグの「change」イベントに onChangeCheckBox を指定
    
    // span 1
    let spanHTML = document.createElement('span')               // ただのspanタグを作る
    spanHTML.setAttribute('class', 'px-2')
    spanHTML.innerHTML = task                                   // 作った新しいspanタグの中に「みそきん買う」という文字を入れる

    // span 2
    let doneMassageHTML = document.createElement('span')        // ただのspanタグを作る
    doneMassageHTML.innerHTML = doneMessage                     // 作った新しいspanタグの中に「完了」という文字を入れる
    doneMassageHTML.setAttribute('class', 'badge bg-success rounded-pill')   // Bootstrapの緑色のバッジのスタイルを指定
    doneMassageHTML.classList.add('hidden')                     // 「完了」の文字は最初は非表示にしておく

    // text container (リストの左端に寄せたいものを入れる)
    let checkBoxTextContainerHTML = document.createElement('div')
    checkBoxTextContainerHTML.setAttribute('class', 'flex-grow-1')
    checkBoxTextContainerHTML.appendChild(checkBoxHtml)
    checkBoxTextContainerHTML.appendChild(spanHTML)
    checkBoxTextContainerHTML.appendChild(doneMassageHTML)    
    
    // delete icon（ボタンの中に表示する）
    let trashIconHTML = document.createElement('i')                             // ただのiタグを作る
    trashIconHTML.setAttribute('class', 'fa-solid fa-trash')                    // fontawesomeのゴミ箱アイコンを指定
    
    // delete button
    let deleteButtonHTML = document.createElement('button')                     // ただのbuttonタグを作る
    deleteButtonHTML.appendChild(trashIconHTML)                                 // 作った新しいbuttonタグの中に作ったiタグを入れる
    deleteButtonHTML.setAttribute('class', 'btn btn-outline-danger btn-sm')     // Bootstrapの赤色＆アウトライン＆小さいボタンのスタイルを指定
    deleteButtonHTML.addEventListener('click', onDeleteButtonClick)             // 作った新しいbuttonタグの「click」イベントに onDeleteButtonClick を指定
    
    // list container （左端にtext containerを、右端にdelete buttonを入れる）
    let liContainerHTML = document.createElement('div')
    liContainerHTML.setAttribute('class', 'd-flex justify-content-between align-items-center')
    liContainerHTML.appendChild(checkBoxTextContainerHTML)
    liContainerHTML.appendChild(deleteButtonHTML)
    
    // label （＝クリックするとチェックボックスが連動して反応するエリア）
    let checkBoxLabelHtml = document.createElement('label')
    checkBoxLabelHtml.appendChild(liContainerHTML)
    checkBoxLabelHtml.setAttribute('for', checkBoxId)       // 作った新しいinputタグの「id」属性に "checkbox" を指定
    checkBoxLabelHtml.setAttribute('class', 'list-group-item list-group-item-action')

    document.getElementById("taskList").appendChild(checkBoxLabelHtml)
}


addTask("みそきん買う")