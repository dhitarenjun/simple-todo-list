let tasks = [];

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    input.value = "";

    showTasks();
}

function showTasks() {
    let list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach(function(task) {

        let li = document.createElement("li");
        li.className = "task-item";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onclick = function() {
            task.completed = checkbox.checked;
            showTasks();
        };

        let span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        editButton.onclick = function() {
            let newText = prompt("Ubah tugas:", task.text);

            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                showTasks();
            }
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            showTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        list.appendChild(li);
    });
}

function filterTasks(filter) {

    let list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach(function(task) {

        if (filter === "active" && task.completed) {
            return;
        }

        if (filter === "completed" && !task.completed) {
            return;
        }

        let li = document.createElement("li");
        li.className = "task-item";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onclick = function() {
            task.completed = checkbox.checked;
            filterTasks(filter);
        };

        let span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        li.appendChild(checkbox);
        li.appendChild(span);

        list.appendChild(li);
    });
}

showTasks();