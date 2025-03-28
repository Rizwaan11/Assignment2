

document.getElementById("menuToggle").addEventListener("click", function() {
    const menuList = document.getElementById("menuList");
    menuList.classList.toggle("active");
});

function toggleAnswer(answerId) {
    var faqItem = document.getElementById(answerId).parentElement;
    var answer = document.getElementById(answerId);
    var arrow = faqItem.querySelector('.arrow');
    
    if (answer.style.display === "block") {
        answer.style.display = "none";
        faqItem.classList.remove("open");
    } else {
        answer.style.display = "block";
        faqItem.classList.add("open");
    }
}

function validateForm() {
    let isValid = true;

    // Clear previous error messages
    document.getElementById("nameError").innerHTML = '';
    document.getElementById("emailError").innerHTML = '';
    document.getElementById("messageError").innerHTML = '';

    // Validate name
    let name = document.getElementById("name").value;
    if (name === "") {
        document.getElementById("nameError").innerHTML = "Name is required!";
        isValid = false;
    }

    // Validate email
    let email = document.getElementById("email").value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === "") {
        document.getElementById("emailError").innerHTML = "Email is required!";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerHTML = "Please enter a valid email!";
        isValid = false;
    }

    // Validate message
    let message = document.getElementById("message").value;
    if (message === "") {
        document.getElementById("messageError").innerHTML = "Message is required!";
        isValid = false;
    }

    // Return form validity status
    return isValid;
}

// To-Do List Section
let addTaskBtn = document.getElementById("addTaskBtn");
let taskInput = document.getElementById("taskInput");
let taskDeadline = document.getElementById("taskDeadline");
let taskPriority = document.getElementById("taskPriority");
let todoList = document.getElementById("todoList");

addTaskBtn.addEventListener("click", function() {
    if (taskInput.value.trim() !== "") {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${taskInput.value}</span>
            <span class="task-deadline">Due: ${taskDeadline.value}</span>
            <span class="task-priority" style="background-color:${getPriorityColor(taskPriority.value)}">${taskPriority.value.charAt(0).toUpperCase() + taskPriority.value.slice(1)}</span>
            <button class="editTaskBtn">Edit</button>
            <button class="deleteTaskBtn">Delete</button>
        `;
        todoList.appendChild(li);

        let deleteBtns = li.getElementsByClassName("deleteTaskBtn");
        let editBtns = li.getElementsByClassName("editTaskBtn");

        for (let btn of deleteBtns) {
            btn.addEventListener("click", function() {
                li.remove();
            });
        }

        for (let btn of editBtns) {
            btn.addEventListener("click", function() {
                taskInput.value = li.querySelector(".task-text").textContent;
                taskDeadline.value = li.querySelector(".task-deadline").textContent.replace("Due: ", "");
                taskPriority.value = li.querySelector(".task-priority").textContent.toLowerCase();
                li.remove();
            });
        }

        taskInput.value = "";
        taskDeadline.value = "";
        taskPriority.value = "low";
    }
});

function getPriorityColor(priority) {
    switch (priority) {
        case "high": return "#e74c3c";
        case "medium": return "#f39c12";
        case "low": return "#2ecc71";
        default: return "#2ecc71";
    }
}
// Notes Section
let addNoteBtn = document.getElementById("addNoteBtn");
let noteInput = document.getElementById("noteInput");
let notesList = document.getElementById("notesList");

addNoteBtn.addEventListener("click", function() {
    if (noteInput.value.trim() !== "") {
        let li = document.createElement("li");
        li.classList.add("note-item");
        li.innerHTML = `
            <span class="note-text">${noteInput.value}</span>
            <button class="editNoteBtn">Edit</button>
            <button class="deleteNoteBtn">Delete</button>
        `;
        
        notesList.appendChild(li);

        // Add event listeners for Edit and Delete buttons
        let deleteBtns = li.getElementsByClassName("deleteNoteBtn");
        let editBtns = li.getElementsByClassName("editNoteBtn");

        for (let btn of deleteBtns) {
            btn.addEventListener("click", function() {
                li.remove(); // Remove note from the list
            });
        }

        for (let btn of editBtns) {
            btn.addEventListener("click", function() {
                noteInput.value = li.querySelector(".note-text").textContent; // Set input to the note text
                li.remove(); // Remove note from the list
            });
        }

        // Clear input field after adding the note
        noteInput.value = "";
    }
});
