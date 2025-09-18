(function () {
  const PRIORITY_ORDER = { High: 1, Medium: 2, Low: 3 };
  let elById = new Map();

  function initRenderer({ onDelete }) {
    const board = document.querySelector(".board");
    board.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON" && e.target.dataset.id) {
        onDelete(e.target.dataset.id);
      }
    });
  }

  function renderNow(tasks) {
    const zones = {
      todo: document.getElementById("todo"),
      inprogress: document.getElementById("inprogress"),
      done: document.getElementById("done")
    };

    Object.values(zones).forEach(zone => {
      const zoneTasks = tasks
        .filter(t => t.status === zone.id)
        .sort((a, b) => {
          if (PRIORITY_ORDER[a.priority] !== PRIORITY_ORDER[b.priority]) {
            return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
          }
          return a.createdAt - b.createdAt;
        });

      const desiredIds = zoneTasks.map(t => t.id);

      desiredIds.forEach((id, idx) => {
        let el = elById.get(id);
        if (!el) {
          const task = zoneTasks.find(t => t.id === id);
          el = createTaskElement(task);
          elById.set(id, el);
        }
        zone.insertBefore(el, zone.children[idx] || null);
      });

      Array.from(zone.children).forEach(child => {
        if (!desiredIds.includes(child.dataset.id)) {
          elById.delete(child.dataset.id);
          child.remove();
        }
      });
    });
  }

  function createTaskElement(task) {
    const div = document.createElement("div");
    div.className = "task";
    div.draggable = true;
    div.dataset.id = task.id;

    div.addEventListener("dragstart", e => {
      div.classList.add("dragging");
      e.dataTransfer.setData("text/plain", task.id);
    });
    div.addEventListener("dragend", () => div.classList.remove("dragging"));

    const title = document.createElement("span");
    title.textContent = `${task.title} (${task.priority})`;
    div.appendChild(title);

    const btn = document.createElement("button");
    btn.textContent = "x";
    btn.dataset.id = task.id;
    div.appendChild(btn);

    return div;
  }

  window.renderer = { initRenderer, renderNow };
})();
