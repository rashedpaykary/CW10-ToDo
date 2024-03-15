const tbody = document.getElementById("tbody");
const submit = document.getElementById("sub-btn");
const bgModal = document.getElementById("bg-modal");
const contentModal = document.getElementById("modal-content");
const eyeModal = document.getElementById("eye-modal");
const closeTodo = document.getElementById("close-todo");
const closeEyeModal = document.getElementById("close-eyemodal");
const plus = document.getElementById("plus");
const inputTask = document.getElementById("Task");
const inputPriority = document.getElementById("Priority");
const inputStatus = document.getElementById("Status");
const inputDeadline = document.getElementById("Deadline");
const inputDiscription = document.getElementById("Discription");

let arrayOfTasks = [];

submit.addEventListener("click", addedTask);
function addedTask() {
  const userTasks = {
    TaskName: inputTask.value,
    Priority: inputPriority.value,
    Status: inputStatus.value,
    Deadline: inputDeadline.value,
    Discription: inputDiscription.value,
    id: Date.now(),
  };

  mandatory();

  if (
    inputTask.value &&
    inputPriority.value &&
    inputStatus.value &&
    inputDeadline.value
  ) {
    arrayOfTasks.push(userTasks);
    console.log(arrayOfTasks);
    addTaskToLocalStorge(arrayOfTasks);
    renderData(arrayOfTasks);
  }

  inputReset();
  closeAddModal();
}

function addTaskToLocalStorge(arrayOfTasks) {
  localStorage.setItem("userTasks", JSON.stringify(arrayOfTasks));
}

function getTaskFromLocalStorge() {
  const data = localStorage.getItem("userTasks");
  if (data) {
    const tasks = JSON.parse(data);
    // console.log(tasks);
  }
}

function inputReset() {
  inputTask.value = "";
  inputPriority.value = "";
  inputStatus.value = "";
  inputDeadline.value = "";
  inputDiscription.value = "";
}

// ShowModal - PlusIcon;
plus.addEventListener("click", showModal);
function showModal() {
  bgModal.classList.remove("hidden");
  contentModal.classList.remove("hidden");
}

// CloseAddModal - CloseIcon;
closeTodo.addEventListener("click", closeAddModal);
function closeAddModal() {
  bgModal.classList.add("hidden");
  contentModal.classList.add("hidden");
}

//CloseEyeModal
closeEyeModal.addEventListener("click", closingEyeModal);
function closingEyeModal() {
  bgModal.classList.add("hidden");
  eyeModal.classList.add("hidden");
}

function renderData(arrayOfTasks) {
  tbody.innerHTML = "";
  arrayOfTasks.forEach((item) => {
    const trBody = document.createElement("tr");
    trBody.id = item.id;
    //   First-td
    const tdTask = document.createElement("td");
    tdTask.classList = "dh-style text-start";
    const spanTask = document.createElement("span");
    spanTask.innerText = item.TaskName;
    tdTask.appendChild(spanTask);

    //   Second-td
    const tdPriority = document.createElement("td");
    tdPriority.className = "dh-style";
    const spanPriority = document.createElement("span");
    spanPriority.className =
      "bg-[#ed9f2b] px-[10px] py-[5px] rounded-[30px] text-[16px] font-bold";
    spanPriority.innerText = item.Priority;
    tdPriority.appendChild(spanPriority);

    //   Third-td
    const tdStatus = document.createElement("td");
    tdStatus.className = "dh-style";
    const spanStatus = document.createElement("span");
    spanStatus.className =
      "bg-[#ed2b2b] px-[10px] py-[5px] rounded-[30px] text-[16px] font-bold text-white";
    spanStatus.innerText = item.Status;
    tdStatus.appendChild(spanStatus);

    //   Fourth-td
    const tdDate = document.createElement("td");
    tdDate.className = "dh-style";
    const spanDate = document.createElement("span");
    spanDate.className =
      "border-[1px] border-[solid] border-[#516eff] p-[5px] rounded-[20px]";
    spanDate.innerText = item.Deadline;
    tdDate.appendChild(spanDate);

    //   Fifth-td
    const tdAction = document.createElement("td");
    tdAction.className = "dh-style flex gap-5 justify-center items-center";
    //   DeleteButton
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "bg-[#f52727] px-[10px] py-px rounded-[7px]";
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash";
    deleteIcon.style = "color: #ffffff";
    deleteBtn.addEventListener("click", deleteTodo);
    deleteBtn.appendChild(deleteIcon);

    //   EditButton
    const editBtn = document.createElement("button");
    editBtn.className = "bg-[#1c82ff] px-[10px] py-px rounded-[7px]";
    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen";
    editIcon.style = "color: #ffffff";
    editBtn.addEventListener("click", editTodo);
    editBtn.appendChild(editIcon);

    //   eyeButton
    const eyeBtn = document.createElement("button");
    eyeBtn.className = "bg-[#9c9c9c] px-[10px] py-px rounded-[7px]";
    const eyeIcon = document.createElement("i");
    eyeIcon.className = "fa-solid fa-eye";
    eyeIcon.style = "color: #ffffff";
    eyeBtn.addEventListener("click", openEyeModal);
    eyeBtn.appendChild(eyeIcon);

    tdAction.append(deleteBtn, editBtn, eyeBtn);

    //   FinalAppend
    trBody.append(tdTask, tdPriority, tdStatus, tdDate, tdAction);
    tbody.appendChild(trBody);

    //   console.log(tbody);
  });
}

function deleteTodo(e) {
  const delBtn = e.target;
  const trTable = delBtn.parentElement.parentElement;
  const trId = trTable.getAttribute("id");
  // console.log(trId);

  arrayOfTasks = arrayOfTasks.filter((item) => item.id != trId);
  addTaskToLocalStorge(arrayOfTasks);
  renderData(arrayOfTasks);
}
function editTodo() {}

// ShowEyeModal
function openEyeModal(e) {
  bgModal.classList.remove("hidden");
  eyeModal.classList.remove("hidden");
  contentModal.classList.add("hidden");
}

// Required Input
function mandatory() {
  if (
    !inputTask.value ||
    !inputPriority.value ||
    !inputStatus.value ||
    !inputDeadline.value
  ) {
    alert("Please fill in all fields");
  }
}
