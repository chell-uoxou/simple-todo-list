let taskId = 0
let taskList = []

function getTaskTitleInput() {
    return document.getElementById("taskTitleInput").value
}

function clearTaskTitleInput() {
    document.getElementById("taskTitleInput").value = ""
}

function updateStatusText(text) {
    let statusTextElement = document.createElement('p').innerHTML = text
    document.getElementById("topStatusText").innerHTML = statusTextElement
}

function updateStatus() {
    let statusText = "全てのタスクが完了しました！やったー"
    let inProgress = taskList.filter(function (task) {
        return task.done == false
    })
    let done = taskList.filter(function (task) {
        return task.done == true
    })

    if (inProgress.length > 0) {
        statusText = "未完了のタスクが" + inProgress.length + "個あります"
    }
    let archiveIcon = document.createElement('i')
    archiveIcon.setAttribute('class', 'fa-solid fa-archive')
    let itemCount = document.createElement('div')
    itemCount.setAttribute('class', 'badge bg-success rounded-pill ms-2')
    itemCount.innerHTML = done.length

    console.log(archiveIcon);
    document.getElementById("archiveDoneTasksButton").innerHTML = ""
    document.getElementById("archiveDoneTasksButton").appendChild(archiveIcon)
    document.getElementById("archiveDoneTasksButton").appendChild(itemCount)
    

    if(done.length == 0) {
        document.getElementById("archiveDoneTasksButton").classList.add('hidden')
    } else {
        document.getElementById("archiveDoneTasksButton").classList.remove('hidden')
    }

    updateStatusText(statusText)
}

function onSubmitAddTaskForm(event) {
    event.preventDefault()
    updateStatus()

    if (getTaskTitleInput() == "") {
        window.alert("なんか書け")
    } else {
        addTask(getTaskTitleInput())
    }

    console.log("created new task: " + getTaskTitleInput());
    clearTaskTitleInput()
}

document.getElementById("addTaskForm").addEventListener("submit", onSubmitAddTaskForm)
document.getElementById("archiveDoneTasksButton").addEventListener("click", archiveDoneTasks)

function addTask(task) {
    taskId++
    let taskObject = {
        id: taskId,
        title: task,
        done: false
    }
    taskList.push(taskObject)
    updateTaskListHTML()
    updateStatus()
}

function archiveDoneTasks() {
    taskList = taskList.filter(function (task) {
        return task.done == false
    })
    updateTaskListHTML()
    updateStatus()
}

function getTaskObjectByCheckBoxId(checkboxId) {
    let taskId = checkboxId.replace('taskDoneCheckbox_', '')
    let taskObject = taskList.find(function (task) {
        return task.id == taskId
    })
    return taskObject
}

function addTaskHTML(taskObject) {
    let id = taskObject.id
    let checkBoxId = 'taskDoneCheckbox_' + id
    let doneMessage = '完了'

    let onChangeCheckBox = function (event) {
        taskObject = getTaskObjectByCheckBoxId(event.target.id)

        let checkBox = event.target
        let span1stHTML = checkBox.nextElementSibling
        let span2ndHTML = span1stHTML.nextElementSibling

        if (event.target.checked) {
            taskObject.done = true
            console.log("チェックされたよ");
            span1stHTML.classList.add('done')
            span2ndHTML.classList.remove('hidden')
        } else {
            taskObject.done = false
            span1stHTML.classList.remove('done')
            span2ndHTML.classList.add('hidden')
        }
        updateStatus()
    }

    let onDeleteButtonClick = function (event) {
        let parent = event.currentTarget.parentElement.parentElement
        let checkBoxId = parent.children[0].children[0].children[0].id
        parent.remove()
        let taskObject = getTaskObjectByCheckBoxId(checkBoxId)
        taskList.pop(taskObject)
        updateStatus()
    }

    // checkbox
    let checkBoxHtml = document.createElement('input')          // ただのinputタグを作る
    checkBoxHtml.setAttribute('type', 'checkbox')               // 作った新しいinputタグの「type」属性に "checkbox" を指定
    checkBoxHtml.setAttribute('id', checkBoxId)                 // 作った新しいinputタグの「id」属性に "checkbox" を指定
    checkBoxHtml.setAttribute('class', 'form-check-input')      // 作った新しいinputタグの「class」属性に "form-check-input" を指定
    checkBoxHtml.addEventListener("change", onChangeCheckBox)   // 作った新しいinputタグの「change」イベントに onChangeCheckBox を指定

    // span 1
    let spanHTML = document.createElement('span')               // ただのspanタグを作る
    spanHTML.setAttribute('class', 'px-2')                      // Bootstrapの横空白の大きさを指定
    spanHTML.innerHTML = taskObject.title                                   // 作った新しいspanタグの中に「みそきん買う」という文字を入れる

    // span 2
    let doneMassageHTML = document.createElement('span')        // ただのspanタグを作る
    doneMassageHTML.innerHTML = doneMessage                     // 作った新しいspanタグの中に「完了」という文字を入れる
    doneMassageHTML.setAttribute('class', 'badge bg-success rounded-pill')   // Bootstrapの緑色のバッジのスタイルを指定
    doneMassageHTML.classList.add('hidden')                     // 「完了」の文字は最初は非表示にしておく

    if (taskObject.done) {
        console.log("Doneだよ: ", getTaskObjectByCheckBoxId(checkBoxId).title);
        checkBoxHtml.checked = true
        spanHTML.classList.add('done')
        doneMassageHTML.classList.remove('hidden')
    } else {
        checkBoxHtml.checked = false
        spanHTML.classList.remove('done')
        doneMassageHTML.classList.add('hidden')
    }

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

function updateTaskListHTML() {
    document.getElementById("taskList").innerHTML = ""
    for (let i = 0; i < taskList.length; i++) {
        addTaskHTML(taskList[i])
    }
}


addTask("みそきん買う")
updateStatus()