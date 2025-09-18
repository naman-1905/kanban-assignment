(function () {
  storage.load();

  renderer.initRenderer({ onDelete: id => storage.deleteTask(id) });
  dragdrop.initDragDrop();

  renderer.renderNow(storage.getTasks());
  storage.subscribe(renderer.renderNow);

  const form = document.getElementById("taskForm");
  const input = document.getElementById("taskTitle");
  const prioritySelect = document.getElementById("taskPriority");

  form.addEventListener("submit", e => {
    e.preventDefault();
    storage.createTask({
      title: input.value,
      priority: prioritySelect.value
    });
    input.value = "";
  });
})();
