
const STORAGE_KEY = "tasks";
let tasks = [];
let subscribers = [];


function makeId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString() + "-" + Math.random().toString(36).slice(2, 9);
}

export function load() {
  tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  notify();
}

export function getTasks() {
  return [...tasks];
}

export function getTaskById(id) {
  return tasks.find(t => t.id === id);
}

export function createTask({ title, priority }) {
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

export function updateTask(id, patch) {
  const task = getTaskById(id);
  if (task) {
    Object.assign(task, patch);
    save();
  }
}

export function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
}


export function subscribe(fn) {
  subscribers.push(fn);
  return () => {
    subscribers = subscribers.filter(s => s !== fn);
  };
}

function notify() {
  const copy = getTasks();
  subscribers.forEach(fn => fn(copy));
}

