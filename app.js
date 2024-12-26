const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

const closeConfirm = document.querySelectorAll(".close");
const confirmYes = document.getElementById("confirm_yes");
const confirmDelete = document.querySelector(".confirm_delete");

const notes = [
  {
    title: "Записать блок про массивы",
    completed: false,
  },
  {
    title: "Привет из Будущего",
    completed: true,
  },
];

function render() {
  listElement.innerHTML = "";
  if (notes.length === 0) {
    listElement.innerHTML = `<p>Нет Элементов</p>`;
  }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
  }
}

render();

createBtn.onclick = function () {
  if (inputElement.value.trim().length === 0) {
    return;
  }
  const newNote = {
    title: inputElement.value,
    completed: false,
  };
  notes.push(newNote);
  render();
  inputElement.value = "";
};

closeConfirm.forEach((el) => {
  el.onclick = function () {
    confirmDelete.style.display = "none";
  };
});

function confirm(index) {
  confirmDelete.style.display = "flex";
  confirmYes.onclick = function () {
    notes.splice(index, 1);
    render();
    confirmDelete.style.display = "none";
  };
}

listElement.onclick = function (event) {
  const index = parseInt(event.target.dataset.index);
  const type = event.target.dataset.type;

  if (type === "toggle") {
    notes[index].completed = !notes[index].completed;
  render();
  } else if (type === "delete") {
    confirm(index);
  } else if (type === "edit") {
    enableEditMode(index);
  } else if (type === "save") {
    saveEdit(index);
  } else if (type === "cancel") {
    render();
  }

};

function enableEditMode(index) {
  const listItem = listElement.children[index];
  const inputList = listItem.querySelector(".input_li");

  inputList.style.display = "flex";
}

function saveEdit(index) {
  const listItem = listElement.children[index];
  const input = listItem.querySelector(".edit_input");

  notes[index].title = input.value.trim();
  render();
}

function getNoteTemplate(note, index) {
  return `<li
          class="list-group-item d-flex mb-1 mt-1 justify-content-between align-items-center"
        >
        <div class="input_li">
          <input type="text" class="edit_input form-control" data-index="${index}" value="${
    note.title
  }" >
          <button class="edit-input_save btn btn-success btn-sm" data-index="${index}" data-type="save" ><img src="./img/icon/check.svg" alt=""></button>
          <button class="edit-input_cancel btn btn-danger btn-sm" data-index="${index}" data-type="cancel" ><img src="./img/icon/close-icon.svg" alt=""></button>
        </div>
          <span class="${
            note.completed ? "text-decoration-line-through" : ""
          }">${note.title}
        </span>
        <span>
          <button class="btn btn-small edit btn-info" data-index="${index}" data-type="edit"><img  src="/img/icon/edit.svg" alt=""></button>
          <button class="btn btn-small btn-${
            note.completed ? "warning" : "success"
          }" data-index="${index}" data-type="toggle">&check;</button>
          <button class="btn btn-small btn-danger" data-index="${index}" data-type="delete">&times;</button>
        </span>
      </li>`;
}
