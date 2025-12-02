function updateDDay() {
    const dateInput = document.getElementById("examDate").value;
    const ddayText = document.getElementById("ddayText");
    if (!dateInput) return;

    const today = new Date();
    const exam = new Date(dateInput);
    const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));

    ddayText.innerHTML = `📌 D-${diff}`;
}

function addRow() {
    const table = document.getElementById("planTable");
    const rowCount = table.rows.length;
    const id = rowCount;

    const row = table.insertRow(-1);
    row.innerHTML = `
        <td class="editable" contenteditable="true" id="day${id}">요일 입력</td>
        <td class="editable" contenteditable="true" id="subject${id}">과목 입력</td>
        <td class="editable" contenteditable="true" id="study${id}">공부 내용 입력</td>
        <td><input type="checkbox" id="check${id}" onchange="saveCheck(this)"></td>
        <td><button class="delete-btn" onclick="deleteRow(this)">삭제</button></td>
    `;

    attachEditableListener();
    saveTableStructure(); 
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    const table = document.getElementById("planTable");

    row.querySelectorAll(".editable, input[type='checkbox']").forEach(el => {
        if (el.id) localStorage.removeItem(el.id);
    });

    table.deleteRow(row.rowIndex);
    saveTableStructure();
}

function saveCheck(box) {
    localStorage.setItem(box.id, box.checked);
}

function loadChecks() {
    const boxes = document.querySelectorAll("input[type='checkbox']");
    boxes.forEach(box => {
        if (localStorage.getItem(box.id) === "true") {
            box.checked = true;
        }
    });
}

function saveStudyContents() {
    const items = document.querySelectorAll(".editable");
    items.forEach(item => {
        localStorage.setItem(item.id, item.innerText);
    });
}

function loadStudyContents() {
    const items = document.querySelectorAll(".editable");
    items.forEach(item => {
        const saved = localStorage.getItem(item.id);
        if (saved) item.innerText = saved;
    });
}

function saveTableStructure() {
    const table = document.getElementById("planTable").innerHTML;
    localStorage.setItem("tableHTML", table);
}

function loadTableStructure() {
    const saved = localStorage.getItem("tableHTML");
    if (saved) {
        document.getElementById("planTable").innerHTML = saved;
    }
}

function attachEditableListener() {
    document.querySelectorAll(".editable").forEach(el => {
        el.addEventListener("input", () => {
            saveStudyContents();
            saveTableStructure();
        });
    });
}

window.onload = function() {
    loadTableStructure();
    loadStudyContents();
    loadChecks();
    attachEditableListener();
};