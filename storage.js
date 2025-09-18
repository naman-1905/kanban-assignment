(function () {
  const STORAGE_KEY = "tasks";
  let tasks = [];
  let subscribers = [];

  function makeId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString() + "-" + Math.random().toString(36).slice(2, 9);
  }

  function load() {
    try {
      tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      tasks = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    notify();
  }

  function getTasks() {
    return [...tasks];
  }

  function getTaskById(id) {
    return tasks.find(t => t.id === id);
  }

  function createTask({ title, priority }) {
    const task = {
      id: makeId(),
      title,
      priority,
      status: "todo",
      createdAt: Date.now()
    };
    tasks.push(task);
    save();
    return task;
  }

  function updateTask(id, patch) {
    const task = getTaskById(id);
    if (task) {
      Object.assign(task, patch);
      save();
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
  }

  function subscribe(fn) {
    subscribers.push(fn);
    return () => {
      subscribers = subscribers.filter(s => s !== fn);
    };
  }

  function notify() {
    const copy = getTasks();
    subscribers.forEach(fn => fn(copy));
  }

  window.storage = {
    load,
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    subscribe
  };
})();
