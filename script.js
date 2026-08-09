const TODO_STORAGE_KEY = 'simple-todo-list';
const THEME_STORAGE_KEY = 'theme-mode';
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');
const todoCount = document.getElementById('todo-count');
const completedCount = document.getElementById('todo-completed-count');
const emptyState = document.getElementById('empty-state');

let todos = [];

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.textContent = theme === 'dark' ? '라이트모드' : '다크모드';
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function loadTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
}

function loadTodos() {
  try {
    const saved = localStorage.getItem(TODO_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

function createId() {
  if (window.crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
  });
}

function isOverdue(todo) {
  if (!todo.dueDate || todo.completed) {
    return false;
  }
  const today = new Date(new Date().toISOString().slice(0, 10));
  return new Date(todo.dueDate) < today;
}

function sortTodos(items) {
  return [...items].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (!a.dueDate && !b.dueDate) {
      return 0;
    }
    if (!a.dueDate) {
      return 1;
    }
    if (!b.dueDate) {
      return -1;
    }
    return a.dueDate.localeCompare(b.dueDate);
  });
}

function updateSummary() {
  const total = todos.length;
  const completed = todos.filter((item) => item.completed).length;
  todoCount.textContent = `할 일 ${total}개`;
  completedCount.textContent = `완료 ${completed}개`;
}

function updateEmptyState() {
  emptyState.style.display = todos.length ? 'none' : 'block';
}

function renderTodos() {
  todoList.innerHTML = '';
  const sorted = sortTodos(todos);
  sorted.forEach((todo) => todoList.appendChild(createTodoItem(todo)));
  updateSummary();
  updateEmptyState();
}

function createTodoItem(todo) {
  const listItem = document.createElement('li');
  listItem.className = 'todo-item';
  listItem.dataset.id = todo.id;

  const leftWrapper = document.createElement('div');
  leftWrapper.className = 'todo-left';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;

  const label = document.createElement('div');
  label.className = 'todo-text-wrapper';

  const textLine = document.createElement('p');
  textLine.className = 'todo-text';
  textLine.textContent = todo.text;
  textLine.classList.toggle('completed', todo.completed);

  label.appendChild(textLine);

  if (todo.dueDate) {
    const dueLabel = document.createElement('span');
    dueLabel.className = 'due-date';
    dueLabel.textContent = `마감일: ${formatDate(todo.dueDate)}`;
    label.appendChild(dueLabel);
  }

  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    listItem.classList.toggle('completed', todo.completed);
    textLine.classList.toggle('completed', todo.completed);
    listItem.classList.toggle('overdue', isOverdue(todo));
    saveTodos();
    renderTodos();
  });

  leftWrapper.appendChild(checkbox);
  leftWrapper.appendChild(label);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.textContent = '삭제';
  deleteButton.addEventListener('click', () => {
    todos = todos.filter((item) => item.id !== todo.id);
    saveTodos();
    renderTodos();
  });

  listItem.appendChild(leftWrapper);
  listItem.appendChild(deleteButton);

  if (isOverdue(todo)) {
    listItem.classList.add('overdue');
  }

  return listItem;
}

function setDateMin() {
  todoDate.min = new Date().toISOString().slice(0, 10);
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  const dueDate = todoDate.value;
  if (!text) {
    return;
  }

  todos.push({
    id: createId(),
    text,
    dueDate,
    completed: false,
  });

  saveTodos();
  renderTodos();

  todoInput.value = '';
  todoDate.value = '';
  todoInput.focus();
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
});

function init() {
  todos = loadTodos();
  applyTheme(loadTheme());
  setDateMin();
  renderTodos();
}

init();
